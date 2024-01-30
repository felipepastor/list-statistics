import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { getResults } from "~/data/results";
import styles from "~/styles/$identifier.css";
import { formatDate } from "~/utils/formatDate";
import { ArrowLeftShort } from "~/components/icons";
import { FavoriteButton } from "~/components/FavoriteButton/FavoriteButton";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};

export default function DetailsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const page = searchParams.get("page") || "1";
  const result = useLoaderData<typeof loader>();

  if (!result) return null;

  const formatted = formatDate(result?.date);

  return (
    <main className="container mx-auto">
      <header className="flex justify-between items-center mb-4">
        <Link
          className="mb-4 inline-block"
          to={`/?searchQuery=${searchQuery}&page=${page}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <button className="btn btn-circle btn-ghost">
            <ArrowLeftShort />
          </button>
        </Link>
        <FavoriteButton id={result?.identifier.toString()} />
      </header>
      <article className=" grid wrapper">
        <section className="prose flex flex-col">
          <h2 className="flex justify-between items-baseline">
            {result?.title}
          </h2>
          <span className="text-sm">{formatted}</span>
          <p>{result?.subject}</p>
          <p>{result?.description}</p>
        </section>
        <figure className="prose flex flex-col content-center items-center">
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

  const findResult = resultsJson.results.find((result) => {
    return result.identifier === parseInt(id);
  });

  if (!findResult) {
    throw new Response(null, {
      status: 404,
      statusText: "Item not found, please try again.",
    });
  }

  return findResult;
}
