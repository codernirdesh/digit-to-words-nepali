// Type exports
export * from "./types/converterTypes";
export * from "./types/mappingTypes";

// Main converter functions
export { digitToNepaliWords } from "./converters/nepaliConverter";
export { digitToEnglishWords } from "./converters/englishConverter";

// Utility functions
export { unicodeToEnglishNumber } from "./utils/numberUtils";

// Advanced exports for custom usage
export { conversionCache } from "./utils/cacheUtils";
export { ConverterFactory } from "./utils/converterFactory";
