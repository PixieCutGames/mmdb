import { GenresResponse } from "@/types/shared.types";
import { useQuery } from "@tanstack/react-query";

function useGenres() {
  const { data, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: async (): Promise<GenresResponse> => {
      const response = await fetch("/api/genres");
      return await response.json();
    },
  });

  const getGenreById = (id: string) => {
    if (!data?.genres) return;

    return data.genres.find((g) => g.id == id);
  };
  return { genres: data?.genres ?? [], isLoading, getGenreById };
}

export default useGenres;
