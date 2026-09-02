import { digitToEnglishWords } from "../src/converters/englishConverter";
import { conversionCache } from "../src/utils/cacheUtils";

describe("English Number to Words Converter", () => {
  beforeEach(() => {
    conversionCache.clear();
  });

  describe("Basic conversion", () => {
    const cases: [number, string][] = [
      [0, "zero"],
      [7, "seven"],
      [19, "nineteen"],
      [42, "forty two"],
      [99, "ninety nine"],
      [100, "one hundred"],
      [101, "one hundred one"],
      [999, "nine hundred ninety nine"],
      [1000, "one thousand"],
      [100000, "one lakh"],
      [10000000, "one crore"],
      [1000000000, "one arab"],
    ];

    cases.forEach(([input, expected]) => {
      it(`converts ${input} to "${expected}"`, () => {
        expect(digitToEnglishWords(input)).toBe(expected);
      });
    });

    it("uses the Nepali/Indian scale system, not the short scale", () => {
      expect(digitToEnglishWords(1_000_000)).toBe("ten lakh");
    });

    it("handles the maximum supported value", () => {
      const result = digitToEnglishWords(BigInt("9".repeat(39)));
      expect(result.startsWith("ninety nine maha singhar")).toBe(true);
      expect(result.endsWith("nine hundred ninety nine")).toBe(true);
    });
  });

  describe("Decimals", () => {
    it("spells decimal digits individually by default", () => {
      expect(digitToEnglishWords(1.23)).toBe("one point two three");
    });

    it("spells decimals as a whole number when asked", () => {
      expect(digitToEnglishWords(1.23, { individualDecimalDigits: false })).toBe(
        "one point twenty three"
      );
    });

    it("pads a single decimal digit to two places", () => {
      expect(digitToEnglishWords(1.5)).toBe("one point five zero");
    });

    it("rounds to two decimal places", () => {
      expect(digitToEnglishWords(1.567, { individualDecimalDigits: false })).toBe(
        "one point fifty seven"
      );
    });

    it("carries a decimal that rounds up to 1.00 into the integer part", () => {
      expect(digitToEnglishWords(1.999)).toBe("two");
    });

    it("omits a decimal part that rounds to zero", () => {
      expect(digitToEnglishWords(123.001)).toBe("one hundred twenty three");
      expect(digitToEnglishWords(123.0)).toBe("one hundred twenty three");
    });

    it("omits the decimal part when includeDecimal is false", () => {
      expect(digitToEnglishWords(1.23, { includeDecimal: false })).toBe("one");
    });

    it("keeps zero for a value that is entirely a rounded-away decimal", () => {
      expect(digitToEnglishWords(0.001)).toBe("zero");
      expect(digitToEnglishWords(0.009)).toBe("zero point zero one");
    });
  });

  describe("Currency", () => {
    it("prefixes the currency name and combines decimal digits", () => {
      expect(digitToEnglishWords(1234.56, { isCurrency: true })).toBe(
        "Dollars one thousand two hundred thirty four cents fifty six"
      );
    });

    it("accepts custom currency and suffix wording", () => {
      expect(
        digitToEnglishWords(5.25, {
          isCurrency: true,
          currency: "Rupees",
          currencyDecimalSuffix: "paisa",
        })
      ).toBe("Rupees five paisa twenty five");
    });

    it("omits an empty currency prefix", () => {
      expect(digitToEnglishWords(5, { isCurrency: true, currency: "" })).toBe("five");
    });
  });

  describe("Custom mappings", () => {
    it("overrides unit words", () => {
      expect(
        digitToEnglishWords(5, { units: { 5: { en: "cinco", ne: "पाँच" } } })
      ).toBe("cinco");
    });

    it("overrides scale words", () => {
      expect(
        digitToEnglishWords(100000, { scales: { 100000: { en: "hundred thousand", ne: "लाख" } } })
      ).toBe("one hundred thousand");
    });

    it("does not let a custom-mapped result leak into the shared cache", () => {
      expect(digitToEnglishWords(5, { units: { 5: { en: "cinco", ne: "पाँच" } } })).toBe("cinco");
      expect(digitToEnglishWords(5)).toBe("five");
    });

    it("rejects malformed custom mappings", () => {
      expect(() =>
        digitToEnglishWords(5, { units: { 5: { en: "cinco" } } as any })
      ).toThrow("Invalid custom mapping configuration");
      expect(() =>
        digitToEnglishWords(5, { scales: { 42: { en: "x", ne: "y" } } })
      ).toThrow("Invalid custom mapping configuration");
    });
  });

  describe("Input handling", () => {
    it("accepts numeric strings, including leading zeros", () => {
      expect(digitToEnglishWords("0000123")).toBe(digitToEnglishWords(123));
      expect(digitToEnglishWords("123.45")).toBe("one hundred twenty three point four five");
    });

    it("accepts numbers that JavaScript stringifies in exponential notation", () => {
      expect(digitToEnglishWords(1e21)).toBe("one ank");
      expect(digitToEnglishWords(1.5e22)).toBe("fifteen ank");
      expect(digitToEnglishWords(1e-7)).toBe("zero");
    });

    it("rejects negative, non-finite, and non-numeric input", () => {
      const invalid = [-1, NaN, Infinity, -Infinity, "abc", "1.2.3", "1e", "", null, undefined, {}];
      for (const value of invalid) {
        expect(() => digitToEnglishWords(value as any)).toThrow();
      }
      expect(() => digitToEnglishWords(BigInt(-1))).toThrow();
    });

    it("rejects values above the maximum supported scale", () => {
      expect(() => digitToEnglishWords("1".repeat(42))).toThrow(
        "Input exceeds maximum supported value"
      );
      expect(() => digitToEnglishWords(1e42)).toThrow(
        "Input exceeds maximum supported value"
      );
    });
  });

  describe("Caching", () => {
    it("returns equal results on repeat calls", () => {
      const first = digitToEnglishWords(123456);
      expect(conversionCache.size).toBe(1);
      expect(digitToEnglishWords(123456)).toBe(first);
    });

    it("keys the cache on configuration, not just the number", () => {
      expect(digitToEnglishWords(5)).toBe("five");
      expect(digitToEnglishWords(5, { isCurrency: true })).toBe("Dollars five");
      expect(digitToEnglishWords(5, { lang: "ne" })).toBe("पाँच");
    });
  });
});
