import { digitToNepaliWords } from "../src/converters/nepaliConverter";

describe("Nepali Number to Words Converter", () => {
  describe("Single digits (0-9)", () => {
    const singleDigitCases: [number, string][] = [
      [0, "शून्य"],
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
        expect(result).toBe("रुपैयाँ शून्य");
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
    describe("Currency Decimals", () => {
      it("should pad single digit decimal to 2 digits in currency", () => {
        const result = digitToNepaliWords(1.5, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ एक पैसा पचास");
      });

      it("should handle zero padding in currency", () => {
        const result = digitToNepaliWords(1.05, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ एक पैसा पाँच");
      });

      it("should use custom decimal suffix with padded digits", () => {
        const result = digitToNepaliWords(1.5, {
          isCurrency: true,
          includeDecimal: true,
          currencyDecimalSuffix: "cents",
          currency: "dollars"
        });
        expect(result).toBe("dollars एक cents पचास");
      });

      it("should round decimal places greater than 2 digits", () => {
        const result = digitToNepaliWords(1.567, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ एक पैसा सन्ताउन्न");
      });

      it("should round up decimal .999 to next integer", () => {
        const result = digitToNepaliWords(1.999, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ दुई");
      });

      it("should pad single decimal digit with zero", () => {
        const result = digitToNepaliWords(1.5, {
          isCurrency: true,
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("रुपैयाँ एक पैसा पचास");
      });
    });

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
        expect(result).toBe("एक");
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

      it("should round long decimals to 2 places", () => {
        const result = digitToNepaliWords(1.237, {
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("एक दशमलव चौबिस");
      });

      it("should pad single decimal digit", () => {
        const result = digitToNepaliWords(1.5, {
          includeDecimal: true,
          lang: "ne"
        });
        expect(result).toBe("एक दशमलव पचास");
      });
    });
  });

  describe("Error Handling", () => {
    it("should throw error for negative numbers", () => {
      expect(() => digitToNepaliWords(-123)).toThrow(
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
        "Input must contain only valid digits"
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
        currencyDecimalSuffix: "cents"
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

    describe("Maximum Scale Numbers", () => {
      it("should handle numbers up to Adanta Singhar (10^39)", () => {
        const maxNum = BigInt("9".repeat(39));
        console.log(maxNum);
        const result = digitToNepaliWords(maxNum);
        expect(result).toBe(
          "उनान्सय महासिंघर उनान्सय सिंघर उनान्सय शिशान्त उनान्सय महाअन्त उनान्सय अन्त उनान्सय परार्ध उनान्सय मध उनान्सय जल्द उनान्सय अङ्क उनान्सय उपाध उनान्सय शंख उनान्सय पद्म उनान्सय नील उनान्सय खरब उनान्सय अरब उनान्सय करोड उनान्सय लाख उनान्सय हजार नौ सय उनान्सय"
        );
      });

      it("should handle complex large numbers with mixed scales", () => {
        const largeNum = BigInt("122212133123121222121213112131213121313");
        const result = digitToNepaliWords(largeNum);
        expect(result).toBe(
          "बाह्र महासिंघर बाइस सिंघर बाह्र शिशान्त तेह्र महाअन्त एकत्तिस अन्त तेइस परार्ध बाह्र मध बाह्र जल्द बाइस अङ्क बाह्र उपाध बाह्र शंख तेह्र पद्म एघार नील एक्काइस खरब एकत्तिस अरब एक्काइस करोड एकत्तिस लाख एक्काइस हजार तीन सय तेह्र"
        );
      });

      it("should handle very large numbers with all scales in English", () => {
        const largeNum = BigInt("123456789123456789123456789123456789");
        const result = digitToNepaliWords(largeNum, { lang: "en" });
        expect(result).toBe(
          "one singhar twenty three shishant forty five maha ant sixty seven ant eighty nine paraardha twelve madh thirty four jald fifty six ank seventy eight udpadh ninety one shankha twenty three padma forty five neel sixty seven kharab eighty nine arab twelve crore thirty four lakh fifty six thousand seven hundred eighty nine"
        );
      });

      it("should handle maximum number in English", () => {
        const maxNum = BigInt("9".repeat(39));
        const result = digitToNepaliWords(maxNum, { lang: "en" });
        expect(result).toBe(
          "ninety nine maha singhar ninety nine singhar ninety nine shishant ninety nine maha ant ninety nine ant ninety nine paraardha ninety nine madh ninety nine jald ninety nine ank ninety nine udpadh ninety nine shankha ninety nine padma ninety nine neel ninety nine kharab ninety nine arab ninety nine crore ninety nine lakh ninety nine thousand nine hundred ninety nine"
        );
      });
    });
  });

  describe("Combined Features", () => {
    it("should handle English currency with custom decimal suffix", () => {
      const result = digitToNepaliWords(1234567890.5, {
        lang: "en",
        isCurrency: true,
        currency: "dollars",
        includeDecimal: true,
        currencyDecimalSuffix: "cents"
      });
      expect(result).toBe("dollars one arab twenty three crore forty five lakh sixty seven thousand eight hundred ninety cents fifty");
    });

    it("should handle Nepali currency with custom decimal suffix", () => {
      const result = digitToNepaliWords(1234567890.05, {
        isCurrency: true,
        includeDecimal: true,
        currency: "रुपैयाँ",
        currencyDecimalSuffix: "पैसा"
      });
      expect(result).toBe("रुपैयाँ एक अरब तेइस करोड पैँतालीस लाख सतसट्ठी हजार आठ सय नब्बे पैसा पाँच");
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
