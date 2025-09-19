"use client";

import MovieList from "./shared/components/MovieList";
import useHomeMovieLists from "./shared/hooks/useHomeMovieLists";

export default function Home() {
  const {
    upComingMoviesLoading,
    nowPlayingMoviesLoading,
    nowPlayingMovies,
    upComingMovies,
  } = useHomeMovieLists();
  return (
    <main className="p-4 flex justify-center flex-wrap">
      <MovieList
        title="Now Playing"
        list={nowPlayingMovies}
        loading={nowPlayingMoviesLoading}
      />
      <MovieList
        title="Upcoming"
        list={upComingMovies}
        loading={upComingMoviesLoading}
      />
    </main>
  );
}
