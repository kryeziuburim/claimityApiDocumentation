import { describe, expect, it } from "vitest"

import { buildCurl, buildFetch, buildPython, type CodeSampleInput } from "./code-samples"

// Characterization tests: they pin the exact sample code rendered in the "Examples" tab.

const BASE_URL = "https://app.claimity.ch"

const get: CodeSampleInput = { baseUrl: BASE_URL, method: "GET", path: "/api/v1/claims/{claimId}", hasBody: false }
const post: CodeSampleInput = { baseUrl: BASE_URL, method: "POST", path: "/api/v1/claims", hasBody: true }

describe("buildCurl", () => {
  it("builds a GET request and replaces path parameters", () => {
    expect(buildCurl(get)).toBe(
      [
        "curl -X GET \\",
        "  'https://app.claimity.ch/api/v1/claims/REPLACE_ME' \\",
        "  -H 'Accept: application/json' \\",
        "  -H 'Authorization: DPoP {access_token}' \\",
        "  -H 'DPoP: {dpop_proof_jwt}'",
      ].join("\n")
    )
  })

  it("adds Content-Type and body for a POST with body", () => {
    expect(buildCurl(post)).toBe(
      [
        "curl -X POST \\",
        "  'https://app.claimity.ch/api/v1/claims' \\",
        "  -H 'Accept: application/json' \\",
        "  -H 'Authorization: DPoP {access_token}' \\",
        "  -H 'DPoP: {dpop_proof_jwt}' \\",
        "  -H 'Content-Type: application/json' \\",
        "  -d '{...}'",
      ].join("\n")
    )
  })
})

describe("buildFetch", () => {
  it("builds a GET request and replaces path parameters", () => {
    expect(buildFetch(get)).toBe(
      [
        'const res = await fetch("https://app.claimity.ch/api/v1/claims/REPLACE_ME", {',
        '  method: "GET",',
        "  headers: {",
        '    "Accept": "application/json",',
        '    "Authorization": "DPoP {access_token}",',
        '    "DPoP": "{dpop_proof_jwt}"',
        "  }",
        "});",
        "",
        "const data = await res.json();",
      ].join("\n")
    )
  })

  it("adds Content-Type and body for a POST with body", () => {
    expect(buildFetch(post)).toBe(
      [
        'const res = await fetch("https://app.claimity.ch/api/v1/claims", {',
        '  method: "POST",',
        "  headers: {",
        '    "Accept": "application/json",',
        '    "Authorization": "DPoP {access_token}",',
        '    "DPoP": "{dpop_proof_jwt}",',
        '    "Content-Type": "application/json"',
        "  },",
        "  body: JSON.stringify({ /* ... */ })",
        "});",
        "",
        "const data = await res.json();",
      ].join("\n")
    )
  })
})

describe("buildPython", () => {
  it("builds a GET request and replaces path parameters", () => {
    expect(buildPython(get)).toBe(
      [
        "import requests",
        "",
        'url = "https://app.claimity.ch/api/v1/claims/REPLACE_ME"',
        "headers = {",
        '  "Accept": "application/json",',
        '  "Authorization": "DPoP {access_token}",',
        '  "DPoP": "{dpop_proof_jwt}"',
        "}",
        'res = requests.request("GET", url, headers=headers)',
        "print(res.status_code)",
        "print(res.text)",
      ].join("\n")
    )
  })

  it("adds Content-Type and a json payload for a POST with body", () => {
    expect(buildPython(post)).toBe(
      [
        "import requests",
        "",
        'url = "https://app.claimity.ch/api/v1/claims"',
        "headers = {",
        '  "Accept": "application/json",',
        '  "Authorization": "DPoP {access_token}",',
        '  "DPoP": "{dpop_proof_jwt}",',
        '  "Content-Type": "application/json"',
        "}",
        "",
        "payload = { }",
        'res = requests.request("POST", url, headers=headers, json=payload)',
        "print(res.status_code)",
        "print(res.text)",
      ].join("\n")
    )
  })
})
