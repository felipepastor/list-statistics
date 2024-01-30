import { LOCAL_STORAGE_KEY } from "./const";

export function isFavoriteItem(id: string): boolean {
  const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  const isFavorite = favorites.includes(id);

  return isFavorite;
}
