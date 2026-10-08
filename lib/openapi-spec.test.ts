import fs from "node:fs"
import path from "node:path"

import SwaggerParser from "@apidevtools/swagger-parser"
import { expect, it } from "vitest"

const SPEC_PATH = path.join(__dirname, "..", "public", "assets", "openapi.json")

it("public/assets/openapi.json is a valid OpenAPI document with resolvable $refs", async () => {
  // validate() mutates its input, so hand it a fresh copy.
  const spec = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8"))
  await expect(SwaggerParser.validate(spec)).resolves.toBeTruthy()
})
