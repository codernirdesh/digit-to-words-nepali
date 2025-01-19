// Map of numbers 0-99 to their English and Nepali word representations
const unitsNepali: Record<number, [string, string]> = {
  0: ["zero", "सुन्ना"],
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
  ADANTA_SINGHAR: 1e39
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
  [SCALES.ADANTA_SINGHAR]: ["adanta singhar", "अदन्त सिंघर"]
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
  SCALES.THOUSAND
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

interface NepaliConverterConfig {
  isCurrency?: boolean;
  currency?: string;
  includeDecimal?: boolean;
  decimalSuffix?: string;
  lang?: "en" | "ne";
}

const defaultConfig: Required<NepaliConverterConfig> = {
  isCurrency: false,
  includeDecimal: false,
  currency: "रुपैयाँ",
  decimalSuffix: "दशमलव",
  lang: "ne",
};

const validateInput = (integerPart: string, decimalPart?: string): void => {
  if (decimalPart && !DIGIT_REGEX.test(decimalPart)) {
    throw new Error("Decimal part must contain only valid digits");
  }

  if (!DIGIT_REGEX.test(integerPart)) {
    throw new Error("Input must contain only valid digits");
  }
};

// Pre-compute number to word mappings
const WORD_CACHE: Record<number, [string, string]> = {};
for (let i = 0; i <= 99; i++) {
  WORD_CACHE[i] = unitsNepali[i];
}

// Optimize handleScale for performance
const handleScale = (
  num: number,
  scale: number,
  scaleName: string,
  words: string[],
  lang: "en" | "ne"
): number => {
  if (num >= scale) {
    const value = Math.floor(num / scale);
    const remainder = num % scale;
    words.push(
      `${digitToNepaliWords(value, { lang })} ${
        lang === "en" ? scaleName : SCALE_WORDS[scale][1]
      }`
    );
    return remainder;
  }
  return num;
};

// Optimize digitToNepaliWords
export const digitToNepaliWords = (
  num: number,
  config: NepaliConverterConfig = {}
): string => {
  if (typeof num !== "number") {
    throw new Error("Input must be a number");
  }

  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  const [integerPart, decimalPart] = num.toString().split(".");
  validateInput(integerPart, decimalPart);

  const words: string[] = [];
  let integerNum = parseInt(integerPart);

  // Fast path for small numbers
  if (integerNum <= 99) {
    const cached = WORD_CACHE[integerNum];
    words.push(mergedConfig.lang === "en" ? cached[0] : cached[1]);
  } else {
    let remaining = integerNum;

    // Process scales in chunks
    for (const scale of scaleOrder) {
      if (remaining < scale) continue;
      remaining = handleScale(
        remaining,
        scale,
        SCALE_WORDS[scale][0],
        words,
        mergedConfig.lang
      );
    }

    // Handle hundreds
    if (remaining >= SCALES.HUNDRED) {
      const hundreds = Math.floor(remaining / SCALES.HUNDRED);
      remaining = remaining % SCALES.HUNDRED;
      const hundredWord = mergedConfig.lang === "en" ? "hundred" : "सय";
      
      // Use cached values for hundreds
      const hundredStr = hundreds === 1 
        ? mergedConfig.lang === "en" ? "one" : "एक"
        : digitToNepaliWords(hundreds, { lang: mergedConfig.lang });
      
      words.push(`${hundredStr} ${hundredWord}`);
    }

    // Use cached values for remaining digits
    if (remaining > 0) {
      const cached = WORD_CACHE[remaining];
      words.push(mergedConfig.lang === "en" ? cached[0] : cached[1]);
    }
  }

  handleDecimal(decimalPart, mergedConfig, words);

  // Fast string concatenation
  let result = words.join(" ");
  if (mergedConfig.isCurrency && mergedConfig.currency) {
    result = mergedConfig.currency + " " + result;
  }

  return result;
};

const handleDecimal = (
  decimalPart: string | undefined,
  config: Required<NepaliConverterConfig>,
  words: string[]
): void => {
  if (!config.includeDecimal) {
    return;
  }

  const suffix = config.decimalSuffix || defaultConfig.decimalSuffix;
  words.push(suffix);

  if (!decimalPart) {
    words.push(digitToNepaliWords(0, { lang: config.lang }));
    return;
  }

  const normalizedDecimal = decimalPart.padEnd(2, "0").slice(0, 2);
  words.push(
    digitToNepaliWords(parseInt(normalizedDecimal), {
      lang: config.lang,
    })
  );
};

console.log(digitToNepaliWords(1.5, { lang: "en", includeDecimal: true }));
console.log(digitToNepaliWords(12764534.66, { lang: "ne", isCurrency: true, includeDecimal: true, decimalSuffix: "पैसा" }));

