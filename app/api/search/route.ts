// app/api/items/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const pageNo = searchParams.get("page");

  try {
    const response = await axios.get(process.env.tmdbURL + "search/movie", {
      params: {
        api_key: process.env.tmdbKey,
        query,
        language: "en-US",
        include_adult: false,
        page: pageNo ?? 1,
      },
    });

    const { results, page, total_results, total_pages } = response.data;

    const movies = results.map((movie: any) => {
      const { genre_ids, title, poster_path, release_date, id } = movie;
      // const usermovie = userMovies.find(m => m.tmdbID == id)
      // const lists = usermovie ? usermovie.lists : [];
      return { genre_ids, title, poster_path, release_date, id, lists: [] };
    });

    return Response.json({ movies, page, total_results, total_pages });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
