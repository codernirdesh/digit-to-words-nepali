import {
  isValidNumber,
  splitNumber,
  toPlainNumericString,
  assertWithinSupportedRange,
  MAX_SUPPORTED_INTEGER,
} from "../src/utils/validationUtils";
import {
  unicodeToEnglishNumber,
  unicodeToEnglishDigits,
  englishToUnicodeNumber,
} from "../src/utils/numberUtils";
import { formatWords } from "../src/utils/formatUtils";
import { resolveConfig } from "../src/utils/configUtils";

describe("toPlainNumericString", () => {
  const cases: [number | string, string][] = [
    [1e21, "1000000000000000000000"],
    [1.5e22, "15000000000000000000000"],
    [1e-7, "0.0000001"],
    [1.23e-5, "0.0000123"],
    ["1.5e3", "1500"],
    ["2E2", "200"],
    ["-1e3", "-1000"],
    [123, "123"],
    [1.25, "1.25"],
    ["  42  ", "42"],
  ];

  cases.forEach(([input, expected]) => {
    it(`expands ${String(input)} to "${expected}"`, () => {
      expect(toPlainNumericString(input)).toBe(expected);
    });
  });
});

describe("isValidNumber", () => {
  it("accepts non-negative numbers, strings, and bigints", () => {
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(1.5)).toBe(true);
    expect(isValidNumber("123.45")).toBe(true);
    expect(isValidNumber("1e21")).toBe(true);
    expect(isValidNumber(0n)).toBe(true);
    expect(isValidNumber(BigInt("9".repeat(50)))).toBe(true);
  });

  it("rejects negatives, non-finite values, and junk", () => {
    expect(isValidNumber(-1)).toBe(false);
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-1n)).toBe(false);
    expect(isValidNumber("")).toBe(false);
    expect(isValidNumber("abc")).toBe(false);
    expect(isValidNumber("1.2.3")).toBe(false);
    expect(isValidNumber("12a")).toBe(false);
    expect(isValidNumber("-5")).toBe(false);
    expect(isValidNumber(null as any)).toBe(false);
    expect(isValidNumber({} as any)).toBe(false);
  });
});

describe("splitNumber", () => {
  it("returns bigints untouched", () => {
    expect(splitNumber(42n)).toEqual({ integer: 42n });
  });

  it("splits and rounds decimals to two places", () => {
    expect(splitNumber(1.5)).toEqual({ integer: 1n, decimal: "50", decimalDigits: 1 });
    expect(splitNumber("1.567")).toEqual({ integer: 1n, decimal: "57", decimalDigits: 2 });
    expect(splitNumber(1.001)).toEqual({ integer: 1n, decimal: "00", decimalDigits: 2 });
  });

  it("reports how many decimal digits the caller actually wrote, capped at 2", () => {
    expect(splitNumber(1.5).decimalDigits).toBe(1);
    expect(splitNumber("1.50").decimalDigits).toBe(2);
    expect(splitNumber(1.05).decimalDigits).toBe(2);
    expect(splitNumber("1.5678").decimalDigits).toBe(2);
    expect(splitNumber(5).decimalDigits).toBeUndefined();
    expect(splitNumber(5n).decimalDigits).toBeUndefined();
  });

  it("carries a decimal rounding up to 1.00 into the integer", () => {
    expect(splitNumber(1.999)).toEqual({ integer: 2n });
  });

  it("handles exponential input", () => {
    expect(splitNumber(1e21)).toEqual({ integer: BigInt("1" + "0".repeat(21)) });
  });
});

describe("assertWithinSupportedRange", () => {
  it("allows exactly the maximum supported value", () => {
    expect(() => assertWithinSupportedRange(MAX_SUPPORTED_INTEGER)).not.toThrow();
  });

  it("rejects anything larger", () => {
    expect(() => assertWithinSupportedRange(MAX_SUPPORTED_INTEGER + 1n)).toThrow(
      "Input exceeds maximum supported value (10^41 - 1)"
    );
  });
});

describe("digit transliteration", () => {
  it("converts Nepali digits to a number", () => {
    expect(unicodeToEnglishNumber("१२३")).toBe(123);
    expect(unicodeToEnglishNumber("०")).toBe(0);
  });

  it("converts Nepali digits to an ASCII digit string without a size limit", () => {
    const big = "९".repeat(30);
    expect(unicodeToEnglishDigits(big)).toBe("9".repeat(30));
  });

  it("rejects invalid Nepali digit input", () => {
    expect(() => unicodeToEnglishNumber("")).toThrow("non-empty string");
    expect(() => unicodeToEnglishNumber("१२३x")).toThrow("only Nepali digits");
    expect(() => unicodeToEnglishNumber(123 as any)).toThrow("non-empty string");
    expect(() => unicodeToEnglishNumber("९".repeat(30))).toThrow("safe integer");
  });

  it("converts ASCII digits to Nepali digits", () => {
    expect(englishToUnicodeNumber(2081)).toBe("२०८१");
    expect(englishToUnicodeNumber("007")).toBe("००७");
    expect(englishToUnicodeNumber(12345678901234567890n)).toBe("१२३४५६७८९०१२३४५६७८९०");
  });

  it("round-trips", () => {
    expect(unicodeToEnglishNumber(englishToUnicodeNumber(98765))).toBe(98765);
  });

  it("rejects non-digit input", () => {
    expect(() => englishToUnicodeNumber("-5")).toThrow("only digits");
    expect(() => englishToUnicodeNumber("1.5")).toThrow("only digits");
  });
});

describe("formatWords", () => {
  it("drops empty entries and collapses whitespace", () => {
    expect(formatWords(["एक", "", "सय", "  ", "तेइस"])).toBe("एक सय तेइस");
    expect(formatWords([])).toBe("");
  });
});

describe("resolveConfig", () => {
  it("applies language defaults", () => {
    expect(resolveConfig("ne", {})).toMatchObject({
      lang: "ne",
      currency: "रुपैयाँ",
      decimalSuffix: "दशमलव",
      currencyDecimalSuffix: "पैसा",
    });
    expect(resolveConfig("en", {})).toMatchObject({
      currency: "Dollars",
      decimalSuffix: "point",
      currencyDecimalSuffix: "cents",
    });
  });

  it("defaults individualDecimalDigits to the inverse of isCurrency", () => {
    expect(resolveConfig("ne", {}).individualDecimalDigits).toBe(true);
    expect(resolveConfig("ne", { isCurrency: true }).individualDecimalDigits).toBe(false);
  });

  it("honours an explicit individualDecimalDigits", () => {
    expect(
      resolveConfig("ne", { isCurrency: true, individualDecimalDigits: true })
        .individualDecimalDigits
    ).toBe(true);
  });

  it("lets user config override defaults", () => {
    expect(resolveConfig("ne", { currency: "डलर" }).currency).toBe("डलर");
  });
});
