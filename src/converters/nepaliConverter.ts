import { BaseConverter } from './baseConverter';
import { ConverterConfig } from '../types/converterTypes';
import { nepaliScaleMappings } from '../mappings/scaleMappings';
import { createNumberWordMap } from '../mappings/numberMappings';
import { digitToEnglishWords } from './englishConverter';
import { ConverterFactory } from '../utils/converterFactory';
import { resolveConfig } from '../utils/configUtils';
import { formatWords } from '../utils/formatUtils';

/**
 * NepaliConverter
 * Converts numbers to Nepali words using the Nepali/Indian scale system
 * (हजार, लाख, करोड, अरब, ...).
 */
export class NepaliConverter extends BaseConverter {
  constructor() {
    super();
    this.wordCache = createNumberWordMap();
    this.scales = nepaliScaleMappings;
  }
}

/**
 * Convert a number to Nepali words. Pass `{ lang: "en" }` to get English output
 * from the same scale system.
 *
 * @param num - Non-negative number, numeric string, or bigint (up to 10^39 - 1)
 * @param config - Optional conversion settings
 */
export const digitToNepaliWords = (
  num: number | string | bigint,
  config: Partial<ConverterConfig> = {}
): string => {
  // Delegate to the English converter so both entry points share defaults.
  if (config.lang === 'en') {
    return digitToEnglishWords(num, config);
  }

  const converter = ConverterFactory.getInstance('NepaliConverter', () => new NepaliConverter());
  const result = converter.convert(num, resolveConfig('ne', config));
  return formatWords(result.words);
};
