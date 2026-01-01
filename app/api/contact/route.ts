import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { name, email, company, interest, message } = payload ?? {};

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    console.log("[contact-request]", {
      name,
      email,
      company,
      interest,
      message,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact-route]", error);
    return NextResponse.json({ error: "Unable to process request." }, { status: 500 });
  }
}
