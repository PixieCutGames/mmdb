import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  try {
    // let userMovies = [];
    // if (req.user) {
    //     const userList = await MovieList.findOne({ userID: req.user._id });
    //     userMovies = userList.movies;
    // }
    const response = await axios.get(process.env.tmdbURL + "movie/" + type, {
      params: {
        api_key: process.env.tmdbKey,
      },
    });

    const movies = response.data.results.slice(0, 10).map((movie: any) => {
      const { title, poster_path, id } = movie;
      // const usermovie = userMovies.find(m => m.tmdbID == id)
      // const lists = usermovie ? usermovie.lists : [];
      return {
        title,
        poster_path,
        id,
        lists: [],
      };
    });

    return Response.json({ movies });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
