import { afterEach, describe, expect, it, vi } from "vitest"

import { copyJsonToClipboard } from "./clipboard"

function stubDocument(execCommandResult: boolean) {
  const execCommand = vi.fn(() => execCommandResult)
  vi.stubGlobal("document", {
    createElement: () => ({ value: "", style: {}, select: vi.fn() }),
    body: { appendChild: vi.fn(), removeChild: vi.fn() },
    execCommand,
  })
  return execCommand
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("copyJsonToClipboard", () => {
  it("uses the Clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    const execCommand = stubDocument(false)

    await expect(copyJsonToClipboard("{}")).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith("{}")
    expect(execCommand).not.toHaveBeenCalled()
  })

  it("reports success when the Clipboard API fails but the fallback works", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } })
    stubDocument(true)

    await expect(copyJsonToClipboard("{}")).resolves.toBe(true)
  })

  it("reports failure when the fallback cannot copy either", async () => {
    vi.stubGlobal("navigator", {})
    stubDocument(false)

    await expect(copyJsonToClipboard("{}")).resolves.toBe(false)
  })

  it("does nothing for empty input", async () => {
    await expect(copyJsonToClipboard("")).resolves.toBe(false)
  })
})
