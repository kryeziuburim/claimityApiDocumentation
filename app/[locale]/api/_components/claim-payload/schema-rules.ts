import { itemSchemaOf, type JsonSchema } from "@/lib/json-schema"

import type { ClaimPayloadRuleMessages } from "./ClaimPayloadSection.messages"

export type ClaimRule = {
  type: "if" | "not"
  condition: string
  details: string[]
}

export type ClaimRuleGroup = {
  key: string
  title: string
  rules: ClaimRule[]
}

const GENERIC_TRIGGER = "__generic__"

export function buildClaimRuleGroups(schema: JsonSchema, t: ClaimPayloadRuleMessages): ClaimRuleGroup[] {
  const entries = Array.isArray(schema?.allOf) ? schema.allOf : []
  const conditionalGroups = new Map<string, ClaimRule[]>()
  const exclusions: ClaimRule[] = []

  const driverSummaryRule = buildDriverAtIncidentSummary(schema, t)
  if (driverSummaryRule) {
    pushRuleToGroup(conditionalGroups, "driverAtIncident", driverSummaryRule)
  }

  entries.forEach((entry) => {
    if (entry?.if) {
      pushRuleToGroup(conditionalGroups, extractTriggerField(entry.if), {
        type: "if",
        condition: describeRuleCondition(entry.if, t),
        details: describeRuleConsequences(entry.then, t),
      })
    } else if (entry?.not) {
      if (getDriverConflict(entry.not)) {
        return
      }
      exclusions.push({
        type: "not",
        condition: t.notAllowed,
        details: [describeRuleNot(entry.not, t)],
      })
    }
  })

  const groups: ClaimRuleGroup[] = []
  conditionalGroups.forEach((rules, field) => {
    groups.push({
      key: field,
      title: field === GENERIC_TRIGGER ? t.furtherConditions : t.dependsOnField(field),
      rules,
    })
  })
  if (exclusions.length) {
    groups.push({ key: "exclusions", title: t.exclusionsTitle, rules: exclusions })
  }
  return groups
}

function pushRuleToGroup(map: Map<string, ClaimRule[]>, field: string, rule: ClaimRule) {
  const existing = map.get(field)
  if (existing) {
    existing.push(rule)
  } else {
    map.set(field, [rule])
  }
}

function extractTriggerField(ifClause: JsonSchema): string {
  if (ifClause?.properties && typeof ifClause.properties === "object") {
    const keys = Object.keys(ifClause.properties)
    if (keys.length) return keys[0]
  }
  if (Array.isArray(ifClause?.required) && ifClause.required.length) {
    return ifClause.required[0]
  }
  return GENERIC_TRIGGER
}

function buildDriverAtIncidentSummary(schema: JsonSchema, t: ClaimPayloadRuleMessages): ClaimRule | null {
  const details: string[] = []

  const insuredLimit = describeDriverYesLimit(
    t,
    t.insuredLabel,
    "insured",
    schema?.properties?.insured,
    "insuredPersons",
    schema?.properties?.insuredPersons,
  )
  if (insuredLimit) details.push(insuredLimit)

  const counterpartyLimit = describeDriverYesLimit(
    t,
    t.counterpartyLabel,
    "counterparty",
    schema?.properties?.counterparty,
    "counterpartyPersons",
    schema?.properties?.counterpartyPersons,
  )
  if (counterpartyLimit) details.push(counterpartyLimit)

  return details.length
    ? {
        type: "if",
        condition: t.driverAtIncidentSet,
        details,
      }
    : null
}

function describeDriverYesLimit(
  t: ClaimPayloadRuleMessages,
  contextLabel: string,
  objectName: string,
  objectSchema: JsonSchema | undefined,
  arrayName: string,
  arraySchema: JsonSchema | undefined,
): string | null {
  if (!objectSchema || !arraySchema) return null
  const restrictsDriverYes = arraySchema?.contains?.properties?.driverAtIncident?.const === "yes"
  const maxContains = typeof arraySchema?.maxContains === "number" ? arraySchema.maxContains : undefined
  const minContains = typeof arraySchema?.minContains === "number" ? arraySchema.minContains : undefined
  if (!restrictsDriverYes || maxContains === undefined || maxContains < 1) return null
  return t.driverYesLimit(contextLabel, objectName, arrayName, maxContains, !minContains || minContains <= 0)
}

export type FormatHint = {
  path: string
  description: string
}

export function extractFormatHints(schema: JsonSchema, t: ClaimPayloadRuleMessages): FormatHint[] {
  const registry = new Map<string, string>()
  traverseForFormats(schema, "payloadJson", registry, t)
  return Array.from(registry.entries()).map(([path, description]) => ({ path, description }))
}

