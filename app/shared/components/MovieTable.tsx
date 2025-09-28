// import { useDispatch } from 'react-redux';
import Poster from "./Poster";
import { FaHeart, FaRegEye, FaGift, FaPlus } from "react-icons/fa";
// import { openDialog } from '../../service/dialog';
import Tooltip from "./Tooltip";
import { MMDBProps } from "@/types/shared.types";
import { FormattedMovie } from "@/types/search.types";
import MovieDetails from "./MovieDetails";
import { useState } from "react";

type MovieTableProps = MMDBProps<{
  movies: FormattedMovie[];
  actionsDisabled: boolean;
  toggleList: (e: any, movieID: number, list: string) => void;
}>;
export default function MovieTable({
  movies,
  toggleList,
  actionsDisabled,
}: MovieTableProps) {
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>();

  const openDialog = (id: string) => {
    setSelectedId(id);
    setIsDialogOpened(true);
  };

  const closeDialog = () => {
    setSelectedId(undefined);
    setIsDialogOpened(false);
  };

  return (
    <>
      <ul className="mt-4">
        {movies.map((movie, movieIndex) => (
          <li
            key={movie.id}
            className="flex p-1 bg-main odd:bg-main-light mb-1"
          >
            <div className="w-12 text-2xs">
              <Poster
                poster={movie.poster_path}
                name={movie.title}
                dark={movieIndex % 2 === 0}
                size="small"
              />
            </div>
            <div className="flex-1 pl-2">
              <span
                role="button"
                onClick={() => openDialog(movie.id.toString())}
                className="text-sm text-white font-bold"
              >
                {movie.title} ({movie.year})
              </span>
              <div>
                {movie.genres.map((genre, i) => (
                  <span
                    key={genre?.id}
                    className="text-sm text-white opacity-40 italic"
                  >
                    {genre?.name}
                    {i < movie.genres.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <button
                title="favorite"
                className={`group relative flex p-2 md:py-0 md:pr-0  ${
                  actionsDisabled ? "cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  toggleList(e, movie.id, "fav");
                }}
              >
                {actionsDisabled ? (
                  <span className="hidden group-hover:inline-block">
                    <Tooltip
                      width="250px"
                      title="You're not signed in"
                      body="Please sign in to add movies to your list!"
                    />
                  </span>
                ) : undefined}
                <FaHeart
                  className={
                    movie.lists.includes("fav")
                      ? "text-danger"
                      : "text-black opacity-25"
                  }
                />
              </button>
              <button
                title="watch later"
                className={`group relative flex p-2 md:py-0 md:pr-0 ${
                  actionsDisabled ? "cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  toggleList(e, movie.id, "later");
                }}
              >
                {actionsDisabled ? (
                  <span className="hidden group-hover:inline-block">
                    <Tooltip
                      width="250px"
                      title="You're not signed in"
                      body="Please sign in to add movies to your list!"
                    />
                  </span>
                ) : undefined}
                <FaRegEye
                  className={
                    movie.lists.includes("later")
                      ? "text-success"
                      : "text-black opacity-25"
                  }
                />
              </button>
              <button
                title="wish list"
                className={`group relative flex p-2 md:py-0 md:pr-0 ${
                  actionsDisabled ? "cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  toggleList(e, movie.id, "wish");
                }}
              >
                {actionsDisabled ? (
                  <span className="hidden group-hover:inline-block">
                    <Tooltip
                      width="250px"
                      title="You're not signed in"
                      body="Please sign in to add movies to your list!"
                    />
                  </span>
                ) : undefined}
                <FaGift
                  className={
                    movie.lists.includes("wish")
                      ? "text-warning"
                      : "text-black opacity-25"
                  }
                />
              </button>
              <button
                title="own it"
                className={`group relative flex p-2 md:py-0 md:pr-0 ${
                  actionsDisabled ? "cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  toggleList(e, movie.id, "own");
                }}
              >
                {actionsDisabled ? (
                  <span className="hidden group-hover:inline-block">
                    <Tooltip
                      width="250px"
                      title="You're not signed in"
                      body="Please sign in to add movies to your list!"
                    />
                  </span>
                ) : undefined}
                <FaPlus
                  className={
                    movie.lists.includes("own")
                      ? "text-primary"
                      : "text-black opacity-25"
                  }
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <MovieDetails
        id={selectedId}
        isOpen={isDialogOpened}
        closeDialog={closeDialog}
      />
    </>
  );
}
