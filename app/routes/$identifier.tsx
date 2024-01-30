import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { getResults } from "~/data/results";
import styles from "~/styles/$identifier.css";
import { formatDate } from "~/utils/formatDate";
import { ArrowLeftShort } from "~/components/icons";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function DetailsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const page = searchParams.get("page") || "1";
  const result = useLoaderData<typeof loader>();

  if (!result) return null;

  const formatted = formatDate(result?.date);

  return (
    <main className="container mx-auto">
      <Link
        className="mb-4 inline-block"
        to={`/?searchQuery=${searchQuery}&page=${page}`}
      >
        <ArrowLeftShort />
      </Link>
      <article className=" grid wrapper">
        <section className="prose flex flex-col">
          <h2 className="flex justify-between items-baseline">
            {result?.title}
          </h2>
          <span className="text-sm">{formatted}</span>
          <p>{result?.subject}</p>
          <p>{result?.description}</p>
        </section>
        <figure className="prose">
          <img
            src={result?.teaser_image_urls[0].src}
            alt={result?.title}
          />
          <figcaption>{result?.title}</figcaption>
        </figure>
      </article>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const resultsJson = await getResults();
  const id = params.identifier;

  if (!id) {
    return null;
  }

  const findResult = resultsJson.results.find(
    (result) => result.identifier === parseInt(id)
  );

  if (!findResult) {
    throw new Response(null, {
      status: 404,
      statusText: "Item not found, please try again.",
    });
  }

  return findResult;
}
