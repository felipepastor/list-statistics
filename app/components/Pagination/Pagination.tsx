import { useSearchParams } from "@remix-run/react";

type PaginationProps = {
  totalResults: number;
  pageSize?: number;
};

export const Pagination = ({
  totalResults,
  pageSize = 10,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("searchQuery") || "";

  const totalPages = Math.ceil(totalResults / pageSize);

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const prevPage = page - 1;
  const nextPage = page + 1;

  console.log(totalPages);

  return (
    <div className="join">
      {!isFirstPage && (
        <button
          className="join-item btn"
          onClick={() => setSearchParams({ page: String(prevPage) })}
        >
          Prev
        </button>
      )}

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`join-item btn ${page === index + 1 ? "btn-active" : ""}`}
          onClick={() =>
            setSearchParams({
              page: (index + 1).toString(),
              searchQuery,
            })
          }
        >
          {index + 1}
        </button>
      ))}

      {!isLastPage && (
        <button
          className="join-item btn"
          onClick={() =>
            setSearchParams({ page: nextPage.toString(), searchQuery })
          }
        >
          Next
        </button>
      )}
    </div>
  );
};
