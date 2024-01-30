import { useState } from "react";
import Heart from "../icons/Heart";
import clsx from "clsx";

type FavoriteButton = {
  className?: string;
  name?: string;
  isFavoriteSearch?: boolean;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
};

export const FavoriteSearchButton = ({
  className,
  name,
  isFavoriteSearch,
  onClick,
}: FavoriteButton) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteSearch);

  const onClickFavoriteHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    setIsFavorite(!isFavorite);
    onClick && onClick?.(e);
  };

  return (
    <button
      className={clsx("btn btn-ghost btn-circle", className)}
      onClick={onClickFavoriteHandler}
      name={name}
    >
      <Heart fill={isFavorite ? "black" : "white"} />
    </button>
  );
};
