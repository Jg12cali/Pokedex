import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },  
  
  {
    input: "my name is apple ",
    expected: ["my", "name", "is", "apple"],
  },  
  
  {
    input: "  I LOVE    COOCA POOFS  ",
    expected: ["i", "love", "cooca", "poofs"],
  }

]) ("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
  const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});





















