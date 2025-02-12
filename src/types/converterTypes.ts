import { MappableNumbers, ScaleValues, CustomMapping } from './mappingTypes';

export type Language = "en" | "ne";

export type CustomUnits = Record<number, Record<Language, string>>;
export type CustomScales = Record<number, Record<Language, string>>;

export interface ConverterConfig {
  lang?: Language;
  isCurrency?: boolean;
  currency?: string;
  includeDecimal?: boolean;
  decimalSuffix?: string;
  currencyDecimalSuffix?: string;
  units?: CustomUnits;
  scales?: CustomScales;
}

export interface LanguageConfig {
  currency: string;
  decimalSuffix: string;
  currencyDecimalSuffix: string;
}

export interface ConversionResult {
  words: string[];
  meta: {
    originalNumber: string;
    language: Language;
    isCurrency: boolean;
  };
}
