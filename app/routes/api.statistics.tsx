import { LoaderFunctionArgs } from "@remix-run/node";
import { SearchResult } from "~/services/api";
import data from "~/data/searchResults.json";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("searchQuery") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

  const filteredResults =
    data?.items?.filter((item: SearchResult) =>
      item.title.toLowerCase().includes(query?.toLocaleLowerCase() || "")
    ) ?? [];

  const totalResults = filteredResults.length;

  if (page && pageSize) {
    // Calculate start and end index for the slice method
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const storedResults = filteredResults.slice(startIndex, endIndex);
    return { results: storedResults, totalResults };
  }

  return { results: filteredResults, totalResults };
}
