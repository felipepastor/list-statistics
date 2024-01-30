import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

import styles from "./SearchForm.css";
import { Form, useSearchParams } from "@remix-run/react";
import { useState } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const [query, setQuery] = useState(searchQuery);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Form
      method="get"
      action="/"
    >
      <div className="mb-10 flex items-center justify-center">
        <input
          type="text"
          name="searchQuery"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={query}
          onChange={onChangeHandler}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Search
        </button>
      </div>
    </Form>
  );
};
