/* eslint-disable @typescript-eslint/no-explicit-any -- JSON Schema documents are untyped input. */

export type SchemaStats = {
  totalFields: number
  requiredFields: number
  objectNodes: number
  arrayNodes: number
}
export function buildSchemaStats(schema: any): SchemaStats {
  const stats: SchemaStats = {
    totalFields: 0,
    requiredFields: 0,
    objectNodes: 0,
    arrayNodes: 0,
  }
  const visited = new WeakSet<object>()
  collectSchemaStats(schema, stats, visited)
  return stats
}

function collectSchemaStats(node: any, stats: SchemaStats, visited: WeakSet<object>) {
  if (!node || typeof node !== "object") return
  if (visited.has(node)) return
  visited.add(node)

  const type = Array.isArray(node.type) ? node.type[0] : node.type
  if (type === "object" || node.properties) {
    stats.objectNodes += 1
  }
  if (type === "array" || node.items) {
    stats.arrayNodes += 1
  }

  if (Array.isArray(node.required)) {
    stats.requiredFields += node.required.length
  }

  const props = node.properties ?? {}
  stats.totalFields += Object.keys(props).length

  Object.values(props).forEach((child) => collectSchemaStats(child, stats, visited))

  const itemSchema = Array.isArray(node.items) ? node.items[0] : node.items
  if (itemSchema) collectSchemaStats(itemSchema, stats, visited)

  const combos = [...(node.oneOf ?? []), ...(node.anyOf ?? []), ...(node.allOf ?? [])]
  combos.forEach((combo) => collectSchemaStats(combo, stats, visited))

  if (node.then) collectSchemaStats(node.then, stats, visited)
  if (node.else) collectSchemaStats(node.else, stats, visited)
  if (node.if) collectSchemaStats(node.if, stats, visited)
}
