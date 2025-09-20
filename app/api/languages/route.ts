import { NextResponse } from "next/server";
import ISO6391 from "iso-639-1";

export async function GET() {
  try {
    const langs = ISO6391.getAllNames();

    return Response.json(langs.sort());
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
