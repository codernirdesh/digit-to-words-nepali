import { ConverterConfig, Language, ConversionResult, CustomUnits, CustomScales } from '../types/converterTypes';
import { WordMapping, NumberScale } from '../types/mappingTypes';
import {
  assertWithinSupportedRange,
  isValidNumber,
  splitNumber,
  validateCustomMappings
} from '../utils/validationUtils';
import { CacheKey, conversionCache } from '../utils/cacheUtils';

/**
 * BaseConverter
 * Shared number-to-words conversion logic. Subclasses supply the word map and
 * the scale table; the conversion algorithm itself is identical for every
 * language, so it lives here.
 */
export abstract class BaseConverter {
  protected wordCache: Map<number, WordMapping>;
  protected scales: NumberScale[];
  protected customUnits: CustomUnits;
  protected customScales: CustomScales;

  constructor() {
    this.wordCache = new Map();
    this.scales = [];
    this.customUnits = {};
    this.customScales = {};
  }

  /**
   * Convert a number to words in the language given by `config.lang`.
   */
  convert(
    num: number | string | bigint,
    config: Required<ConverterConfig>
  ): ConversionResult {
    this.setCustomMappings(config);

    if (!isValidNumber(num)) {
      throw new Error('Input must contain only valid digits');
    }

    const { integer, decimal } = splitNumber(num);
    assertWithinSupportedRange(integer);

    // Custom mappings are not part of the cache key, so results produced with
    // them are neither read from nor written to the shared cache.
    const cacheKey = this.hasCustomMappings(config) ? undefined : this.buildCacheKey(num, config);
    if (cacheKey) {
      const cached = conversionCache.get(cacheKey);
      if (cached) return cached;
    }

    const words: string[] = [];

    if (integer === 0n) {
      words.push(this.getWordMapping(0, config.lang));
    } else {
      this.processLargeNumber(integer, words, config);
    }

    // A decimal part that rounds to 00 is omitted entirely.
    if (config.includeDecimal && decimal) {
      const decimalNum = parseInt(decimal, 10);
      if (decimalNum !== 0) {
        words.push(config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix);
        if (config.individualDecimalDigits) {
          for (const digit of decimal) {
            words.push(this.getWordMapping(Number(digit), config.lang));
          }
        } else {
          words.push(this.getWordMapping(decimalNum, config.lang));
        }
      }
    }

    if (config.isCurrency && config.currency) {
      words.unshift(config.currency);
    }

    const result: ConversionResult = {
      words,
      meta: {
        originalNumber: num.toString(),
        language: config.lang,
        isCurrency: config.isCurrency
      }
    };

    if (cacheKey) {
      conversionCache.set(cacheKey, result);
    }

    return result;
  }

  private hasCustomMappings(config: Required<ConverterConfig>): boolean {
    return Object.keys(config.units).length > 0 || Object.keys(config.scales).length > 0;
  }

  private buildCacheKey(num: number | string | bigint, config: Required<ConverterConfig>): CacheKey {
    return {
      value: num.toString(),
      lang: config.lang,
      isCurrency: config.isCurrency,
      includeDecimal: config.includeDecimal,
      individualDecimalDigits: config.individualDecimalDigits,
      currency: config.currency,
      decimalSuffix: config.decimalSuffix,
      currencyDecimalSuffix: config.currencyDecimalSuffix
    };
  }

  /**
   * Set custom unit and scale mappings from config.
   * Throws if config is invalid.
   */
  protected setCustomMappings(config: Required<ConverterConfig>): void {
    if (!validateCustomMappings(config)) {
      throw new Error('Invalid custom mapping configuration');
    }
    this.customUnits = config.units ?? {};
    this.customScales = config.scales ?? {};
  }

  /**
   * Get the word mapping for a number in the specified language.
   * Checks custom units first, then default cache.
   */
  protected getWordMapping(num: number, lang: Language): string {
    if (this.customUnits[num]?.[lang]) {
      return this.customUnits[num][lang];
    }
    const mapping = this.wordCache.get(num);
    if (!mapping) {
      throw new Error(`No word mapping found for number: ${num}`);
    }
    return mapping[lang];
  }

  /**
   * Get the scale name for a value in the specified language.
   * Checks custom scales first, then default scale list.
   */
  protected getScaleName(value: bigint, lang: Language): string {
    const numValue = Number(value);
    if (this.customScales[numValue]?.[lang]) {
      return this.customScales[numValue][lang];
    }
    const scale = this.scales.find(s => s.value === value);
    if (!scale) {
      throw new Error(`No scale mapping found for value: ${value}`);
    }
    return scale.names[lang];
  }

  /**
   * Process a large number by recursively breaking it down into smaller components
   * using the appropriate scale values.
   * Uses binary search for performance (O(log n) for n scales).
   */
  protected processLargeNumber(
    num: bigint,
    words: string[],
    config: Required<ConverterConfig>
  ): void {
    if (num === 0n) return;

    // `this.scales` is sorted descending, so the leftmost entry that is <= num
    // is the largest applicable scale.
    let currentScale: NumberScale | undefined;
    let left = 0;
    let right = this.scales.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.scales[mid].value <= num) {
        currentScale = this.scales[mid];
        right = mid - 1; // Continue searching for a larger scale
      } else {
        left = mid + 1;
      }
    }

    if (!currentScale) {
      // Handle numbers less than smallest scale (100)
      if (num <= 99n) {
        words.push(this.getWordMapping(Number(num), config.lang));
      }
      return;
    }

    const quotient = num / currentScale.value;
    const remainder = num % currentScale.value;

    // Process quotient recursively only if > 99
    if (quotient > 99n) {
      this.processLargeNumber(quotient, words, config);
    } else {
      words.push(this.getWordMapping(Number(quotient), config.lang));
    }

    words.push(this.getScaleName(currentScale.value, config.lang));

    // Process remainder only if non-zero
    if (remainder > 0n) {
      this.processLargeNumber(remainder, words, config);
    }
  }
}
