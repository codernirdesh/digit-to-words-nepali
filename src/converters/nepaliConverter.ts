// Map of numbers 0-99 to their English and Nepali word representations
const unitsNepali: Record<number, [string, string]> = {
  0: ["zero", "शून्य"],
  1: ["one", "एक"],
  2: ["two", "दुई"],
  3: ["three", "तीन"],
  4: ["four", "चार"],
  5: ["five", "पाँच"],
  6: ["six", "छ"],
  7: ["seven", "सात"],
  8: ["eight", "आठ"],
  9: ["nine", "नौ"],
  10: ["ten", "दश"],
  11: ["eleven", "एघार"],
  12: ["twelve", "बाह्र"],
  13: ["thirteen", "तेह्र"],
  14: ["fourteen", "चौध"],
  15: ["fifteen", "पन्ध्र"],
  16: ["sixteen", "सोह्र"],
  17: ["seventeen", "सत्र"],
  18: ["eighteen", "अठार"],
  19: ["nineteen", "उन्नाइस"],
  20: ["twenty", "बीस"],
  21: ["twenty one", "एक्काइस"],
  22: ["twenty two", "बाइस"],
  23: ["twenty three", "तेइस"],
  24: ["twenty four", "चौबिस"],
  25: ["twenty five", "पच्चिस"],
  26: ["twenty six", "छब्बिस"],
  27: ["twenty seven", "सत्ताइस"],
  28: ["twenty eight", "अट्ठाइस"],
  29: ["twenty nine", "उनन्तिस"],
  30: ["thirty", "तीस"],
  31: ["thirty one", "एकत्तिस"],
  32: ["thirty two", "बत्तिस"],
  33: ["thirty three", "तेत्तिस"],
  34: ["thirty four", "चौँतिस"],
  35: ["thirty five", "पैँतिस"],
  36: ["thirty six", "छत्तिस"],
  37: ["thirty seven", "सैँतिस"],
  38: ["thirty eight", "अठतिस"],
  39: ["thirty nine", "उनन्चालीस"],
  40: ["forty", "चालीस"],
  41: ["forty one", "एकचालीस"],
  42: ["forty two", "बयालिस"],
  43: ["forty three", "त्रिचालीस"],
  44: ["forty four", "चवालीस"],
  45: ["forty five", "पैँतालीस"],
  46: ["forty six", "छयालीस"],
  47: ["forty seven", "सतचालीस"],
  48: ["forty eight", "अठचालीस"],
  49: ["forty nine", "उनन्चास"],
  50: ["fifty", "पचास"],
  51: ["fifty one", "एकाउन्न"],
  52: ["fifty two", "बाउन्न"],
  53: ["fifty three", "त्रिपन्न"],
  54: ["fifty four", "चवन्न"],
  55: ["fifty five", "पचपन्न"],
  56: ["fifty six", "छपन्न"],
  57: ["fifty seven", "सन्ताउन्न"],
  58: ["fifty eight", "अन्ठाउन्न"],
  59: ["fifty nine", "उनन्साठी"],
  60: ["sixty", "साठी"],
  61: ["sixty one", "एकसट्ठी"],
  62: ["sixty two", "बयसट्ठी"],
  63: ["sixty three", "त्रिसट्ठी"],
  64: ["sixty four", "चौंसट्ठी"],
  65: ["sixty five", "पैंसट्ठी"],
  66: ["sixty six", "छयसट्ठी"],
  67: ["sixty seven", "सतसट्ठी"],
  68: ["sixty eight", "अठसट्ठी"],
  69: ["sixty nine", "उनन्सत्तरी"],
  70: ["seventy", "सत्तरी"],
  71: ["seventy one", "एकहत्तर"],
  72: ["seventy two", "बहत्तर"],
  73: ["seventy three", "त्रिहत्तर"],
  74: ["seventy four", "चौहत्तर"],
  75: ["seventy five", "पचहत्तर"],
  76: ["seventy six", "छयहत्तर"],
  77: ["seventy seven", "सतहत्तर"],
  78: ["seventy eight", "अठहत्तर"],
  79: ["seventy nine", "उनासी"],
  80: ["eighty", "असी"],
  81: ["eighty one", "एकासी"],
  82: ["eighty two", "बयासी"],
  83: ["eighty three", "त्रियासी"],
  84: ["eighty four", "चौरासी"],
  85: ["eighty five", "पचासी"],
  86: ["eighty six", "छयासी"],
  87: ["eighty seven", "सतासी"],
  88: ["eighty eight", "अठासी"],
  89: ["eighty nine", "उनान्नब्बे"],
  90: ["ninety", "नब्बे"],
  91: ["ninety one", "एकान्नब्बे"],
  92: ["ninety two", "बयानब्बे"],
  93: ["ninety three", "त्रियान्नब्बे"],
  94: ["ninety four", "चौरान्नब्बे"],
  95: ["ninety five", "पन्चान्नब्बे"],
  96: ["ninety six", "छयान्नब्बे"],
  97: ["ninety seven", "सन्तान्नब्बे"],
  98: ["ninety eight", "अन्ठान्नब्बे"],
  99: ["ninety nine", "उनान्सय"],
};

