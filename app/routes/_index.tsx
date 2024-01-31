import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Pagination } from "~/components/Pagination/Pagination";
import {
  SearchForm,
  links as primaryButtonLinks,
} from "~/components/SearchForm/SearchForm";
import { SearchList } from "~/components/SearchList/SearchList";
import { getStatistics } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Statista FE Code Challenge" },
    { name: "description", content: "Statista FE Code Challenge" },
  ];
};

export const links: LinksFunction = () => [...primaryButtonLinks()];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("searchQuery") || "";
  const page = parseInt(url.searchParams.get("page") || "1");

  const results = await getStatistics(query, page, 10);

  return results;
}

export default function Index() {
  const { results, totalResults } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto mb-10">
      <SearchForm />
      {results && results?.length > 0 ? (
        <>
          <SearchList results={results} />
          <section className="flex justify-center items-center">
            <Pagination totalResults={totalResults} />
          </section>
        </>
      ) : (
        <section className="flex max-w-full justify-center items-center prose">
          <h3 className="text-center">
            No results found, please search first.
          </h3>
        </section>
      )}
    </main>
  );
}
