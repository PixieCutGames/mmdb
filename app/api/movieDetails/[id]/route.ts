import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: movieId } = await params;

  try {
    const response = await axios.get(process.env.tmdbURL + "movie/" + movieId, {
      params: {
        api_key: process.env.tmdbKey,
      },
    });
    const {
      id,
      overview,
      release_date,
      poster_path,
      title,
      genres,
      runtime,
      production_countries,
      imdb_id,
    } = response.data;
    const lists: string[] = [];
    // if (req.user) {
    //     const list = await MovieList.findOne({ userID: req.user._id });
    //     const movie = list.movies.find(m => {
    //         return m.tmdbID == req.query.id
    //     });
    //     if (movie) lists = movie.lists;
    // }
    return Response.json({
      details: {
        id,
        overview,
        release_date,
        poster_path,
        title,
        genres,
        runtime,
        production_countries,
        imdb_id,
        lists,
      },
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
