import { BaseConverter } from './baseConverter';
import { ConverterConfig, ConversionResult } from '../types/converterTypes';
import { isValidNumber, splitNumber } from '../utils/validationUtils';
import { englishScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';
import { conversionCache } from '../utils/cacheUtils';
import { ConverterFactory } from '../utils/converterFactory';

/**
 * EnglishConverter
 * Converts numbers to English words with support for currency, decimals, and custom mappings.
 * Optimized for readability, maintainability, and performance.
 */
export class EnglishConverter extends BaseConverter {
  constructor() {
    super();
    this.wordCache = createNumberWordMap();
    this.scales = englishScaleMappings;
  }

  /**
   * Convert decimal digits individually to English words.
   * @param decimal - The decimal string (e.g., "33")
   * @param config - Conversion configuration
   * @returns Array of individual digit words
   */
  private convertDecimalDigitsIndividually(decimal: string, config: Required<ConverterConfig>): string[] {
    const digits = decimal.split('');
    const words: string[] = [];
    
    for (const digit of digits) {
      const digitNum = parseInt(digit);
      words.push(this.getWordMapping(digitNum, 'en'));
    }
    
    return words;
  }

  /**
   * Convert a number to English words.
   * @param num - The number to convert
   * @param config - Conversion configuration (all fields required)
   */
  convert(
    num: number | string | bigint,
    config: Required<ConverterConfig>
  ): ConversionResult {
    this.setCustomMappings(config);

    // Validate input
    if (!isValidNumber(num)) {
      throw new Error('Input must contain only valid digits');
    }

    // Use cache if no custom mappings
    const hasCustomMappings = Object.keys(config.units).length > 0 || Object.keys(config.scales).length > 0;
    if (!hasCustomMappings) {
      const cacheKey = {
        value: num.toString(),
        lang: config.lang,
        isCurrency: config.isCurrency,
        includeDecimal: config.includeDecimal,
        individualDecimalDigits: config.individualDecimalDigits,
        currency: config.currency,
        decimalSuffix: config.decimalSuffix,
        currencyDecimalSuffix: config.currencyDecimalSuffix
      };
      const cachedResult = conversionCache.get(cacheKey);
      if (cachedResult) return cachedResult;
    }

    // Split number into integer and decimal parts
    const { integer, decimal } = splitNumber(num);
    const words: string[] = [];

    // Integer part conversion
    if (integer === 0n) {
      words.push(this.getWordMapping(0, 'en'));
    } else {
      this.processLargeNumber(integer, words, config);
    }

    // Decimal part conversion
    if (config.includeDecimal && decimal) {
      words.push(config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix);
      const decimalNum = parseInt(decimal);
      if (decimalNum === 0) {
        words.push(this.getWordMapping(0, 'en'));
      } else {
        // Use individual digits for non-currency or when explicitly configured
        if (config.individualDecimalDigits) {
          const individualDigits = this.convertDecimalDigitsIndividually(decimal, config);
          words.push(...individualDigits);
        } else {
          words.push(this.getWordMapping(decimalNum, 'en'));
        }
      }
    }

    // Add currency prefix if needed
    if (config.isCurrency) {
      words.unshift(config.currency);
    }

    const result: ConversionResult = {
      words,
      meta: {
        originalNumber: num.toString(),
        language: 'en',
        isCurrency: config.isCurrency
      }
    };

    // Store in cache if no custom mappings
    if (!hasCustomMappings) {
      const cacheKey = {
        value: num.toString(),
        lang: config.lang,
        isCurrency: config.isCurrency,
        includeDecimal: config.includeDecimal,
        individualDecimalDigits: config.individualDecimalDigits,
        currency: config.currency,
        decimalSuffix: config.decimalSuffix,
        currencyDecimalSuffix: config.currencyDecimalSuffix
      };
      conversionCache.set(cacheKey, result);
    }
    
    return result;
  }

  private processNumber(num: bigint, words: string[], config: Required<ConverterConfig>): void {
    for (const scale of this.scales) {
      if (num >= scale.value) {
        const quotient = num / scale.value;
        num = num % scale.value;

        if (quotient > 0n) {
          this.processNumber(quotient, words, config);
          words.push(this.getScaleName(scale.value, 'en'));
        }
      }
    }

    if (num > 0n && num <= 99n) {
      words.push(this.getWordMapping(Number(num), 'en'));
    }
  }
}

export const digitToEnglishWords = (
  num: number | string | bigint,
  config: Partial<ConverterConfig> = {}
): string => {
  // Use the singleton pattern via factory
  const converter = ConverterFactory.getInstance('EnglishConverter', () => new EnglishConverter());
  
  // Default English language settings
  const defaultConfig: Required<ConverterConfig> = {
    lang: 'en',
    isCurrency: false,
    includeDecimal: true,
    individualDecimalDigits: false, // Default to combined decimal pronunciation
    currency: 'Dollars',
    decimalSuffix: 'point',
    currencyDecimalSuffix: 'cents',
    units: {},
    scales: {},
    ...config
  };

  // Override individualDecimalDigits if not explicitly set - use combined by default
  if (config.individualDecimalDigits === undefined) {
    defaultConfig.individualDecimalDigits = false; // Always default to combined
  }
  
  const result = converter.convert(num, defaultConfig);
  return result.words.filter((word: string) => word !== '').join(' ').trim();
};