// Scale multipliers
const SCALES = {
  HUNDRED: 100,
  THOUSAND: 1_000,
  LAKH: 100_000,
  CRORE: 10_000_000,
  ARAB: 1_000_000_000,
  KHARAB: 100_000_000_000,
  NEEL: 10_000_000_000_000,
  PADMA: 1_000_000_000_000_000,
  SHANKHA: 1_000_000_000_000_000_000,
  UDPADH: 1e19,
  ANK: 1e21,
  JALD: 1e23,
  MADH: 1e25,
  PARAARDHA: 1e27,
  ANT: 1e29,
  MAHA_ANT: 1e31,
  SHISHANT: 1e33,
  SINGHAR: 1e35,
  MAHA_SINGHAR: 1e37,
  ADANTA_SINGHAR: 1e39,
} as const;

// Scale names in English and Nepali
const scalesNepali: Record<number, [string, string]> = {
  0: ["", ""],
  [SCALES.HUNDRED]: ["hundred", "सय"],
  [SCALES.THOUSAND]: ["thousand", "हजार"],
  [SCALES.LAKH]: ["lakh", "लाख"],
  [SCALES.CRORE]: ["crore", "करोड"],
  [SCALES.ARAB]: ["arab", "अरब"],
  [SCALES.KHARAB]: ["kharab", "खरब"],
  [SCALES.NEEL]: ["neel", "नील"],
  [SCALES.PADMA]: ["padma", "पद्म"],
  [SCALES.SHANKHA]: ["shankha", "शंख"],
  [SCALES.UDPADH]: ["udpadh", "उपाध"],
  [SCALES.ANK]: ["ank", "अंक"],
  [SCALES.JALD]: ["jald", "जल्द"],
  [SCALES.MADH]: ["madh", "मध"],
  [SCALES.PARAARDHA]: ["paraardha", "परार्ध"],
  [SCALES.ANT]: ["ant", "अन्त"],
  [SCALES.MAHA_ANT]: ["maha ant", "महाअन्त"],
  [SCALES.SHISHANT]: ["shishant", "शिशान्त"],
  [SCALES.SINGHAR]: ["singhar", "सिंघर"],
  [SCALES.MAHA_SINGHAR]: ["maha singhar", "महासिंघर"],
  [SCALES.ADANTA_SINGHAR]: ["adanta singhar", "अदन्त सिंघर"],
};

// Define scale order first
const scaleOrder = [
  SCALES.ADANTA_SINGHAR,
  SCALES.MAHA_SINGHAR,
  SCALES.SINGHAR,
  SCALES.SHISHANT,
  SCALES.MAHA_ANT,
  SCALES.ANT,
  SCALES.PARAARDHA,
  SCALES.MADH,
  SCALES.JALD,
  SCALES.ANK,
  SCALES.UDPADH,
  SCALES.SHANKHA,
  SCALES.PADMA,
  SCALES.NEEL,
  SCALES.KHARAB,
  SCALES.ARAB,
  SCALES.CRORE,
  SCALES.LAKH,
  SCALES.THOUSAND,
];

// Then use it in cache initialization
const SCALE_WORDS: Record<number, [string, string]> = {};
for (const scale of scaleOrder) {
  SCALE_WORDS[scale] = scalesNepali[scale];
}

const DIGIT_REGEX = /^[0-9]+$/;

