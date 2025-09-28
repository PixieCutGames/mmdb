import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { GrFormClose } from "react-icons/gr";
import {
  FaHeart,
  FaRegEye,
  FaGift,
  FaPlus,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import Poster from "./Poster";
import useToggle from "../hooks/useToggle";
// import { useGetMovieDetailsQuery, useGetMovieCreditsQuery } from '../../service/movie';
// import { useToggleListMutation } from '../../service/movie-list';
// import FlagIcon from '../../service/flag-icon';
import Tooltip from "./Tooltip";
import "@/node_modules/flag-icons/css/flag-icons.min.css";
import useMovieDetails from "../hooks/useMovieDetails";

type MovieDetailsProps = {
  id?: string;
  isOpen: boolean;
  closeDialog: () => void;
};
export default function MovieDetails({
  id,
  isOpen,
  closeDialog,
}: MovieDetailsProps) {
  const { value: showCast, toggleValue: toggleShowCast } = useToggle(false);
  const { movieDetailsIsLoading, details, movieCreditsIsLoading, credits } =
    useMovieDetails(id);

  //   const [toggleList, { isLoading: toggleLoading, error: toggleError, isSuccess: toggleSuccess }] = useToggleListMutation();

  const authenticated = false;
  //   const authenticated = useSelector((state) => state.user.authenticated);
  //   const query = useSelector((state) => state.query);

  const btnClicked = (e: any, movieList: string, movieID: string) => {
    e.preventDefault();
    // if (authenticated) {
    //   toggleList({ list: movieList, movieID, dialogParams: { id: dialog.params.id, timestamp: dialog.params.timestamp }, query })
    // }
  };

  const closeMovieDialog = () => {
    closeDialog();
    toggleShowCast(false);
  };

  if (!isOpen) return <></>;
  //     return <Dialog open={isOpen} onClose={closeMovieDialog} transition
  //   className="group fixed inset-0 flex w-screen items-center justify-center bg-gray-950/75 sm:p-4 p-2 transition duration-150 ease-out data-closed:bg-black/0 z-50">
  //   <DialogPanel className="fixed inset-0 w-screen h-dvh bg-white flex flex-col">

  //   </DialogPanel>
  // </Dialog>
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-gray-950/75 sm:p-4 p-2 transition duration-150 ease-out data-closed:bg-black/0 z-50"
        onClose={closeMovieDialog}
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block relative w-full max-w-lg my-8 text-left align-middle transition-all transform border border-main-light bg-main-dark shadow-xl rounded-xl">
              <button
                type="button"
                className="text-black opacity-25 absolute top-3 right-3 text-2xl"
                onClick={closeMovieDialog}
              >
                <GrFormClose />
              </button>
              <div className="pt-7 px-3 max-h-85vh flex flex-col">
                {movieDetailsIsLoading || !details ? (
                  <div className="flex animate-pulse">
                    <div className="w-3/12 h-5/12 bg-main-light rounded"></div>
                    <div className="w-9/12 px-5">
                      <span className="h-4 bg-main-light rounded block"></span>
                      <span className="h-6 bg-main-light rounded block"></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex">
                      <div className="w-3/12">
                        <Poster
                          poster={details?.poster_path}
                          name={details?.title}
                          size="small"
                        />
                        <div className="mt-3 p-1 border border-main-light bg-main rounded flex">
                          <a
                            href={`https://www.imdb.com/title/${details.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <img
                              src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png"
                              alt="imdb"
                            />
                          </a>
                          <a
                            href={`https://www.themoviedb.org/movie/${details.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <img
                              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                              alt="TMDB"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="w-9/12 px-5">
                        <DialogTitle className="text-lg font-medium leading-6 text-white">
                          {details.title}
                        </DialogTitle>
                        <div className="text-sm text-main-light py-1 border-b border-main-light">
                          {details.production_countries.map((country) => (
                            <span
                              key={country.name}
                              className={`mr-1 fi fi-${country.iso_3166_1}`}
                            />
                          ))}

                          <span>| {details.runtime} | </span>
                          <span>{details.release_date}</span>
                        </div>
                        <p className="pt-2 text-xs text-white">
                          {details.overview}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end pb-2 pt-3">
                      <button
                        className="text-white border border-main-light text-sm rounded bg-main px-2 py-1 flex items-center"
                        onClick={() => toggleShowCast()}
                        disabled={
                          movieDetailsIsLoading || movieCreditsIsLoading
                        }
                      >
                        cast and crew{" "}
                        <span className="text-black opacity-25 ml-1">
                          {showCast ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                      </button>
                    </div>
                  </>
                )}
                {credits ? (
                  <Transition
                    show={showCast}
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-y-0"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-y-0"
                  >
                    <div className="border-t border-main-light pb-2 overflow-auto flex-1">
                      <h3 className="text-md font-medium text-white my-2">
                        Director
                      </h3>
                      <div className="flex flex-wrap px-2 mb-1">
                        {credits.directors.map((director) => (
                          <div
                            className="w-6/12 flex text-2xs mb-2"
                            key={director.id}
                          >
                            <div className="w-3/12 md:w-2/12">
                              <Poster
                                poster={director.profile_path}
                                name={director.name}
                                size="small"
                              />
                            </div>
                            <div className="flex-1 text-sm pl-3 pr-1">
                              <h4 className="text-white mb-2">
                                {director.name}
                              </h4>
                              <span className="text-main-light italic">
                                ({director.job})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-md font-medium text-white my-2">
                        Writers
                      </h3>
                      <div className="flex flex-wrap px-2 mb-1">
                        {credits.writers.map((writer) => (
                          <div
                            className="w-6/12 flex text-2xs mb-2"
                            key={writer.id}
                          >
                            <div className="w-3/12 md:w-2/12">
                              <Poster
                                poster={writer.profile_path}
                                name={writer.name}
                                size="small"
                              />
                            </div>
                            <div className="flex-1 text-sm pl-3 pr-1">
                              <h4 className="text-white mb-2">{writer.name}</h4>
                              <span className="text-main-light italic">
                                ({writer.job})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-md font-medium text-white my-2">
                        Cast
                      </h3>
                      <div className="flex flex-wrap px-2 mb-1">
                        {credits.actors.map((actor) => (
                          <div
                            className="w-6/12 flex text-2xs mb-2"
                            key={actor.id}
                          >
                            <div className="w-3/12 md:w-2/12">
                              <Poster
                                poster={actor.profile_path}
                                name={actor.name}
                                size="small"
                              />
                            </div>
                            <div className="flex-1 text-sm pl-3 pr-1">
                              <h4 className="text-white mb-2">{actor.name}</h4>
                              <span className="text-main-light italic">
                                ({actor.character})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Transition>
                ) : (
                  <></>
                )}
                {movieDetailsIsLoading ? (
                  <div className="animate-pulse border-t border-main-light text-sm text-main-light">
                    <span className="h-4 bg-main-light rounded block"></span>
                  </div>
                ) : (
                  <div className="border-t border-main-light text-sm text-main-light">
                    {details?.genres.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name +
                          (index < details.genres.length - 1 ? " | " : "")}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 flex">
                <button
                  disabled={movieDetailsIsLoading || !details}
                  title="favorite"
                  className={`rounded-bl-xl group relative flex-1 mr-0.5 flex justify-center items-center py-3 border-t-4 ${
                    authenticated
                      ? details?.lists.includes("fav")
                        ? "bg-danger border-danger-dark"
                        : "bg-main border-danger"
                      : "bg-main-dark border-danger-dark cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    btnClicked(e, "fav", details!.id.toString());
                  }}
                >
                  {!authenticated ? (
                    <span className="hidden group-hover:inline-block">
                      <Tooltip
                        width="250px"
                        title="You're not signed in"
                        body="Please sign in to add movies to your list!"
                      />
                    </span>
                  ) : undefined}
                  <span className="text-black opacity-25">
                    <FaHeart />
                  </span>
                </button>
                <button
                  disabled={movieDetailsIsLoading || !details}
                  title="watch later"
                  className={`group relative flex-1 mr-0.5 flex justify-center items-center py-3 border-t-4 ${
                    authenticated
                      ? details?.lists.includes("later")
                        ? "bg-success border-success-dark"
                        : "bg-main border-success"
                      : "bg-main-dark border-success-dark cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    btnClicked(e, "later", details!.id.toString());
                  }}
                >
                  {!authenticated ? (
                    <span className="hidden group-hover:inline-block">
                      <Tooltip
                        width="250px"
                        title="You're not signed in"
                        body="Please sign in to add movies to your list!"
                      />
                    </span>
                  ) : undefined}
                  <span className="text-black opacity-25">
                    <FaRegEye />
                  </span>
                </button>
                <button
                  disabled={movieDetailsIsLoading || !details}
                  title="wish list"
                  className={`group relative flex-1 mr-0.5 flex justify-center items-center py-3 border-t-4 ${
                    authenticated
                      ? details?.lists.includes("wish")
                        ? "bg-warning border-warning-dark"
                        : "bg-main border-warning"
                      : "bg-main-dark border-warning-dark cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    btnClicked(e, "wish", details!.id.toString());
                  }}
                >
                  {!authenticated ? (
                    <span className="hidden group-hover:inline-block">
                      <Tooltip
                        width="250px"
                        title="You're not signed in"
                        body="Please sign in to add movies to your list!"
                      />
                    </span>
                  ) : undefined}
                  <span className="text-black opacity-25">
                    <FaGift />
                  </span>
                </button>
                <button
                  disabled={movieDetailsIsLoading || !details}
                  title="own it"
                  className={`rounded-br-xl group relative flex-1 flex justify-center items-center py-3 border-t-4 ${
                    authenticated
                      ? details?.lists.includes("own")
                        ? "bg-primary border-primary-dark"
                        : "bg-main border-primary"
                      : "bg-main-dark border-primary-dark cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    btnClicked(e, "own", details!.id.toString());
                  }}
                >
                  {!authenticated ? (
                    <span className="hidden group-hover:inline-block">
                      <Tooltip
                        width="250px"
                        title="You're not signed in"
                        body="Please sign in to add movies to your list!"
                      />
                    </span>
                  ) : undefined}
                  <span className="text-black opacity-25">
                    <FaPlus />
                  </span>
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
