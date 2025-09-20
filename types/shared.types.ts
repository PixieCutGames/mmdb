export type MMDBProps<T> = Readonly<T>;

export type Genre = {
  id: string;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};
