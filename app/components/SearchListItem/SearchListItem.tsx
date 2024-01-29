import { Link } from "@remix-run/react";
import { type SearchResult } from "~/data/results";

export const SearchListItem = (props: SearchResult) => {
  return (
    <Link to={`/${props.identifier}`}>
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
          <h3 className="m-0">{props.title}</h3>
          <p className="text-sm">{props.subject}</p>
        </section>
      </div>
    </Link>
  );
};
