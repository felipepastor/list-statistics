import { setFavoriteItem } from "./setFavoriteItem";
import { LOCAL_STORAGE_KEY } from "./const";
import "jest-localstorage-mock";

describe("setFavoriteItem", () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(localStorage, "getItem");
    setItemSpy = jest.spyOn(localStorage, "setItem");
  });

  afterEach(() => {
    getItemSpy?.mockRestore();
    setItemSpy?.mockRestore();
  });

  it("should add an item to the favorites if it is not already a favorite", () => {
    getItemSpy?.mockImplementation(() => JSON.stringify(["item1", "item2"]));
    setFavoriteItem("item3");
    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(["item1", "item2", "item3"])
    );
  });

  it("should remove an item from the favorites if it is already a favorite", () => {
    getItemSpy?.mockImplementation(() => JSON.stringify(["item1", "item2"]));
    setFavoriteItem("item2");
    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(["item1"])
    );
  });

  it("should add an item to the favorites if there are no favorite items", () => {
    getItemSpy?.mockImplementation(() => null);
    setFavoriteItem("item1");
    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(["item1"])
    );
  });
});
