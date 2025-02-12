import { ConverterConfig, Language, ConversionResult, CustomUnits, CustomScales } from '../types/converterTypes';
import { WordMapping, NumberScale } from '../types/mappingTypes';
import { formatWords, formatCurrencyAmount } from '../utils/formatUtils';
import { validateCustomMappings } from '../utils/validationUtils';

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

  protected setCustomMappings(config: Required<ConverterConfig>): void {
    if (!validateCustomMappings(config)) {
      throw new Error('Input must contain only valid digits');
    }
    
    this.customUnits = config.units ?? {};
    this.customScales = config.scales ?? {};
  }

  protected getWordMapping(num: number, lang: Language): string {
    if (this.customUnits[num]?.[lang]) {
      return this.customUnits[num][lang];
    }

    const mapping = this.wordCache.get(num);
    if (!mapping) {
      throw new Error('Input must contain only valid digits');
    }
    return mapping[lang];
  }

  protected getScaleName(value: bigint, lang: Language): string {
    // First check custom scales
    const numValue = Number(value);
    if (this.customScales[numValue]?.[lang]) {
      return this.customScales[numValue][lang];
    }

    const scale = this.scales.find(s => s.value === value);
    if (!scale) {
      throw new Error('Input must contain only valid digits');
    }
    return scale.names[lang];
  }

  protected processLargeNumber(
    num: bigint,
    words: string[],
    config: Required<ConverterConfig>
  ): void {
    if (num === 0n) return;

    // Find largest applicable scale by iterating once
    let currentScale: NumberScale | undefined;
    for (const scale of this.scales) {
      if (num >= scale.value) {
        currentScale = scale;
        break;
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
