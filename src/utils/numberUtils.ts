export const digitMap = {
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
} as const;

type EnglishDigit = keyof typeof digitMap;
type NepaliDigit = typeof digitMap[EnglishDigit];

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

export function splitNumber(num: number | string | bigint): {
  integer: bigint;
  decimal?: string;
} {
  try {
    if (typeof num === 'bigint') {
      return { integer: num };
    }

    const str = num.toString();
    const [intPart, decPart] = str.split('.');

    const integer = BigInt(intPart);
    let decimal = decPart;

    if (decimal) {
      // Round to 2 decimal places
      decimal = decimal.slice(0, 2).padEnd(2, '0');
      // Remove leading zeros
      decimal = String(parseInt(decimal));
    }

    return {
      integer,
      decimal
    };
  } catch {
    throw new Error('Invalid number format');
  }
}

export function validateNumber(num: number | string | bigint): boolean {
  if (typeof num === 'bigint') {
    return num >= 0n;
  }

  const str = num.toString();
  return /^[0-9]+(\.[0-9]+)?$/.test(str) && !str.startsWith('-');
}