// Digit mapping between English and Nepali
const digitMap = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
} as const;

type EnglishDigit = keyof typeof digitMap;
type NepaliDigit = (typeof digitMap)[EnglishDigit];

const englishToNepaliDigitMap = digitMap;
const nepaliToEnglishDigitMap = Object.fromEntries(
  Object.entries(digitMap).map(([en, ne]) => [ne, en])
) as Record<NepaliDigit, EnglishDigit>;

/**
 * Converts a Nepali number string to an English number string and then to a number value.
 * @param numStr The string to convert. Must be a non-empty string containing only Nepali digits (०-९).
 * @returns The number value of the input string.
 * @throws If the input string is empty, contains non-Nepali digits, or exceeds the maximum safe integer value.
 */
export const unicodeToEnglishNumber = (numStr: string): number => {
  const DIGIT_REGEX_NEPALI = /^[०-९]+$/;

  if (!numStr || typeof numStr !== "string") {
    throw new Error("Input must be a non-empty string");
  }

  if (!DIGIT_REGEX_NEPALI.test(numStr)) {
    throw new Error("Input must contain only Nepali digits (०-९)");
  }

  const englishStr = numStr
    .split("")
    .map((char) => nepaliToEnglishDigitMap[char as NepaliDigit])
    .join("");

  const num = Number(englishStr);

  if (!Number.isSafeInteger(num)) {
    throw new Error("Number exceeds maximum safe integer value");
  }

  return num;
};

// Types and interfaces
interface LanguageConfig {
  currency: string;
  decimalSuffix: string;
  currencyDecimalSuffix: string;
}

interface NumberScale {
  value: bigint;
  names: Record<Language, string>;
}

type Language = "en" | "ne";

interface WordMapping {
  en: string;
  ne: string;
}

interface ConverterConfig {
  isCurrency?: boolean;
  currency?: string;
  includeDecimal?: boolean;
  decimalSuffix?: string;
  currencyDecimalSuffix?: string;
  lang?: Language;
}

// Language configurations
const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  ne: {
    currency: "रुपैयाँ",
    decimalSuffix: "दशमलव",
    currencyDecimalSuffix: "पैसा",
  },
  en: {
    currency: "Rupees",
    decimalSuffix: "point",
    currencyDecimalSuffix: "paisa",
  },
} as const;

// Number scales configuration
const NUMBER_SCALES: NumberScale[] = [
  { value: 10n ** 39n, names: { en: "adanta singhar", ne: "अदन्त सिंघर" } },
  { value: 10n ** 37n, names: { en: "maha singhar", ne: "महासिंघर" } },
  { value: 10n ** 35n, names: { en: "singhar", ne: "सिंघर" } },
  { value: 10n ** 33n, names: { en: "shishant", ne: "शिशान्त" } },
  { value: 10n ** 31n, names: { en: "maha ant", ne: "महाअन्त" } },
  { value: 10n ** 29n, names: { en: "ant", ne: "अन्त" } },
  { value: 10n ** 27n, names: { en: "paraardha", ne: "परार्ध" } },
  { value: 10n ** 25n, names: { en: "madh", ne: "मध" } },
  { value: 10n ** 23n, names: { en: "jald", ne: "जल्द" } },
  { value: 10n ** 21n, names: { en: "ank", ne: "अंक" } },
  { value: 10n ** 19n, names: { en: "udpadh", ne: "उपाध" } },
  { value: 10n ** 17n, names: { en: "shankha", ne: "शंख" } },
  { value: 10n ** 15n, names: { en: "padma", ne: "पद्म" } },
  { value: 10n ** 13n, names: { en: "neel", ne: "नील" } },
  { value: 10n ** 11n, names: { en: "kharab", ne: "खरब" } },
  { value: 10n ** 9n, names: { en: "arab", ne: "अरब" } },
  { value: 10n ** 7n, names: { en: "crore", ne: "करोड" } },
  { value: 10n ** 5n, names: { en: "lakh", ne: "लाख" } },
  { value: 10n ** 3n, names: { en: "thousand", ne: "हजार" } },
  { value: 10n ** 2n, names: { en: "hundred", ne: "सय" } },
] as const;