function traverseForFormats(
  node: JsonSchema | undefined,
  currentPath: string,
  registry: Map<string, string>,
  t: ClaimPayloadRuleMessages,
) {
  if (!node) return

  const description = describeFormatDetail(node, t)
  if (description) {
    const existing = registry.get(currentPath)
    if (!existing) {
      registry.set(currentPath, description)
    } else if (!existing.includes(description)) {
      registry.set(currentPath, `${existing} | ${description}`)
    }
  }

  const objectEntries = Object.entries(node.properties ?? {})
  objectEntries.forEach(([key, value]) => {
    const nextPath = currentPath ? `${currentPath}.${key}` : key
    traverseForFormats(value, nextPath, registry, t)
  })

  const itemSchema = itemSchemaOf(node.items)
  if (itemSchema) {
    const nextPath = `${currentPath}[]`
    traverseForFormats(itemSchema, nextPath, registry, t)
  }

  const combos = [...(node.oneOf ?? []), ...(node.anyOf ?? []), ...(node.allOf ?? [])]
  combos.forEach((child) => traverseForFormats(child, currentPath, registry, t))

  if (node.then) traverseForFormats(node.then, currentPath, registry, t)
  if (node.else) traverseForFormats(node.else, currentPath, registry, t)
  if (node.if) traverseForFormats(node.if, currentPath, registry, t)
}

function describeFormatDetail(schema: JsonSchema, t: ClaimPayloadRuleMessages): string | null {
  if (schema.format) {
    switch (schema.format) {
      case "date":
        return t.formatDate
      case "date-time":
        return t.formatDateTime
      case "time":
        return t.formatTime
      case "email":
        return t.formatEmail
      case "uri":
        return t.formatUri
      default:
        return `Format "${schema.format}"`
    }
  }

  if (schema.pattern) {
    if (schema.pattern === "^([01]\\d|2[0-3]):([0-5]\\d)$") {
      return t.patternTime
    }
    if (schema.pattern === "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$") {
      return t.patternDate
    }
    if (schema.pattern === "^(\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))?$") {
      return t.patternDateOrEmpty
    }
    if (schema.pattern === "^\\d+(\\.\\d+)?$") {
      return t.patternNumeric
    }
    return t.patternRegex(schema.pattern)
  }

  return null
}

function describeRuleCondition(
  condition: JsonSchema | undefined,
  t: ClaimPayloadRuleMessages,
  parentPath = "",
): string {
  if (!condition) return t.conditionFallback
  const parts: string[] = []

  if (condition.properties && typeof condition.properties === "object") {
    Object.entries(condition.properties).forEach(([prop, schema]) => {
      const propPath = parentPath ? `${parentPath}.${prop}` : prop
      parts.push(...describeSchemaRequirements(propPath, schema, t))
    })
  }

  if (Array.isArray(condition.required) && condition.required.length && !condition.properties) {
    condition.required.forEach((field: string) => {
      const fieldPath = parentPath ? `${parentPath}.${field}` : field
      parts.push(t.fieldPresent(fieldPath))
    })
  }

  if (condition.contains) {
    const arrayPath = parentPath || t.arrayFallback
    parts.push(describeArrayContains(arrayPath, condition, t))
  }

  const comboChildren = [...(condition.allOf ?? []), ...(condition.anyOf ?? []), ...(condition.oneOf ?? [])]
  comboChildren.forEach((child) => {
    const described = describeRuleCondition(child, t, parentPath)
    if (described && described !== t.conditionFallback) {
      parts.push(described)
    }
  })

  return parts.length ? parts.join(t.and) : t.conditionFallback
}

function describeSchemaRequirements(
  path: string,
  schema: JsonSchema | undefined,
  t: ClaimPayloadRuleMessages,
): string[] {
  if (!schema) return []
  const facts: string[] = []

  if (schema.const !== undefined) {
    facts.push(t.hasValue(path, formatSchemaValue(schema.const)))
  } else if (Array.isArray(schema.enum) && schema.enum.length) {
    facts.push(t.hasOneOf(path, formatValueList(schema.enum)))
  }

  if (Array.isArray(schema.required) && schema.required.length) {
    schema.required.forEach((requiredKey: string) => {
      const requirementPath = path ? `${path}.${requiredKey}` : requiredKey
      facts.push(t.fieldPresent(requirementPath))
    })
  }

  if (schema.contains) {
    facts.push(describeArrayContains(path, schema, t))
  }

  if (schema.properties && typeof schema.properties === "object") {
    Object.entries(schema.properties).forEach(([child, childSchema]) => {
      const childPath = `${path}.${child}`
      facts.push(...describeSchemaRequirements(childPath, childSchema, t))
    })
  }

  return facts
}

