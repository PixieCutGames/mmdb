import {
  MovieCreditsResponse,
  MovieDetailsResponse,
} from "@/types/shared.types";
import { useQuery } from "@tanstack/react-query";

function useMovieDetails(id?: string) {
  const { data: movieDetails, isLoading: movieDetailsIsLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: async (): Promise<MovieDetailsResponse> => {
      const response = await fetch(`/api/movieDetails/${id}`);
      return await response.json();
    },
    enabled: !!id,
  });

  const { data: movieCredits, isLoading: movieCreditsIsLoading } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: async (): Promise<MovieCreditsResponse> => {
      const response = await fetch(`/api/movieCredits/${id}`);
      return await response.json();
    },
    enabled: !!id,
  });

  return {
    details: movieDetails?.details,
    movieDetailsIsLoading,
    credits: movieCredits?.credits,
    movieCreditsIsLoading,
  };
}

export default useMovieDetails;
