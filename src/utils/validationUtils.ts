import { ConverterConfig, CustomUnits, CustomScales, Language } from '../types/converterTypes';
import { SCALE_VALUES } from '../mappings/scaleMappings';

/**
 * Largest number the scale table can name: 99 of the top scale, plus every
 * smaller scale — currently 10^41 - 1 (उनान्सय अदन्त सिंघर ...).
 *
 * Derived from the scale table so the two cannot drift apart when a new scale
 * is added.
 */
export const MAX_SUPPORTED_INTEGER = SCALE_VALUES.ADANTA_SINGHAR * 100n - 1n;

const MAX_SUPPORTED_DESCRIPTION = `10^${MAX_SUPPORTED_INTEGER.toString().length} - 1`;

/**
 * Expands JavaScript exponential notation into a plain decimal string.
 *
 * `String(1e21)` yields `"1e+21"`, which `BigInt()` rejects. Numbers with a
 * magnitude at or above 1e21 (and below 1e-6) always stringify this way, so
 * every numeric input is normalized before it is parsed.
 *
 * Non-exponential input is returned trimmed and otherwise untouched.
 */
export function toPlainNumericString(value: number | string): string {
  const str = (typeof value === 'number' ? String(value) : value).trim();

  const match = /^([+-]?)(\d+)(?:\.(\d+))?[eE]([+-]?\d+)$/.exec(str);
  if (!match) return str;

  const [, sign, intDigits, fracDigits = '', exponent] = match;
  const digits = intDigits + fracDigits;
  const pointPosition = intDigits.length + parseInt(exponent, 10);

  let expanded: string;
  if (pointPosition <= 0) {
    expanded = `0.${'0'.repeat(-pointPosition)}${digits}`;
  } else if (pointPosition >= digits.length) {
    expanded = digits + '0'.repeat(pointPosition - digits.length);
  } else {
    expanded = `${digits.slice(0, pointPosition)}.${digits.slice(pointPosition)}`;
  }

  return sign === '-' ? `-${expanded}` : expanded;
}

/**
 * Checks if a value is a valid non-negative number, string, or bigint.
 * Handles decimals, special cases, and size validation.
 */
export function isValidNumber(num: number | string | bigint): boolean {
  try {
    if (typeof num === 'bigint') return num >= 0n;
    if (typeof num === 'number') {
      return !isNaN(num) && isFinite(num) && num >= 0;
    }
    if (typeof num !== 'string') return false;

    const str = toPlainNumericString(num);
    if (!str) return false;

    const [intPart, decPart, ...rest] = str.split('.');
    if (rest.length > 0) return false;
    if (!intPart || !/^\d+$/.test(intPart)) return false;
    if (decPart !== undefined && !/^\d+$/.test(decPart)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Throws if the integer part is larger than the scale table can name.
 */
export function assertWithinSupportedRange(integer: bigint): void {
  if (integer > MAX_SUPPORTED_INTEGER) {
    throw new Error(`Input exceeds maximum supported value (${MAX_SUPPORTED_DESCRIPTION})`);
  }
}

/**
 * Splits a number into integer and decimal parts with proper rounding.
 * Decimals are rounded to 2 places; a decimal that rounds up to 1.00 carries
 * into the integer part (e.g. 1.999 -> 2).
 */
export function splitNumber(num: number | string | bigint): {
  integer: bigint;
  decimal?: string;
} {
  if (typeof num === 'bigint') return { integer: num };

  const str = toPlainNumericString(num);
  const [intPart, decPart] = str.split('.');
  const integer = BigInt(intPart);

  // If no decimal part, return only integer
  if (!decPart) return { integer };

  // Pad to 3 decimal places, then take first 3 digits for precision
  const decimalStr = decPart.padEnd(3, '0').slice(0, 3);
  const decimalNum = Number(`0.${decimalStr}`);

  // Round to 2 decimal places
  const rounded = Math.round(decimalNum * 100);

  // Handle edge case: if rounding up to 100, increment the integer
  if (rounded === 100) {
    return { integer: integer + 1n };
  }

  return {
    integer,
    decimal: rounded.toString().padStart(2, '0')
  };
}

/**
 * Validates language mapping structure.
 */
function isValidLanguageMapping(mapping: unknown): mapping is Record<Language, string> {
  if (!mapping || typeof mapping !== 'object') return false;
  const candidate = mapping as Partial<Record<Language, unknown>>;
  return typeof candidate.en === 'string' && typeof candidate.ne === 'string';
}

/**
 * Validates custom units configuration.
 */
function isValidCustomUnits(units: unknown): units is CustomUnits {
  if (!units || typeof units !== 'object') return false;
  return Object.entries(units).every(([key, value]) => {
    const num = Number(key);
    return Number.isInteger(num) && num >= 0 && num <= 99 && isValidLanguageMapping(value);
  });
}

/**
 * Validates custom scales configuration.
 */
function isValidCustomScales(scales: unknown): scales is CustomScales {
  if (!scales || typeof scales !== 'object') return false;
  const validScales = Object.values(SCALE_VALUES).map(Number);
  return Object.entries(scales).every(([key, value]) => {
    const num = Number(key);
    return validScales.includes(num) && isValidLanguageMapping(value);
  });
}

/**
 * Validates the entire custom mappings configuration.
 */
export function validateCustomMappings(config: Required<ConverterConfig>): boolean {
  try {
    if (config.units && !isValidCustomUnits(config.units)) return false;
    if (config.scales && !isValidCustomScales(config.scales)) return false;
    return true;
  } catch {
    return false;
  }
}
