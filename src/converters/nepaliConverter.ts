import { BaseConverter } from './baseConverter';
import { ConverterConfig, ConversionResult } from '../types/converterTypes';
import { isValidNumber, splitNumber } from '../utils/validationUtils';
import { nepaliScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';
import { digitToEnglishWords } from './englishConverter';

export class NepaliConverter extends BaseConverter {
  constructor() {
    super();
    this.wordCache = createNumberWordMap();
    this.scales = nepaliScaleMappings;
  }

  convert(
    num: number | string | bigint,
    config: Required<ConverterConfig>
  ): ConversionResult {
    this.setCustomMappings(config);

    // Initial validation for type and basic format
    if (!isValidNumber(num)) {
      throw new Error('Input must contain only valid digits');
    }

    // Process and split the number
    const { integer, decimal } = splitNumber(num);

    // Enforce maximum supported value (10^39 - 1) and maximum length (39 digits)
    const MAX_SUPPORTED = BigInt("9".repeat(39));
    const intStr = integer.toString().replace(/^0+/, '') || '0'; // Handle leading zeros for length check
    if (
      integer > MAX_SUPPORTED ||
      intStr.length > 39
    ) {
      throw new Error('Input exceeds maximum supported value (10^39 - 1)');
    }

    const words: string[] = [];
    const isZeroOrFraction = (typeof num === 'bigint' ? num === 0n : parseFloat(num.toString()) < 1 && parseFloat(num.toString()) > -1);

    // Convert integer part
    if (integer === 0n) {
      // Add "zero" if the original number was effectively zero before the decimal,
      // or if there's no decimal part.
      if (isZeroOrFraction || !decimal) {
         // Only add zero if the decimal part isn't going to represent the only value (e.g., 0.01)
         // unless the decimal itself is zero.
         if (!decimal || parseInt(decimal) === 0) {
            words.push(this.getWordMapping(0, config.lang));
         }
      }
    } else {
      this.processLargeNumber(integer, words, config);
    }

    // Handle decimal part
    if (config.includeDecimal && decimal) {
      const decimalNum = parseInt(decimal);
      // Only add decimal suffix and value if the decimal part is non-zero
      if (decimalNum !== 0) {
        // If the integer part was zero, add it now before the decimal.
        if (integer === 0n && words.length === 0) {
           words.push(this.getWordMapping(0, config.lang));
        }
        words.push(config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix);
        words.push(this.getWordMapping(decimalNum, config.lang));
      } else if (integer === 0n && words.length === 0) {
        // If integer was 0 and decimal rounded to 0, ensure "zero" is output
        words.push(this.getWordMapping(0, config.lang));
      }
    }

    // Add currency prefix if needed and if currency string is not empty
    if (config.isCurrency && config.currency) {
       // Always add currency prefix if isCurrency is true, unless the result is empty (which shouldn't happen now)
       if (words.length > 0) {
          words.unshift(config.currency);
       } else {
         // If somehow words is empty, output "Currency Zero"
         words.push(config.currency, this.getWordMapping(0, config.lang));
       }
    }

    // Final check: if words array is empty (e.g., input was 0.000), add zero.
    // This might be redundant now but serves as a safeguard.
    if (words.length === 0) {
       words.push(this.getWordMapping(0, config.lang));
    }

    return {
      words,
      meta: {
        originalNumber: num.toString(),
        language: config.lang,
        isCurrency: config.isCurrency
      }
    };
  }
}

export const digitToNepaliWords = (
  num: number | string | bigint,
  config: Partial<ConverterConfig> = {}
): string => {
  // If lang is 'en', delegate to EnglishConverter for API consistency
  if (config.lang === 'en') {
    return digitToEnglishWords(num, config);
  }

  const converter = new NepaliConverter();
  // Set default language-specific config before merging user config
  const langDefaults = {
    currency: 'रुपैयाँ',
    decimalSuffix: 'दशमलव',
    currencyDecimalSuffix: 'पैसा',
  };

  const defaultConfig: Required<ConverterConfig> = {
    lang: 'ne',
    isCurrency: false,
    includeDecimal: true,
    units: {},
    scales: {},
    ...langDefaults, // Apply language defaults
    ...config // User config overrides defaults
  };

  const result = converter.convert(num, defaultConfig);
  // Filter out empty strings that might result from empty currency/decimal suffixes
  return result.words.filter(word => word !== '').join(' ').trim();
};
