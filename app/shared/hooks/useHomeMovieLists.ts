import { GetMovieListResponse } from "@/types/home.types";
import { useQuery } from "@tanstack/react-query";

function useHomeMovieLists() {
  const { data: upComingMovies, isLoading: upComingMoviesLoading } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: async (): Promise<GetMovieListResponse> => {
      const response = await fetch("/api/getMovieList/upcoming");
      return await response.json();
    },
  });

  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useQuery({
      queryKey: ["nowPlayingMovies"],
      queryFn: async (): Promise<GetMovieListResponse> => {
        const response = await fetch("/api/getMovieList/now_playing");
        return await response.json();
      },
    });
  return {
    upComingMovies: upComingMovies?.movies,
    upComingMoviesLoading,
    nowPlayingMovies: nowPlayingMovies?.movies,
    nowPlayingMoviesLoading,
  };
}

export default useHomeMovieLists;