// Complete the number word mappings (0-99) from the existing unitsNepali
const NUMBER_WORDS = new Map<number, WordMapping>(
  Object.entries(unitsNepali).map(([num, [en, ne]]) => [
    parseInt(num),
    { en, ne },
  ])
);

// Utility class for number conversion
class NumberConverter {
  private static instance: NumberConverter;
  private readonly wordCache: Map<number, WordMapping>;

  private constructor() {
    this.wordCache = NUMBER_WORDS;
  }

  static getInstance(): NumberConverter {
    if (!NumberConverter.instance) {
      NumberConverter.instance = new NumberConverter();
    }
    return NumberConverter.instance;
  }

  /**
   * Converts a number to words in the given language, with optional
   * currency and decimal suffixes.
   *
   * Throws an error if the input number is invalid (NaN, Infinity, negative, or non-numeric).
   *
   * @param num The number to convert.
   * @param config The configuration options for the conversion.
   * @returns The words representing the number.
   */
  convertToWords(
    num: number | string | bigint,
    config: Required<ConverterConfig>
  ): string {
    try {
      // Validate input
      if (!this.isValidNumber(num)) {
        throw new Error("Input must contain only valid digits");
      }

      // Split into integer and decimal parts
      const { integer, decimal } = this.splitNumber(num);

      // Convert integer part
      const words = this.convertIntegerPart(integer, config);

      // Append decimal part if needed
      this.appendDecimalPart(words, decimal, config);

      // Format and return result
      return this.formatResult(words, config);
    } catch (error) {
      console.error("Error converting number to words:", error);
      throw error;
    }
  }

