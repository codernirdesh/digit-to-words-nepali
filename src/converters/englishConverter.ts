import { BaseConverter } from './baseConverter';
import { ConverterConfig, ConversionResult } from '../types/converterTypes';
import { isValidNumber, splitNumber } from '../utils/validationUtils';
import { englishScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';

export class EnglishConverter extends BaseConverter {
  constructor() {
    super();
    this.wordCache = createNumberWordMap();
    this.scales = englishScaleMappings;
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
      words.push(this.getWordMapping(0, 'en'));
    } else {
      this.processLargeNumber(integer, words, config);
    }

    // Handle decimal part
    if (config.includeDecimal && decimal) {
      words.push(config.isCurrency ? config.currencyDecimalSuffix : config.decimalSuffix);
      const decimalNum = parseInt(decimal);
      if (decimalNum === 0) {
        words.push(this.getWordMapping(0, 'en'));
      } else {
        words.push(this.getWordMapping(decimalNum, 'en'));
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
        language: 'en',
        isCurrency: config.isCurrency
      }
    };
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
  const converter = new EnglishConverter();
  const result = converter.convert(num, {
    lang: 'en',
    isCurrency: false,
    includeDecimal: true,
    currency: 'Dollars',
    decimalSuffix: 'point',
    currencyDecimalSuffix: 'cents',
    units: {},
    scales: {},
    ...config
  });
  return result.words.join(' ').trim();
};
