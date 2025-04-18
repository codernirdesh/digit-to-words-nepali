export const digitMap = {
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
} as const;

type EnglishDigit = keyof typeof digitMap;
type NepaliDigit = typeof digitMap[EnglishDigit];

// Reverse mapping for Nepali to English digits
const nepaliToEnglishDigitMap: Record<NepaliDigit, EnglishDigit> = Object.fromEntries(
  Object.entries(digitMap).map(([en, ne]) => [ne, en])
) as Record<NepaliDigit, EnglishDigit>;

/**
 * Converts a string of Nepali unicode digits (०-९) to a JavaScript number.
 * Throws if input is not a valid Nepali digit string or exceeds safe integer.
 */
export const unicodeToEnglishNumber = (numStr: string): number => {
  const DIGIT_REGEX_NEPALI = /^[०-९]+$/;

  if (typeof numStr !== "string" || numStr.length === 0) {
    throw new Error("Input must be a non-empty string");
  }

  if (!DIGIT_REGEX_NEPALI.test(numStr)) {
    throw new Error("Input must contain only Nepali digits (०-९)");
  }

  let englishStr = "";
  for (const char of numStr) {
    const en = nepaliToEnglishDigitMap[char as NepaliDigit];
    if (en === undefined) {
      throw new Error(`Invalid Nepali digit: ${char}`);
    }
    englishStr += en;
  }

  const num = Number(englishStr);

  if (!Number.isSafeInteger(num)) {
    throw new Error("Number exceeds maximum safe integer value");
  }

  return num;
};
