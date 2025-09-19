export type Movie = {
  title: string;
  id: string;
  poster_path: string;
  lists: string[];
};

export type GetMovieListResponse = {
  movies: Movie[];
};
