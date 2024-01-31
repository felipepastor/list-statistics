import { LOCAL_STORAGE_KEY } from "./const";

export function getFavoriteItems(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  const favorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  return favorites;
}
