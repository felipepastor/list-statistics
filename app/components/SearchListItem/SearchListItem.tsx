import { type SearchResult } from "~/data/results";

export const SearchListItem = (props: SearchResult) => {
  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-md shadow-md mb-4">
      <div className="flex flex-col">
        <div className="text-sm font-medium text-gray-900">{props.title}</div>
        <div className="text-sm text-gray-500">{props.identifier}</div>
      </div>
    </div>
  );
};
