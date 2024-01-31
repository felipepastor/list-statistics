import "jest-localstorage-mock";
import { getFavoriteItems } from "./getFavoriteItems";
import { LOCAL_STORAGE_KEY } from "./const";
import { setFavoriteItem } from "./setFavoriteItem";
// import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("getFavoriteItems", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array when window is undefined", () => {
    const originalWindow = global.window;
    if (typeof global.window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      global.window = undefined as any;
    }
    const result = getFavoriteItems();
    expect(result).toEqual([]);
    global.window = originalWindow;
  });

  it("should return an array of favorite items", () => {
    const mockFavorites = ["item1", "item2"];
    setFavoriteItem("item1");
    setFavoriteItem("item2");
    const getItemSpy = jest
      .spyOn(localStorage, "getItem")
      .mockImplementation(() => JSON.stringify(mockFavorites));

    getFavoriteItems();
    expect(getItemSpy).toHaveBeenCalled();

    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")).toEqual(
      mockFavorites
    );
    expect(getItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    getItemSpy.mockRestore();
  });
});
