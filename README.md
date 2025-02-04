# digit-to-words-nepali

A TypeScript library to convert numbers into their word representations in English and Nepali languages. Supports numbers up to Adanta Singhar (10^39) with extensive currency and decimal formatting options.

## Features

- Convert numbers to words in English and Nepali languages
- Support for numbers up to 10^39 (Adanta Singhar)
- Native BigInt support for large numbers
- Currency formatting with custom currency names
- Decimal number handling with configurable formats
- Language-specific defaults
- Zero external dependencies
- Strict input validation
- Fully tested with comprehensive test cases

## Installation

```bash
npm install digit-to-words-nepali
```

## Usage

### Basic Usage

```typescript
import { digitToNepaliWords } from "digit-to-words-nepali";

// Simple number conversion
digitToNepaliWords(1234); // "एक हजार दुई सय चौँतिस"

// Large numbers using BigInt
digitToNepaliWords(BigInt("123456789012345")); // "एक करोड तेइस लाख..."

// English output
digitToNepaliWords(1234, { lang: "en" }); // "one thousand two hundred thirty four"
```

### Currency Formatting

```typescript
// Default Nepali currency
digitToNepaliWords(1234.5, {
  isCurrency: true,
  includeDecimal: true,
});
// "रुपैयाँ एक हजार दुई सय चौँतिस पैसा पचास"

// Custom currency
digitToNepaliWords(1234.05, {
  isCurrency: true,
  includeDecimal: true,
  currency: "डलर",
  currencyDecimalSuffix: "सेन्ट",
});
// "डलर एक हजार दुई सय चौँतिस सेन्ट पाँच"
```

### Decimal Handling

```typescript
// Regular decimal
digitToNepaliWords(1.23, {
  includeDecimal: true,
});
// "एक दशमलव तेइस"

// Custom decimal suffix
digitToNepaliWords(1.23, {
  includeDecimal: true,
  decimalSuffix: "point",
});
// "एक point तेइस"
```

## API Reference

### digitToNepaliWords()

```typescript
function digitToNepaliWords(
  num: number | string | bigint,
  config?: NepaliConverterConfig
): string;

interface NepaliConverterConfig {
  lang?: "en" | "ne"; // Output language (default: "ne")
  isCurrency?: boolean; // Format as currency (default: false)
  includeDecimal?: boolean; // Include decimal part (default: false)
  currency?: string; // Custom currency text
  decimalSuffix?: string; // Custom decimal suffix
  currencyDecimalSuffix?: string; // Custom currency decimal suffix
}
```

## Input Validation

The library performs strict input validation:

```typescript
// All these will throw "Input must contain only valid digits"
digitToNepaliWords(-123); // Negative numbers
digitToNepaliWords("abc"); // Non-numeric input
digitToNepaliWords("1a2"); // Invalid integer part
digitToNepaliWords("1.2a"); // Invalid decimal part
digitToNepaliWords(NaN); // NaN
digitToNepaliWords(Infinity); // Infinity
```

## Language-specific Defaults

### Nepali (lang: "ne")

```typescript
{
  currency: "रुपैयाँ",
  decimalSuffix: "दशमलव",
  currencyDecimalSuffix: "पैसा"
}
```

### English (lang: "en")

```typescript
{
  currency: "Rupees",
  decimalSuffix: "point",
  currencyDecimalSuffix: "paisa"
}
```

## Best Practices

1. For large numbers (> Number.MAX_SAFE_INTEGER), use BigInt:

```typescript
digitToNepaliWords(BigInt("12345678901234567890"));
```

2. For currency values, always set both flags:

```typescript
digitToNepaliWords(amount, {
  isCurrency: true,
  includeDecimal: true,
});
```

3. Always validate input before passing to the converter:

```typescript
try {
  const result = digitToNepaliWords(userInput);
} catch (error) {
  console.error("Invalid input:", error.message);
}
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions welcome! Please check our contributing guidelines.

## Support

For issues and questions, please [open an issue](https://github.com/codernirdesh/digit-to-words-nepali/issues).

## Number Scale Support

The library supports numbers up to Adanta Singhar (10^39). Here's the complete scale:

| Power | English        | Nepali      | Example                                                     |
| ----- | -------------- | ----------- | ----------------------------------------------------------- |
| 10^2  | hundred        | सय          | 100                                                         |
| 10^3  | thousand       | हजार        | 1,000                                                       |
| 10^5  | lakh           | लाख         | 1,00,000                                                    |
| 10^7  | crore          | करोड        | 1,00,00,000                                                 |
| 10^9  | arab           | अरब         | 1,00,00,00,000                                              |
| 10^11 | kharab         | खरब         | 1,00,00,00,00,000                                           |
| 10^13 | neel           | नील         | 1,00,00,00,00,00,000                                        |
| 10^15 | padma          | पद्म        | 1,00,00,00,00,00,00,000                                     |
| 10^17 | shankha        | शंख         | 1,00,00,00,00,00,00,00,000                                  |
| 10^19 | udpadh         | उपाध        | 1,00,00,00,00,00,00,00,00,000                               |
| 10^21 | ank            | अंक         | 1,00,00,00,00,00,00,00,00,00,000                            |
| 10^23 | jald           | जल्द        | 1,00,00,00,00,00,00,00,00,00,00,000                         |
| 10^25 | madh           | मध          | 1,00,00,00,00,00,00,00,00,00,00,00,000                      |
| 10^27 | paraardha      | परार्ध      | 1,00,00,00,00,00,00,00,00,00,00,00,00,000                   |
| 10^29 | ant            | अन्त        | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,000                |
| 10^31 | maha ant       | महाअन्त     | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000             |
| 10^33 | shishant       | शिशान्त     | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000          |
| 10^35 | singhar        | सिंघर       | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000       |
| 10^37 | maha singhar   | महासिंघर    | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000    |
| 10^39 | adanta singhar | अदन्त सिंघर | 1,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,000 |

Examples:

```typescript
// Large number conversion
digitToNepaliWords(1000000000); // "एक अरब"
digitToNepaliWords(1000000000, { lang: "en" }); // "one arab"

// Using BigInt for very large numbers
digitToNepaliWords(BigInt("1" + "0".repeat(39))); // "एक अदन्त सिंघर"
```
