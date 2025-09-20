import {
  FormattedMovie,
  SearchMovie,
  SearchResponse,
} from "@/types/search.types";
import { useQuery } from "@tanstack/react-query";
import useGenres from "../shared/hooks/useGenres";

function useSearch(query: string, page: number) {
  const { isLoading: genresLoading, getGenreById } = useGenres();
  const { data, isLoading } = useQuery({
    queryKey: ["search", query, page],
    queryFn: async (): Promise<SearchResponse> => {
      const response = await fetch(`/api/search?query=${query}&page=${page}`);
      return await response.json();
    },
    enabled: query !== "" && !genresLoading,
  });
  const formatMovie = (m: SearchMovie): FormattedMovie => {
    const date = new Date(m.release_date);
    return {
      ...m,
      genres: m.genre_ids.map((id) => getGenreById(id.toString())),
      year: date.getFullYear().toString(),
    };
  };
  return {
    ...data,
    movies: data ? data.movies.map((m) => formatMovie(m)) : [],
    isLoading,
  };
}

export default useSearch;
