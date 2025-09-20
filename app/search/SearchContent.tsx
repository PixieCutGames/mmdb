"use client";

import { useSearchParams } from "next/navigation";
import useSearch from "./useSearch";
import FilterTable from "./FilterTable";
import SearchResultsTable from "./SearchResultsTable";
import { useState } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { movies, isLoading, page, total_pages, total_results } = useSearch(
    query ?? "",
    currentPage ?? 1
  );
  return (
    <main className="p-4 flex">
      <SearchResultsTable
        isLoading={isLoading}
        movies={movies}
        page={page ?? 0}
        totalPages={total_pages ?? 0}
        totalResults={total_results ?? 0}
        query={query ?? ""}
        changePage={(page) => {
          setCurrentPage(page);
        }}
      />
      {isLoading ? (
        <></>
      ) : (
        <div className="xl:w-4/12 w-3/12 max-w-md hidden lg:block pl-4">
          <FilterTable />
        </div>
      )}
    </main>
  );
}

export default SearchContent;
