import { describe, expect, it } from "vitest";
import en from "./en.json";
import si from "./si.json";
import ta from "./ta.json";

describe("i18n key parity", () => {
  const baseKeys = Object.keys(en).sort();

  it("si.json has every key from en.json", () => {
    expect(Object.keys(si).sort()).toEqual(baseKeys);
  });

  it("ta.json has every key from en.json", () => {
    expect(Object.keys(ta).sort()).toEqual(baseKeys);
  });
});
