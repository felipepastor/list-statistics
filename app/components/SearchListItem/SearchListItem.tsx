import { Link } from "@remix-run/react";
import { type SearchResult } from "~/data/results";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

export const SearchListItem = (
  props: SearchResult & { onFavoriteButtonClick: () => void }
) => {
  const { onFavoriteButtonClick } = props;

  return (
    <Link to={`/statistic/${props.identifier}`}>
      <div className="relative grid grid-cols-[200px_auto] h-[240px] max-w-full w-full gap-x-4 p-3 border border-gray-200 rounded-md shadow-md hover:shadow-lg prose">
        <figure className="mb-0 mt-0">
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
          <FavoriteButton
            id={props.identifier.toString()}
            className="absolute self-end bottom-0 right-0 z-10"
            onClick={onFavoriteButtonClick}
          />
        </section>
      </div>
    </Link>
  );
};
