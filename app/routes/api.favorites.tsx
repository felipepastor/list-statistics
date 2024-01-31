import { LoaderFunctionArgs } from "@remix-run/node";
import data from "~/data/searchResults.json";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const favorites = JSON.parse(url.searchParams.get("favorites") || "[]");

  if (favorites && favorites.length) {
    const favoriteResults = data?.items?.filter((result) =>
      favorites.includes(result.identifier.toString())
    );

    return { results: favoriteResults, totalResults: favoriteResults?.length };
  }

  return { results: [], totalResults: 0 };
}
