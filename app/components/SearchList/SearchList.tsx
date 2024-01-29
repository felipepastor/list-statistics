import { SearchResult } from "~/data/results";
import { SearchListItem } from "../SearchListItem/SearchListItem";

export const SearchList = ({ results }: { results: SearchResult[] }) => {
  return (
    <div>
      {results.map((result) => (
        <SearchListItem
          key={result.identifier}
          {...result}
        />
      ))}
    </div>
  );
};
