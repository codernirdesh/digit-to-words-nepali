import { digitToNepaliWords } from "../src/converters/nepaliConverter";

describe("Nepali Number to Words Converter", () => {
  describe("Single digits (0-9)", () => {
    const singleDigitCases: [number, string][] = [
      [0, "सुन्ना"],
      [1, "एक"],
      [2, "दुई"],
      [3, "तीन"],
      [4, "चार"],
      [5, "पाँच"],
      [6, "छ"],
      [7, "सात"],
      [8, "आठ"],
      [9, "नौ"],
    ];

    singleDigitCases.forEach(([input, expected]) => {
      it(`should convert ${input} to "${expected}"`, () => {
        const result = digitToNepaliWords(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Double digits (10-99)", () => {
    const doubleDigitCases: [number, string][] = [
      [10, "दश"],
      [11, "एघार"],
      [12, "बाह्र"],
      [13, "तेह्र"],
      [14, "चौध"],
      [15, "पन्ध्र"],
      [16, "सोह्र"],
      [17, "सत्र"],
      [18, "अठार"],
      [19, "उन्नाइस"],
      [20, "बीस"],
      [21, "एक्काइस"],
      [30, "तीस"],
      [42, "बयालिस"],
      [50, "पचास"],
      [67, "सतसट्ठी"],
      [75, "पचहत्तर"],
      [89, "उनान्नब्बे"],
      [90, "नब्बे"],
      [99, "उनान्सय"],
    ];

    doubleDigitCases.forEach(([input, expected]) => {
      it(`should convert ${input} to "${expected}"`, () => {
        const result = digitToNepaliWords(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Triple digits (100-999)", () => {
    const tripleDigitCases: [number, string][] = [
      [100, "एक सय"],
      [101, "एक सय एक"],
      [110, "एक सय दश"],
      [111, "एक सय एघार"],
      [123, "एक सय तेइस"],
      [200, "दुई सय"],
      [256, "दुई सय छपन्न"],
      [500, "पाँच सय"],
      [555, "पाँच सय पचपन्न"],
      [999, "नौ सय उनान्सय"],
    ];

    tripleDigitCases.forEach(([input, expected]) => {
      it(`should convert ${input} to "${expected}"`, () => {
        const result = digitToNepaliWords(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Thousands (1,000-99,999)", () => {
    const thousandCases: [number, string][] = [
      [1000, "एक हजार"],
      [1001, "एक हजार एक"],
      [1010, "एक हजार दश"],
      [1100, "एक हजार एक सय"],
      [1111, "एक हजार एक सय एघार"],
      [1234, "एक हजार दुई सय चौँतिस"],
      [2000, "दुई हजार"],
      [2345, "दुई हजार तीन सय पैँतालीस"],
      [5678, "पाँच हजार छ सय अठहत्तर"],
      [9999, "नौ हजार नौ सय उनान्सय"],
      [10000, "दश हजार"],
      [12345, "बाह्र हजार तीन सय पैँतालीस"],
      [50000, "पचास हजार"],
      [99999, "उनान्सय हजार नौ सय उनान्सय"],
    ];

    thousandCases.forEach(([input, expected]) => {
      it(`should convert ${input} to "${expected}"`, () => {
        const result = digitToNepaliWords(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Lakhs (1,00,000-99,99,999)", () => {
    const lakhCases: [number, string][] = [
      [100000, "एक लाख"],
      [100001, "एक लाख एक"],
      [100100, "एक लाख एक सय"],
      [100101, "एक लाख एक सय एक"],
      [111111, "एक लाख एघार हजार एक सय एघार"],
      [200000, "दुई लाख"],
      [234567, "दुई लाख चौँतिस हजार पाँच सय सतसट्ठी"],
      [500000, "पाँच लाख"],
      [567890, "पाँच लाख सतसट्ठी हजार आठ सय नब्बे"],
      [999999, "नौ लाख उनान्सय हजार नौ सय उनान्सय"],
    ];

    lakhCases.forEach(([input, expected]) => {
      it(`should convert ${input} to "${expected}"`, () => {
        const result = digitToNepaliWords(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("Currency Configuration", () => {
    describe("Default Currency Settings", () => {
      it("should add default currency word (रुपैयाँ) when isCurrency is true", () => {
        const result = digitToNepaliWords(1, { isCurrency: true });
        expect(result).toBe("रुपैयाँ एक");
      });

      it("should handle zero amount with currency", () => {
        const result = digitToNepaliWords(0, { isCurrency: true });
        expect(result).toBe("रुपैयाँ सुन्ना");
      });

      it("should handle large amounts with currency", () => {
        const result = digitToNepaliWords(100000, { isCurrency: true });
        expect(result).toBe("रुपैयाँ एक लाख");
      });
    });

    describe("Custom Currency Settings", () => {
      it("should use custom currency word when provided", () => {
        const result = digitToNepaliWords(1, {
          isCurrency: true,
          currency: "डलर",
        });
        expect(result).toBe("डलर एक");
      });

      it("should work with empty currency string", () => {
        const result = digitToNepaliWords(1, {
          isCurrency: true,
          currency: "",
        });
        expect(result).toBe("एक");
      });
    });
  });

  describe("Decimal Handling", () => {
    describe("Non-Currency Decimals", () => {
      it("should handle simple decimal numbers", () => {
        const result = digitToNepaliWords(1.5, { 
          includeDecimal: true,
          lang: "ne" 
        });
        expect(result).toBe("एक दशमलव पचास");
      });

      it("should handle zero decimal part", () => {
        const result = digitToNepaliWords(1.0, { 
          includeDecimal: true,
          lang: "ne" 
        });
        expect(result).toBe("एक दशमलव सुन्ना");
      });

      it("should handle multiple decimal places", () => {
        const result = digitToNepaliWords(1.23, { 
          includeDecimal: true,
          lang: "ne" 
        });
        expect(result).toBe("एक दशमलव तेइस");
      });

      it("should use custom decimal suffix when provided", () => {
        const result = digitToNepaliWords(1.5, {
          includeDecimal: true,
          decimalSuffix: "point"
        });
        expect(result).toBe("एक point पचास");
      });
    });

    describe("Currency Decimals", () => {
      it("should use custom decimal suffix when provided with currency", () => {
        const result = digitToNepaliWords(1.5, {
          isCurrency: true,
          includeDecimal: true,
          decimalSuffix: "cents",
          currency: "dollars"
        });
        expect(result).toBe("dollars एक cents पचास");
      });

      it("should use default decimal suffix when not provided", () => {
        const result = digitToNepaliWords(1.5, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ एक दशमलव पचास");
      });
    });
  });

  describe("Error Handling", () => {
    it("should throw error for negative numbers", () => {
      expect(() => digitToNepaliWords(-1)).toThrow(
        "Input must contain only valid digits"
      );
    });

    it("should throw error for non-numeric input", () => {
      expect(() => digitToNepaliWords(Number("abc"))).toThrow(
        "Input must contain only valid digits"
      );
    });

    it("should throw error for invalid integer part", () => {
      expect(() => digitToNepaliWords(Number("1a2"))).toThrow(
        "Input must contain only valid digits"
      );
    });

    it("should throw error for invalid decimal part", () => {
      expect(() => digitToNepaliWords(Number("1.2a"))).toThrow(
        "Decimal part must contain only valid digits"
      );
    });

    it("should throw error for NaN", () => {
      expect(() => digitToNepaliWords(NaN)).toThrow(
        "Input must contain only valid digits"
      );
    });

    it("should throw error for Infinity", () => {
      expect(() => digitToNepaliWords(Infinity)).toThrow(
        "Input must contain only valid digits"
      );
    });
  });

  describe("English Language Output", () => {
    it("should output English words when lang is set to 'en'", () => {
      const result = digitToNepaliWords(1234, { lang: "en" });
      expect(result).toBe("one thousand two hundred thirty four");
    });

    it("should handle single digits in English", () => {
      const result = digitToNepaliWords(5, { lang: "en" });
      expect(result).toBe("five");
    });

    it("should handle teens in English", () => {
      const result = digitToNepaliWords(15, { lang: "en" });
      expect(result).toBe("fifteen");
    });

    it("should handle currency in English", () => {
      const result = digitToNepaliWords(1.5, { 
        lang: "en", 
        isCurrency: true,
        includeDecimal: true,
        currency: "dollars",
        decimalSuffix: "cents"
      });
      expect(result).toBe("dollars one cents fifty");
    });
  });

  describe("Large Scale Numbers", () => {
    describe("Crores", () => {
      const croreCases: [number, string][] = [
        [10000000, "एक करोड"],
        [20000000, "दुई करोड"],
        [15000000, "एक करोड पचास लाख"]
      ];

      croreCases.forEach(([input, expected]) => {
        it(`should convert ${input} to "${expected}"`, () => {
          const result = digitToNepaliWords(input);
          expect(result).toBe(expected);
        });
      });
    });

    describe("Arab and Above", () => {
      const largeCases: [number, string][] = [
        [1000000000, "एक अरब"],
        [100000000000, "एक खरब"],
        [10000000000000, "एक नील"],
        [1000000000000000, "एक पद्म"]
      ];

      largeCases.forEach(([input, expected]) => {
        it(`should convert ${input} to "${expected}"`, () => {
          const result = digitToNepaliWords(input);
          expect(result).toBe(expected);
        });
      });

      it("should handle mixed large numbers", () => {
        const result = digitToNepaliWords(1234567890);
        expect(result).toBe("एक अरब तेइस करोड पैँतालीस लाख सतसट्ठी हजार आठ सय नब्बे");
      });
    });
  });

  describe("Combined Features", () => {
    it("should handle English currency with custom decimal suffix", () => {
      const result = digitToNepaliWords(1234567890, {
        lang: "en",
        isCurrency: true,
        currency: "dollars",
        includeDecimal: true,
        decimalSuffix: "cents"
      });
      expect(result).toBe("dollars one arab twenty three crore forty five lakh sixty seven thousand eight hundred ninety cents zero");
    });

    it("should handle Nepali currency with custom decimal suffix", () => {
      const result = digitToNepaliWords(1234567890.50, {
        isCurrency: true,
        includeDecimal: true,
        currency: "रुपैयाँ",
        decimalSuffix: "पैसा"
      });
      expect(result).toBe("रुपैयाँ एक अरब तेइस करोड पैँतालीस लाख सतसट्ठी हजार आठ सय नब्बे पैसा पचास");
    });

    it("should handle English output with custom decimal suffix", () => {
      const result = digitToNepaliWords(1234.56, {
        lang: "en",
        includeDecimal: true,
        decimalSuffix: "point"
      });
      expect(result).toBe("one thousand two hundred thirty four point fifty six");
    });
  });
});
