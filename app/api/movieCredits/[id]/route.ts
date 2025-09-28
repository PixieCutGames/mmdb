import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: movieId } = await params;

  try {
    const response = await axios.get(
      process.env.tmdbURL + "movie/" + movieId + "/credits",
      {
        params: {
          api_key: process.env.tmdbKey,
        },
      }
    );
    const actors = response.data.cast.splice(0, 6).map((c: any) => {
      const { id, name, character, profile_path } = c;
      return { id, name, character, profile_path };
    });
    const writers = response.data.crew
      .filter((c: any) => c.department == "Writing")
      .map((c: any) => {
        const { id, name, job, profile_path } = c;
        return { id, name, job, profile_path };
      });
    const directors = response.data.crew
      .filter((c: any) => c.department == "Directing" && c.job == "Director")
      .map((c: any) => {
        const { id, name, job, profile_path } = c;
        return { id, name, job, profile_path };
      });
    return Response.json({
      credits: {
        id: response.data.id,
        actors,
        writers,
        directors,
      },
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
