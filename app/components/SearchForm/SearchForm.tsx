import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

import styles from "./SearchForm.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const SearchForm = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};
