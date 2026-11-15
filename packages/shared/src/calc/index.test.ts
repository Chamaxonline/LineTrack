import { describe, expect, it } from "vitest";
import { roundToLotSize } from "./index.js";

describe("roundToLotSize", () => {
  it("rounds to the nearest multiple of lotSize", () => {
    expect(roundToLotSize(47, 10)).toBe(50);
    expect(roundToLotSize(44, 10)).toBe(40);
  });

  it("throws when lotSize is not positive", () => {
    expect(() => roundToLotSize(10, 0)).toThrow();
  });
});
