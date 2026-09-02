// Type exports
export * from "./types/converterTypes";
export * from "./types/mappingTypes";

// Main converter functions
export { digitToNepaliWords } from "./converters/nepaliConverter";
export { digitToEnglishWords } from "./converters/englishConverter";

// Utility functions
export {
  unicodeToEnglishNumber,
  unicodeToEnglishDigits,
  englishToUnicodeNumber
} from "./utils/numberUtils";
export { MAX_SUPPORTED_INTEGER, isValidNumber } from "./utils/validationUtils";

// Advanced exports for custom usage
export { conversionCache, ConversionCache } from "./utils/cacheUtils";
export type { CacheKey } from "./utils/cacheUtils";
export { ConverterFactory } from "./utils/converterFactory";
export { NepaliConverter } from "./converters/nepaliConverter";
export { EnglishConverter } from "./converters/englishConverter";
export { LANGUAGE_DEFAULTS } from "./utils/configUtils";
export { SCALE_VALUES, baseScaleMappings } from "./mappings/scaleMappings";
export { BASE_NUMBERS, createNumberWordMap } from "./mappings/numberMappings";
