import { SearchResult } from "~/data/results";
import { SearchListItem } from "../SearchListItem/SearchListItem";

export const SearchList = ({ results }: { results: SearchResult[] | null }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {results?.map((result) => (
        <SearchListItem
          key={result.identifier}
          {...result}
        />
      ))}
    </div>
  );
};
