import { SearchResult } from "~/data/results";
import { SearchListItem } from "../SearchListItem/SearchListItem";

export const SearchList = ({
  results,
  onFavoriteButtonClick,
}: {
  results: SearchResult[] | null;
  onFavoriteButtonClick: () => void;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
      {results?.map((result) => (
        <SearchListItem
          onFavoriteButtonClick={onFavoriteButtonClick}
          key={result.identifier}
          {...result}
        />
      ))}
    </div>
  );
};
