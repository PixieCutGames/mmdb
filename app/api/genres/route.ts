// app/api/items/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(process.env.tmdbURL + "genre/movie/list", {
      params: {
        api_key: process.env.tmdbKey,
      },
    });

    return Response.json({ genres: response.data.genres });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
