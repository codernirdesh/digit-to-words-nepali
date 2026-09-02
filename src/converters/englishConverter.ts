import { BaseConverter } from './baseConverter';
import { ConverterConfig } from '../types/converterTypes';
import { englishScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';
import { ConverterFactory } from '../utils/converterFactory';
import { resolveConfig } from '../utils/configUtils';
import { formatWords } from '../utils/formatUtils';

/**
 * EnglishConverter
 * Converts numbers to English words using the Nepali/Indian scale system
 * (thousand, lakh, crore, arab, ...).
 */
export class EnglishConverter extends BaseConverter {
  constructor() {
    super();
    this.wordCache = createNumberWordMap();
    this.scales = englishScaleMappings;
  }
}

/**
 * Convert a number to English words.
 *
 * @param num - Non-negative number, numeric string, or bigint (up to 10^39 - 1)
 * @param config - Optional conversion settings
 */
export const digitToEnglishWords = (
  num: number | string | bigint,
  config: Partial<ConverterConfig> = {}
): string => {
  const converter = ConverterFactory.getInstance('EnglishConverter', () => new EnglishConverter());
  const result = converter.convert(num, resolveConfig('en', config));
  return formatWords(result.words);
};
