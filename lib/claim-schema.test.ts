import fs from "node:fs"
import path from "node:path"

import Ajv2020 from "ajv/dist/2020"
import addFormats from "ajv-formats"
import { describe, expect, it } from "vitest"

import { buildExamplePayload, dereferenceSchema } from "./claim-schema"
import { isRecord } from "./json-schema"

const SCHEMA_DIR = path.join(__dirname, "..", "public", "assets", "schemas")
const schemaFiles = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith(".schema.json"))

function loadSchema(file: string) {
  return JSON.parse(fs.readFileSync(path.join(SCHEMA_DIR, file), "utf8"))
}

function createAjv() {
  // Strict about unknown keywords/formats (catches typos). strictRequired/strictTypes are style rules that
  // reject valid conditional subschemas (`required` or `contains` inside if/then/not without repeating the type).
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, strictTypes: false })
  addFormats(ajv)
  // Custom error texts for the backend validator (ajv-errors style); no effect on validity.
  ajv.addKeyword({ keyword: "errorMessage", schemaType: ["string", "object"] })
  return ajv
}

/** Every subschema that carries `examples`, as a JSON pointer into the root schema. */
function collectExamples(node: unknown, pointer = ""): { pointer: string; examples: unknown[] }[] {
  if (!isRecord(node)) return []
  const found = Array.isArray(node.examples) && !Array.isArray(node) ? [{ pointer, examples: node.examples }] : []
  for (const [key, child] of Object.entries(node)) {
    if (key === "examples" || key === "const" || key === "enum" || key === "default") continue
    const segment = key.replace(/~/g, "~0").replace(/\//g, "~1")
    found.push(...collectExamples(child, `${pointer}/${segment}`))
  }
  return found
}

it("finds the claim schemas", () => {
  expect(schemaFiles.length).toBeGreaterThan(0)
})

describe.each(schemaFiles)("%s", (file) => {
  const schema = loadSchema(file)

  it("is a valid JSON Schema (draft 2020-12, strict mode)", () => {
    expect(() => createAjv().compile(schema)).not.toThrow()
  })

  it("only contains examples that satisfy their own subschema", () => {
    const ajv = createAjv()
    ajv.addSchema(schema)
    const failures: string[] = []
    const withExamples = collectExamples(schema)
    expect(withExamples.length).toBeGreaterThan(0)
    for (const { pointer, examples } of withExamples) {
      const validate = ajv.getSchema(`${schema.$id}#${pointer}`)
      if (!validate) throw new Error(`cannot resolve ${pointer}`)
      for (const example of examples) {
        if (!validate(example))
          failures.push(`${pointer}: ${JSON.stringify(example)} -> ${ajv.errorsText(validate.errors)}`)
      }
    }
    expect(failures).toEqual([])
  })

  it("rejects an empty payload (sanity check that validation is not vacuous)", () => {
    const validate = createAjv().compile(schema)
    expect(validate({})).toBe(false)
  })

  it('generates an example payload ("Beispiel übernehmen") that the schema accepts', () => {
    const ajv = createAjv()
    const validate = ajv.compile(schema)
    const example = buildExamplePayload(dereferenceSchema(schema))
    validate(example)
    expect(validate.errors ?? []).toEqual([])
  })
})

describe("dereferenceSchema", () => {
  it("inlines $ref targets and drops $defs", () => {
    const resolved = dereferenceSchema({
      $defs: { date: { type: "string", format: "date" } },
      properties: { from: { $ref: "#/$defs/date", description: "start" } },
    })
    expect(resolved).toEqual({ properties: { from: { type: "string", format: "date", description: "start" } } })
  })

  it("does not loop on self-referencing schemas", () => {
    const resolved = dereferenceSchema({
      $defs: { node: { properties: { child: { $ref: "#/$defs/node" } } } },
      $ref: "#/$defs/node",
    })
    expect(resolved).toEqual({ properties: { child: {} } })
  })
})
