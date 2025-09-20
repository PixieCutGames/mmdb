import { Genre } from "./shared.types";

export type SearchMovie = {
  genre_ids: number[];
  title: string;
  poster_path: string;
  release_date: string;
  id: number;
  lists: string[];
};

export type SearchResponse = {
  movies: SearchMovie[];
  page: number;
  total_results: number;
  total_pages: number;
};

export type FormattedMovie = {
  genres: (Genre | undefined)[];
  title: string;
  poster_path: string;
  release_date: string;
  id: number;
  lists: string[];
  year: string;
};
