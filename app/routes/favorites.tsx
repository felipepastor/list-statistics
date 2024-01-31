import { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SearchList } from "~/components/SearchList/SearchList";
import { ArrowLeftShort } from "~/components/icons";
import { SearchResult, getFavorites } from "~/services/api";
import { getFavoriteItems } from "~/utils/getFavoriteItems";

export const meta: MetaFunction = () => {
  return [
    { title: "Statista FE Code Challenge" },
    { name: "description", content: "Statista FE Code Challenge" },
  ];
};

export async function loader() {
  return null;
}

function filterFavorites(results: SearchResult[], favoriteIds: string[]) {
  return results.filter((result) =>
    favoriteIds.includes(result.identifier.toString())
  );
}

const FavoritesPage = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState<SearchResult[]>([]);
  const localStorageResults = getFavoriteItems();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await getFavorites(localStorageResults);
      setResults(data.results);
    };
    fetchResults();
  }, []);

  return (
    <main className="container mx-auto mb-10">
      <Link
        className="mb-4 inline-block"
        to={`/`}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <button className="btn btn-circle btn-ghost">
          <ArrowLeftShort />
        </button>
      </Link>
      {results && results?.length ? (
        <section className="flex justify-center items-center">
          <SearchList
            results={results}
            onFavoriteButtonClick={() => {
              const finalFiltered = getFavoriteItems();
              setResults(filterFavorites(results, finalFiltered));
            }}
          />
        </section>
      ) : (
        <section className="flex max-w-full justify-center items-center prose">
          <h3 className="text-center">
            Please, save first some statistic as your favorite.
          </h3>
        </section>
      )}
    </main>
  );
};

export default FavoritesPage;
