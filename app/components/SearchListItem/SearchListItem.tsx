import { Link, useSearchParams } from "@remix-run/react";
import { type SearchResult } from "~/data/results";

export const SearchListItem = (props: SearchResult) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const page = searchParams.get("page") || "1";

  return (
    <Link to={`/${props.identifier}?searchQuery=${searchQuery}&page=${page}`}>
      <div className="grid grid-cols-[200px_auto] h-[240px] max-w-full w-full gap-x-4 p-3 border border-gray-200 rounded-md shadow-md hover:shadow-lg prose">
        <figure className="mb-0">
          <img
            className="w-[200px] h-[150px] object-cover object-center mb-4"
            src={props.teaser_image_urls[0].src}
            alt={props.title}
          />
          <figcaption className="text-[10px] text-ellipsis overflow-hidden">
            {props.title}
          </figcaption>
        </figure>
        <section className="flex flex-col">
          <h3 className="m-0 break-all">{props.title}</h3>
          <p className="text-sm">{props.subject}</p>
        </section>
      </div>
    </Link>
  );
};
