import { LOCAL_STORAGE_KEY } from "./const";

export function setFavoriteItems(item: string) {
  const favoriteItems = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
  );

  if (favoriteItems.includes(item)) {
    const filtered = favoriteItems.filter((currentItem: string) => {
      return currentItem !== item;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...filtered]));
    return;
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify([...favoriteItems, item])
  );
}
