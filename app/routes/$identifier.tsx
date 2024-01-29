import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { getResults } from "~/data/results";
import styles from "~/styles/$identifier.css";
import { formatDate } from "~/utils/formatDate";
import { ArrowLeftShort } from "~/components/icons";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function NoteDetailsPage() {
  const result = useLoaderData<typeof loader>();

  if (!result) return null;

  const formatted = formatDate(result?.date);

  return (
    <main className="container mx-auto">
      <Link
        className="mb-4 inline-block"
        to={"/"}
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
  const results = await getResults();
  const id = params.identifier;

  if (!id) {
    return null;
  }

  const findResult = results.find(
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="container mx-auto">
        <Link
          className="mb-4 inline-block"
          to={"/"}
        >
          <FaArrowLeft className="text-[20px]" />
        </Link>
        <section className="prose flex justify-center max-w-full">
          <h2 className="flex">
            {error.status} {error.statusText}
          </h2>
          <p>{error.data}</p>
        </section>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>ERROR!!!</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
