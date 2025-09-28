export type MMDBProps<T> = Readonly<T>;

export type Genre = {
  id: string;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};

export type MovieFullDetails = {
  id: number;
  overview: string;
  release_date: string;
  poster_path: string;
  title: string;
  genres: Genre[];
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
  imdb_id: string;
  lists: string[];
};

export type MovieDetailsResponse = {
  details: MovieFullDetails;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  profile_path: string;
};

export type MovieCreditsResponse = {
  credits: {
    id: number;
    actors: Actor[];
    writers: CrewMember[];
    directors: CrewMember[];
  };
};
