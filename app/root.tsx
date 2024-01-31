import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { HeaderApp } from "~/components/HeaderApp/HeaderApp";
import { ArrowLeftShort } from "./components/icons";

declare global {
  interface Window {
    ENV: { HOST_URL: string };
  }
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Open Sans",
  },
];

export async function loader() {
  return json({
    ENV: {
      HOST_URL: process.env.HOST_URL,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <HeaderApp />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <HeaderApp />
        <main className="container mx-auto">
          <Link
            className="mb-4 inline-block"
            to={"/"}
          >
            <ArrowLeftShort />
          </Link>
          <section className="prose flex justify-center max-w-full">
            <h2 className="flex">
              {isRouteErrorResponse(error)
                ? `${error.status} ${error.statusText}`
                : error instanceof Error
                ? error.message
                : "Unknown Error"}
            </h2>
          </section>
        </main>
      </body>
    </html>
  );
}
