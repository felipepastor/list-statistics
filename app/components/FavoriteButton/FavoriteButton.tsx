import { useState } from "react";
import Heart from "../icons/Heart";
import { isFavoriteItem } from "~/utils/isFavoriteItem";
import { setFavoriteItem } from "~/utils/setFavoriteItem";
import clsx from "clsx";

type FavoriteButton = {
  id: string;
  className?: string;
  onClick?: () => void;
};

export const FavoriteButton = ({ id, className, onClick }: FavoriteButton) => {
  const [isFavorite, setIsFavorite] = useState(
    typeof window !== "undefined" ? isFavoriteItem(id) : false
  );

  const onClickFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setFavoriteItem(id);
    setIsFavorite(!isFavorite);
    onClick?.();
  };

  return (
    <button
      className={clsx("btn", "btn-circle", "btn-ghost", className)}
      onClick={onClickFavoriteHandler}
    >
      <Heart fill={isFavorite ? "black" : "white"} />
    </button>
  );
};
