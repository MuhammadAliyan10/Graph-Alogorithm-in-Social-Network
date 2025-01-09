import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return NextResponse.json(challenge, { status: 200 });
  } else {
    return NextResponse.json("Forbidden", { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the incoming request body
    console.log("Webhook event received:", body);

    // Respond with success
    return NextResponse.json("Event received", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
