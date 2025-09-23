import { ConverterConfig, Language, ConversionResult, CustomUnits, CustomScales } from '../types/converterTypes';
import { WordMapping, NumberScale } from '../types/mappingTypes';
import { formatWords, formatCurrencyAmount } from '../utils/formatUtils';
import { validateCustomMappings } from '../utils/validationUtils';

/**
 * BaseConverter
 * Abstract class for number-to-words conversion logic.
 * Handles custom mappings, scale lookups, and large number processing.
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

    // Find largest applicable scale using binary search
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

  protected formatResult(
    words: string[],
    config: Required<ConverterConfig>
  ): string {
    const formatted = formatWords(words);
    if (config.isCurrency) {
      return formatCurrencyAmount(formatted, config.currency, config.lang);
    }
    return formatted;
  }

  abstract convert(
    num: number | string | bigint,
    config: Required<ConverterConfig>
  ): ConversionResult;
}
