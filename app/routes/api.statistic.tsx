import { LoaderFunctionArgs } from "@remix-run/node";
import { SearchResult } from "~/services/api";
import data from "~/data/searchResults.json";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  return {
    result: data?.items?.find(
      (item: SearchResult) => item.identifier === parseInt(id)
    ),
  };
}
