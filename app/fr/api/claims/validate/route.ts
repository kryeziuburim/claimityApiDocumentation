import { NextRequest, NextResponse } from "next/server"

const TARGET_URL = "https://app.claimity.ch/v1/insurers/claims:validate"

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text()
    const authHeader = request.headers.get("authorization")
    const contentType = request.headers.get("content-type") ?? "application/json"

    const upstreamResponse = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: bodyText,
      cache: "no-store",
    })

    const responseBody = await upstreamResponse.text()
    const responseHeaders = new Headers()
    responseHeaders.set("Content-Type", upstreamResponse.headers.get("content-type") ?? "application/json")

    return new NextResponse(responseBody, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "L'appel proxy vers Claimity a échoué.",
        detail: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 502 }
    )
  }
}
