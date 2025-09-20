import { useQuery } from "@tanstack/react-query";

function useLanguages() {
  const { data, isLoading } = useQuery({
    queryKey: ["languages"],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch("/api/languages");
      return await response.json();
    },
  });

  return {
    languages: data ?? [],
    isLoading,
  };
}

export default useLanguages;
