import { FaFilter } from "react-icons/fa";
import FilterTable from "./FilterTable";
// import MovieTable from '../shared/movie-table';
// import { useToggleListMutation } from '../../service/movie-list';
import useToggle from "../shared/hooks/useToggle";
import Pagination from "../shared/components/Pagination";
import { MMDBProps } from "@/types/shared.types";
import { FormattedMovie } from "@/types/search.types";
import MovieTable from "../shared/components/MovieTable";

type SearchResultsTableProps = MMDBProps<{
  isLoading: boolean;
  query: string;
  movies: FormattedMovie[];
  page: number;
  totalResults: number;
  totalPages: number;
  changePage: (page: number) => void;
}>;
function SearchResultsTable({
  isLoading,
  movies,
  page,
  totalResults,
  totalPages,
  query,
  changePage,
}: SearchResultsTableProps) {
  const { value: isfiltersshown, toggleValue } = useToggle(false);

  // const [toggleList, { isLoading: toggleLoading, error: toggleError, isSuccess: toggleSuccess }] = useToggleListMutation();

  // const authenticated = useSelector((state) => state.user.authenticated);
  const btnClicked = (e: any, movieID: number, list: string) => {
    e.preventDefault();
    // if (authenticated) {
    //     toggleList({ list, movieID, query })
    // }
  };

  if (isLoading) return <></>;
  return (
    <div className="flex-1 bg-main-dark p-4">
      <div className="flex justify-between">
        <label className="text-white">Results for "{query}"</label>
        <button className="text-white lg:hidden" onClick={() => toggleValue()}>
          <FaFilter />
        </button>
      </div>
      <div className={isfiltersshown ? "block" : "hidden"}>
        <FilterTable inline />
      </div>
      <MovieTable
        movies={movies}
        toggleList={btnClicked}
        actionsDisabled
        // actionsDisabled={!authenticated}
      />
      <Pagination
        currentPage={page}
        pageSize={20}
        totalResults={totalResults}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default SearchResultsTable;
