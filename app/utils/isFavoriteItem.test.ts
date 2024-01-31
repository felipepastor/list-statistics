import { isFavoriteItem } from "./isFavoriteItem";
import "jest-localstorage-mock";

describe("isFavoriteItem", () => {
  let getItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(localStorage, "getItem");
  });

  afterEach(() => {
    getItemSpy?.mockRestore();
  });

  it("should return true if the item is a favorite", () => {
    getItemSpy?.mockImplementation(() => JSON.stringify(["item1", "item2"]));
    expect(isFavoriteItem("item1")).toBe(true);
  });

  it("should return false if the item is not a favorite", () => {
    getItemSpy?.mockImplementation(() => JSON.stringify(["item1", "item2"]));
    expect(isFavoriteItem("item3")).toBe(false);
  });

  it("should return false if there are no favorite items", () => {
    getItemSpy?.mockImplementation(() => null);
    expect(isFavoriteItem("item1")).toBe(false);
  });
});