  private isValidNumber(num: number | string | bigint): boolean {
    try {
      // Handle BigInt directly
      if (typeof num === 'bigint') {
        return num >= 0n;
      }

      // For string/number inputs
      const str = num.toString();

      // Check for negative numbers
      if (str.startsWith('-')) {
        return false;
      }

      // Allow decimal point and digits only
      if (!/^\d*\.?\d+$/.test(str)) {
        return false;
      }

      // Parse the number to check if it's valid
      const [intPart, decPart] = str.split('.');

      // Validate integer part
      try {
        BigInt(intPart);
      } catch {
        return false;
      }

      // Validate decimal part if exists
      if (decPart && !/^\d+$/.test(decPart)) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  private splitNumber(num: number | string | bigint): {
    integer: bigint;
    decimal?: string;
  } {
    try {
      // Handle BigInt directly
      if (typeof num === 'bigint') {
        return {
          integer: num,
          decimal: undefined
        };
      }

      // Convert the input to string for processing
      const str = num.toString();
      const [intPart, decPart] = str.split('.');

      try {
        let integer = BigInt(intPart);

        let processedDecimal: string | undefined = decPart;
        if (processedDecimal) {
          // Convert to number for rounding
          const decimalNum = Number(`0.${processedDecimal}`);
          // Round to 2 decimal places
          const roundedDecimal = Math.round(decimalNum * 100);

          if (roundedDecimal === 100) {
            // Handle case where rounding results in 1.00
            return {
              integer: integer + 1n,
              decimal: undefined // Don't include decimal part when rounding up
            };
          }

          // Convert back to string, pad with leading zero if needed
          processedDecimal = roundedDecimal.toString().padStart(2, '0');
        }

        return {
          integer,
          decimal: processedDecimal,
        };
      } catch {
        throw new Error("Input must contain only valid digits");
      }
    } catch {
      throw new Error("Input must contain only valid digits");
    }
  }

  private convertIntegerPart(
    num: bigint,
    config: Required<ConverterConfig>
  ): string[] {
    if (num === 0n) {
      return [this.getWordMapping(0, config.lang)];
    }

    const words: string[] = [];
    let remaining = num;

    // Process each scale from largest to smallest
    for (const scale of NUMBER_SCALES) {
      if (remaining < scale.value) continue;

      const quotient = remaining / scale.value;
      remaining = remaining % scale.value;

      if (quotient > 0n) {
        // Convert quotient recursively for proper word formation
        const quotientWords = this.convertToWords(quotient.toString(), {
          ...config,
          isCurrency: false,
          includeDecimal: false,
        });
        words.push(`${quotientWords} ${scale.names[config.lang]}`);
      }
    }

    // Handle remaining digits
    if (remaining > 0n) {
      words.push(this.getWordMapping(Number(remaining), config.lang));
    }

    return words;
  }

  private appendDecimalPart(
    words: string[],
    decimal: string | undefined,
    config: Required<ConverterConfig>
  ): void {
    // Don't append decimal part if:
    // 1. Decimal handling is disabled
    // 2. No decimal part exists
    // 3. Decimal was rounded up to next integer
    if (!config.includeDecimal || !decimal) return;

    // Add decimal suffix
    words.push(
      config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix
    );

    // Convert decimal part
    const decimalNum = parseInt(decimal);
    words.push(this.getWordMapping(decimalNum, config.lang));
  }

  private formatResult(
    words: string[],
    config: Required<ConverterConfig>
  ): string {
    let result = words.join(" ").trim();
    if (config.isCurrency) {
      result = `${config.currency} ${result}`;
    }
    return result.trim();
  }

  private getWordMapping(num: number, lang: Language): string {
    const mapping = this.wordCache.get(num);
    if (!mapping) {
      throw new Error(`No word mapping found for number: ${num}`);
    }
    return mapping[lang];
  }
}

// Update the default config
const DEFAULT_CONFIG: Required<ConverterConfig> = {
  lang: "ne",
  isCurrency: false,
  currency: "रुपैयाँ",
  currencyDecimalSuffix: "पैसा",
  includeDecimal: true, // Changed from false to true
  decimalSuffix: "दशमलव"
};

/**
 * Converts numbers to their word representation in Nepali or English.
 * Supports numbers up to Adanta Singhar (10^39) with extensive formatting options.
 * 
 * @param num - The number to convert. Can be:
 *   - number: Regular numbers (e.g., 1234, 1.23)
 *   - string: String numbers (e.g., "1234", "1.23")
 *   - bigint: Large numbers (e.g., 123456789012345678901234567890n)
 * 
 * @param config - Optional configuration object
 * @param config.lang - Output language ("ne" | "en"), defaults to "ne"
 * @param config.isCurrency - Format as currency, defaults to false
 * @param config.includeDecimal - Include decimal part, defaults to true
 * @param config.currency - Custom currency text, defaults to "रुपैयाँ"
 * @param config.decimalSuffix - Custom decimal suffix, defaults to "दशमलव"
 * @param config.currencyDecimalSuffix - Custom currency decimal suffix, defaults to "पैसा"
 * 
 * @returns The number in words
 * @throws Error if input is invalid (negative, NaN, Infinity, or non-numeric)
 * 
 * @example
 * // Basic usage
 * digitToNepaliWords(1234)
 * // => "एक हजार दुई सय चौँतिस"
 * 
 * // English output
 * digitToNepaliWords(1234, { lang: "en" })
 * // => "one thousand two hundred thirty four"
 * 
 * // Currency formatting
 * digitToNepaliWords(1234.50, { isCurrency: true })
 * // => "रुपैयाँ एक हजार दुई सय चौँतिस पैसा पचास"
 * 
 * // Custom currency
 * digitToNepaliWords(1234.05, {
 *   isCurrency: true,
 *   currency: "डलर",
 *   currencyDecimalSuffix: "सेन्ट"
 * })
 * // => "डलर एक हजार दुई सय चौँतिस सेन्ट पाँच"
 * 
 * // Large numbers using BigInt
 * digitToNepaliWords(BigInt("123456789012345"))
 * // => "एक करोड तेइस लाख पैँतालीस हजार छ सय सतासी..."
 * 
 * // Decimal handling (enabled by default)
 * digitToNepaliWords(1.23)
 * // => "एक दशमलव तेइस"
 * 
 * // Disable decimal handling
 * digitToNepaliWords(1.23, { includeDecimal: false })
 * // => "एक"
 * 
 * // Custom decimal suffix
 * digitToNepaliWords(1.23, { decimalSuffix: "point" })
 * // => "एक point तेइस"
 */
export function digitToNepaliWords(
  num: number | string | bigint,
  config: Partial<ConverterConfig> = {}
): string {
  // Merge with defaults, keeping includeDecimal true by default
  const fullConfig: Required<ConverterConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
    includeDecimal: config.includeDecimal ?? true // Explicitly set default to true
  };

  const converter = NumberConverter.getInstance();
  return converter.convertToWords(num, fullConfig);
}
