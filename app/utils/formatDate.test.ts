import { formatDate } from "./formatDate";
// import { describe, it, expect } from "vitest";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = "2022-01-01";
    const expected = "01.01.2022";
    const result = formatDate(date);
    expect(result).toBe(expected);
  });

  it("should handle invalid dates", () => {
    const date = "invalid-date";
    const expected = "Invalid Date";
    const result = formatDate(date);
    expect(result).toBe(expected);
  });
});
