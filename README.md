# digit-to-words-nepali

A TypeScript library to convert numbers into their word representations in English and Nepali languages. Supports numbers up to Adanta Singhar (10^39) with extensive currency and decimal formatting options.

## Features

- Convert numbers to words in English and Nepali languages
- Support for numbers up to 10^39 (Adanta Singhar)
- Currency formatting with custom currency names and decimal suffixes
- Decimal number handling with configurable decimal formats
- Language-specific defaults for currency and decimal formatting
- Zero-dependency and lightweight
- Fully tested with comprehensive test cases

## Installation

```bash
npm install digit-to-words-nepali
```

## Usage

### Basic Usage

```typescript
import { digitToNepaliWords, digitToEnglishWords } from "digit-to-words-nepali";

// Basic number conversion (Nepali)
console.log(digitToNepaliWords(1234));
// Output: एक हजार दुई सय चौँतिस

// English output
console.log(digitToNepaliWords(1234, { lang: "en" }));
// Output: one thousand two hundred thirty four

// Direct English conversion
console.log(digitToEnglishWords(1234));
// Output: One Thousand, Two Hundred Thirty Four
```

### Currency Formatting

```typescript
// Default Nepali currency
console.log(digitToNepaliWords(1234.50, { 
  isCurrency: true,
  includeDecimal: true 
}));
// Output: रुपैयाँ एक हजार दुई सय चौँतिस पैसा पचास

// Custom currency with decimals
console.log(digitToNepaliWords(1234.05, {
  isCurrency: true,
  includeDecimal: true,
  currency: "डलर",
  currencyDecimalSuffix: "सेन्ट"
}));
// Output: डलर एक हजार दुई सय चौँतिस सेन्ट पाँच

// English currency format
console.log(digitToNepaliWords(1234.50, {
  lang: "en",
  isCurrency: true,
  includeDecimal: true,
  currency: "dollars",
  currencyDecimalSuffix: "cents"
}));
// Output: dollars one thousand two hundred thirty four cents fifty
```

### Decimal Handling

```typescript
// Non-currency decimal (preserves original decimal)
console.log(digitToNepaliWords(1.5, { 
  includeDecimal: true 
}));
// Output: एक दशमलव पाँच

// Currency decimal (pads to 2 digits)
console.log(digitToNepaliWords(1.5, {
  isCurrency: true,
  includeDecimal: true
}));
// Output: रुपैयाँ एक पैसा पचास

// Custom decimal suffix
console.log(digitToNepaliWords(1.23, {
  includeDecimal: true,
  decimalSuffix: "point"
}));
// Output: एक point तेइस
```

### Large Numbers

```typescript
// Large number in Nepali
console.log(digitToNepaliWords(1234567890));
// Output: एक अरब तेइस करोड पैँतालीस लाख सतसट्ठी हजार आठ सय नब्बे

// Large number in English
console.log(digitToNepaliWords(1234567890, { lang: "en" }));
// Output: one arab twenty three crore forty five lakh sixty seven thousand eight hundred ninety
```

## API Reference

### digitToNepaliWords(num: number, config?: NepaliConverterConfig)

Configuration options:

```typescript
interface NepaliConverterConfig {
  isCurrency?: boolean;      // Format as currency
  currency?: string;         // Currency symbol/text 
                            // (default: "रुपैयाँ" for Nepali, "Rupees" for English)
  includeDecimal?: boolean;  // Include decimal part
  decimalSuffix?: string;    // Suffix for non-currency decimal
                            // (default: "दशमलव" for Nepali, "point" for English)
  currencyDecimalSuffix?: string; // Suffix for currency decimal
                                 // (default: "पैसा" for Nepali, "paisa" for English)
  lang?: "en" | "ne";       // Output language (default: "ne")
}
```

### Language-specific Defaults

Nepali (lang: "ne"):
- currency: "रुपैयाँ"
- decimalSuffix: "दशमलव"
- currencyDecimalSuffix: "पैसा"

English (lang: "en"):
- currency: "Rupees"
- decimalSuffix: "point"
- currencyDecimalSuffix: "paisa"

### digitToEnglishWords(num: number)

Converts number to English words using traditional English number system.

## Error Handling

The library throws errors for:
- Negative numbers
- Non-numeric input
- Invalid decimal values
- NaN or Infinity values

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Acknowledgments

- Thanks to [@codernirdesh](https://github.com/codernirdesh) for the initial implementation.

## Contact

For any questions or feedback, please contact [@codernirdesh](https://github.com/codernirdesh).
