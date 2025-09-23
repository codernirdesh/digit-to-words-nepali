import { MappableNumbers, ScaleValues, CustomMapping } from './mappingTypes';

/**
 * Supported languages for conversion output
 */
export type Language = "en" | "ne";

/**
 * Custom unit mappings for specific numbers
 */
export type CustomUnits = Record<number, Record<Language, string>>;

/**
 * Custom scale mappings for specific scale values
 */
export type CustomScales = Record<number, Record<Language, string>>;

/**
 * Configuration options for number-to-words conversion
 */
export interface ConverterConfig {
  lang?: Language;                    // Output language (default: "ne")
  isCurrency?: boolean;               // Format as currency (default: false)
  currency?: string;                  // Custom currency text
  includeDecimal?: boolean;           // Include decimal part (default: true)
  decimalSuffix?: string;             // Custom decimal suffix
  currencyDecimalSuffix?: string;     // Custom currency decimal suffix
  units?: CustomUnits;                // Custom number word overrides
  scales?: CustomScales;              // Custom scale word overrides
}

/**
 * Language-specific default configuration
 */
export interface LanguageConfig {
  currency: string;
  decimalSuffix: string;
  currencyDecimalSuffix: string;
}

/**
 * Result of number-to-words conversion
 */
export interface ConversionResult {
  words: string[];
  meta: {
    originalNumber: string;
    language: Language;
    isCurrency: boolean;
  };
}
