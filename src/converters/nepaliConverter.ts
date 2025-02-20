import { BaseConverter } from './baseConverter';
import { ConverterConfig, ConversionResult } from '../types/converterTypes';
import { isValidNumber, splitNumber } from '../utils/validationUtils';
import { nepaliScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';

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

    if (!isValidNumber(num)) {
      throw new Error('Input must contain only valid digits');
    }

    const { integer, decimal } = splitNumber(num);
    const words: string[] = [];

    // Convert integer part
    if (integer === 0n) {
      words.push(this.getWordMapping(0, config.lang));
    } else {
      this.processLargeNumber(integer, words, config);
    }

    // Handle decimal part
    if (config.includeDecimal && decimal) {
      words.push(config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix);
      const decimalNum = parseInt(decimal);
      if (decimalNum === 0) {
        words.push(this.getWordMapping(0, config.lang));
      } else {
        words.push(this.getWordMapping(decimalNum, config.lang));
      }
    }

    // Add currency prefix if needed
    if (config.isCurrency) {
      words.unshift(config.currency);
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
  const converter = new NepaliConverter();
  const defaultConfig: Required<ConverterConfig> = {
    lang: 'ne',
    isCurrency: false,
    includeDecimal: true,
    currency: 'रुपैयाँ',
    decimalSuffix: 'दशमलव',
    currencyDecimalSuffix: 'पैसा',
    units: {},
    scales: {},
    ...config
  };

  const result = converter.convert(num, defaultConfig);
  return result.words.join(' ').trim();
};
