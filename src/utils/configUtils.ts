import { ConverterConfig, Language, LanguageConfig } from '../types/converterTypes';

/**
 * Per-language defaults for currency and decimal wording.
 */
export const LANGUAGE_DEFAULTS: Record<Language, LanguageConfig> = {
  ne: {
    currency: 'रुपैयाँ',
    decimalSuffix: 'दशमलव',
    currencyDecimalSuffix: 'पैसा'
  },
  en: {
    currency: 'Dollars',
    decimalSuffix: 'point',
    currencyDecimalSuffix: 'cents'
  }
};

/**
 * Fills a partial user config with defaults for the given language.
 *
 * `individualDecimalDigits` defaults to `true` for plain numbers and `false`
 * for currency, unless the caller sets it explicitly.
 *
 * `padDecimalDigits` defaults to `false`: when digits are spelled out one by
 * one, `1.5` reads "one point five", not "one point five zero". It has no
 * effect in combined mode, where the decimal is read as a quantity and must be
 * padded to be correct (`1.5` really is fifty hundredths).
 */
export function resolveConfig(
  lang: Language,
  config: Partial<ConverterConfig>
): Required<ConverterConfig> {
  const resolved: Required<ConverterConfig> = {
    lang,
    isCurrency: false,
    includeDecimal: true,
    individualDecimalDigits: true,
    padDecimalDigits: false,
    units: {},
    scales: {},
    ...LANGUAGE_DEFAULTS[lang],
    ...config
  };

  if (config.individualDecimalDigits === undefined) {
    resolved.individualDecimalDigits = !resolved.isCurrency;
  }

  return resolved;
}
