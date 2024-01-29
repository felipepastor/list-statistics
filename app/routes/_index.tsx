import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  SearchForm,
  links as primaryButtonLinks,
} from "~/components/SearchForm/SearchForm";
import { SearchList } from "~/components/SearchList/SearchList";
import { getResults } from "~/data/results";

export const meta: MetaFunction = () => {
  return [
    { title: "Statista FE Code Challenge" },
    { name: "description", content: "Statista FE Code Challenge" },
  ];
};

export const links: LinksFunction = () => [...primaryButtonLinks()];

export async function loader() {
  const results = await getResults();
  return results;
  // return null;
}

export default function Index() {
  const results = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <SearchForm />
      <SearchList results={results} />
    </main>
  );
}
