// Pure builders for the copy-paste request samples shown in the "Examples" tab.

export type CodeSampleInput = {
  baseUrl: string
  method: string
  path: string
  hasBody: boolean
}

export function buildCurl({ baseUrl, method, path, hasBody }: CodeSampleInput) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const body = hasBody ? " \\\n  -H 'Content-Type: application/json' \\\n  -d '{...}'" : ""
  return `curl -X ${method} \\\n  '${url}' \\\n  -H 'Accept: application/json' \\\n  -H 'Authorization: DPoP {access_token}' \\\n  -H 'DPoP: {dpop_proof_jwt}'${body}`
}

export function buildFetch({ baseUrl, method, path, hasBody }: CodeSampleInput) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const body = hasBody ? `,\n  body: JSON.stringify({ /* ... */ })` : ""
  const ct = hasBody ? `,\n    "Content-Type": "application/json"` : ""
  return `const res = await fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Accept": "application/json",\n    "Authorization": "DPoP {access_token}",\n    "DPoP": "{dpop_proof_jwt}"${ct}\n  }${body}\n});\n\nconst data = await res.json();`
}

export function buildPython({ baseUrl, method, path, hasBody }: CodeSampleInput) {
  const url = `${baseUrl}${path}`.replace(/\{[^}]+\}/g, "REPLACE_ME")
  const dataLine = hasBody ? `\npayload = { }\n` : ""
  const jsonArg = hasBody ? `, json=payload` : ""
  const ctHeader = hasBody ? `,\n  "Content-Type": "application/json"` : ""
  return `import requests\n\nurl = "${url}"\nheaders = {\n  "Accept": "application/json",\n  "Authorization": "DPoP {access_token}",\n  "DPoP": "{dpop_proof_jwt}"${ctHeader}\n}\n${dataLine}res = requests.request("${method}", url, headers=headers${jsonArg})\nprint(res.status_code)\nprint(res.text)`
}
