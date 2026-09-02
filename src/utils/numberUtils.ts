/**
 * Maps English digits to Nepali unicode digits.
 */
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

const NEPALI_DIGITS_ONLY = /^[०-९]+$/;
const ENGLISH_DIGITS_ONLY = /^\d+$/;

/**
 * Converts a string of Nepali unicode digits (०-९) to a JavaScript number.
 * Throws if input is not a valid Nepali digit string or exceeds safe integer.
 *
 * For values beyond `Number.MAX_SAFE_INTEGER`, use
 * {@link unicodeToEnglishDigits} and pass the resulting string to a converter.
 *
 * @param numStr Nepali digit string
 */
export const unicodeToEnglishNumber = (numStr: string): number => {
  const num = Number(unicodeToEnglishDigits(numStr));
  if (!Number.isSafeInteger(num)) {
    throw new Error('Number exceeds maximum safe integer value');
  }
  return num;
};

/**
 * Converts a string of Nepali unicode digits (०-९) to the equivalent string of
 * ASCII digits, with no size limit.
 *
 * @param numStr Nepali digit string
 */
export const unicodeToEnglishDigits = (numStr: string): string => {
  if (typeof numStr !== 'string' || numStr.length === 0) {
    throw new Error('Input must be a non-empty string');
  }
  if (!NEPALI_DIGITS_ONLY.test(numStr)) {
    throw new Error('Input must contain only Nepali digits (०-९)');
  }

  let englishStr = '';
  for (const char of numStr) {
    englishStr += nepaliToEnglishDigitMap[char as NepaliDigit];
  }
  return englishStr;
};

/**
 * Converts a non-negative integer (or its string form) to Nepali unicode digits.
 *
 * @example englishToUnicodeNumber(2081) // "२०८१"
 */
export const englishToUnicodeNumber = (num: number | string | bigint): string => {
  const str = typeof num === 'string' ? num.trim() : num.toString();
  if (!ENGLISH_DIGITS_ONLY.test(str)) {
    throw new Error('Input must contain only digits (0-9)');
  }

  let nepaliStr = '';
  for (const char of str) {
    nepaliStr += digitMap[char as EnglishDigit];
  }
  return nepaliStr;
};