function describeArrayContains(path: string, schema: JsonSchema, t: ClaimPayloadRuleMessages): string {
  const minContains = typeof schema.minContains === "number" ? schema.minContains : undefined
  const maxContains = typeof schema.maxContains === "number" ? schema.maxContains : undefined
  let descriptor: string

  if (minContains !== undefined && maxContains !== undefined && minContains === maxContains) {
    descriptor = minContains === 1 ? t.exactlyOne : t.exactly(minContains)
  } else if (minContains !== undefined && maxContains !== undefined) {
    const minPart = minContains > 0 ? (minContains === 1 ? t.atLeastOne : t.atLeast(minContains)) : undefined
    const maxPart = maxContains === 1 ? t.atMostOne : t.atMost(maxContains)
    descriptor = [minPart, maxPart].filter(Boolean).join(t.and)
  } else if (minContains !== undefined) {
    descriptor = minContains <= 0 ? t.atLeastOne : minContains === 1 ? t.atLeastOne : t.atLeast(minContains)
  } else if (maxContains !== undefined) {
    descriptor = maxContains === 1 ? t.atMostOne : t.atMost(maxContains)
  } else {
    descriptor = t.atLeastOne
  }

  const elementLabel =
    descriptor === t.exactlyOne || descriptor === t.atLeastOne || descriptor === t.atMostOne ? t.element : t.elements
  const requirement = describeRuleCondition(schema.contains, t, `${path}[]`)
  const useMay = descriptor.startsWith(t.atMostPrefix)
  const verb = useMay ? t.may : t.must
  const optionalNote = useMay && (minContains === undefined || minContains <= 0) ? t.orNone : ""

  return t.arrayContains(path, verb, descriptor, elementLabel, optionalNote, requirement)
}

function formatSchemaValue(value: unknown): string {
  if (value === null) return "null"
  return String(value)
}

function formatValueList(values: unknown[]): string {
  return values.map((value) => `\`${formatSchemaValue(value)}\``).join(", ")
}

function formatFieldList(fields: string[]): string {
  return fields.map((field) => `\`${field}\``).join(", ")
}

function describeRuleConsequences(thenClause: JsonSchema | undefined, t: ClaimPayloadRuleMessages): string[] {
  if (!thenClause) return [t.additionalRequirements]
  const lines: string[] = []
  if (Array.isArray(thenClause.required) && thenClause.required.length) {
    lines.push(t.requiredFields(formatFieldList(thenClause.required)))
  }
  if (thenClause.properties) {
    Object.entries(thenClause.properties).forEach(([prop, value]) => {
      lines.push(...describeConsequenceFacts(prop, value, t))
    })
  }
  return lines.length ? lines : [t.additionalRequirements]
}

function describeConsequenceFacts(path: string, schema: JsonSchema | undefined, t: ClaimPayloadRuleMessages): string[] {
  if (!schema || typeof schema !== "object") return []
  const facts: string[] = []

  if (schema.const !== undefined) {
    facts.push(t.mustBe(path, formatSchemaValue(schema.const)))
  } else if (Array.isArray(schema.enum) && schema.enum.length) {
    facts.push(t.mustBeOneOf(path, formatValueList(schema.enum)))
  }

  if (Array.isArray(schema.required) && schema.required.length) {
    facts.push(t.requires(path, formatFieldList(schema.required)))
  }

  if (schema.properties && typeof schema.properties === "object") {
    Object.entries(schema.properties).forEach(([child, childSchema]) => {
      facts.push(...describeConsequenceFacts(`${path}.${child}`, childSchema, t))
    })
  }

  return facts
}

function describeRuleNot(node: JsonSchema, t: ClaimPayloadRuleMessages): string {
  const driverConflict = describeDriverConflict(node, t)
  if (driverConflict) {
    return driverConflict
  }
  if (node?.allOf) {
    const segments = node.allOf.map((segment) => describeRuleCondition(segment, t)).filter(Boolean)
    if (segments.length) {
      return t.combinationOf(segments.join(" + "))
    }
  }
  if (node?.properties || node?.required) {
    return describeRuleCondition(node, t)
  }
  return t.combinationNotAllowed
}

type DriverSegment = {
  subject: string
  kind: "object" | "array"
}

type DriverConflict = {
  objectSegment: DriverSegment
  arraySegment: DriverSegment
}

function describeDriverConflict(node: JsonSchema, t: ClaimPayloadRuleMessages): string | null {
  const conflict = getDriverConflict(node)
  if (!conflict) return null
  return t.driverConflict(formatDriverSegment(conflict.objectSegment), formatDriverSegment(conflict.arraySegment))
}

function getDriverConflict(node: JsonSchema): DriverConflict | null {
  if (!Array.isArray(node?.allOf) || node.allOf.length !== 2) return null
  const segments = node.allOf.map((segment) => extractDriverSegment(segment))
  const typedSegments = segments.filter((segment): segment is DriverSegment => segment !== null)
  if (typedSegments.length !== segments.length) return null
  const objectSegment = typedSegments.find((segment) => segment.kind === "object")
  const arraySegment = typedSegments.find((segment) => segment.kind === "array")
  if (!objectSegment || !arraySegment) return null
  return { objectSegment, arraySegment }
}

function extractDriverSegment(segment: JsonSchema): DriverSegment | null {
  if (!segment?.properties) return null
  for (const [key, schema] of Object.entries(segment.properties)) {
    if (schema?.properties?.driverAtIncident?.const === "yes") {
      return { subject: key, kind: "object" }
    }
    if (schema?.contains?.properties?.driverAtIncident?.const === "yes") {
      return { subject: key, kind: "array" }
    }
  }
  return null
}

function formatDriverSegment(segment: DriverSegment): string {
  return segment.kind === "object" ? `${segment.subject}.driverAtIncident` : `${segment.subject}[].driverAtIncident`
}
