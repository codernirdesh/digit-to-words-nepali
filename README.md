# digit-to-words-nepali

A TypeScript library to convert numbers into their word representations in English and Nepali languages.

## Features

- Convert numbers to words in English and Nepali languages
- Support for numbers up to 1e39 (Adanta Singhar)
- Currency formatting with custom currency names
- Decimal number handling with configurable decimal suffixes
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

// Basic number conversion
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
// Default currency (Nepali)
console.log(digitToNepaliWords(1234, { isCurrency: true }));
// Output: रुपैयाँ एक हजार दुई सय चौँतिस

// Custom currency
console.log(
  digitToNepaliWords(1234, {
    isCurrency: true,
    currency: "डलर",
  })
);
// Output: डलर एक हजार दुई सय चौँतिस

// English currency with cents
console.log(
  digitToNepaliWords(1234.56, {
    lang: "en",
    isCurrency: true,
    currency: "dollars",
    includeDecimal: true,
    decimalSuffix: "cents",
  })
);
// Output: dollars one thousand two hundred thirty four cents fifty six
```

### Decimal Numbers

```typescript
// Basic decimal
console.log(digitToNepaliWords(1.5, { includeDecimal: true }));
// Output: एक दशमलव पचास

// Custom decimal suffix
console.log(
  digitToNepaliWords(1.5, {
    includeDecimal: true,
    decimalSuffix: "point",
  })
);
// Output: एक point पचास

// Currency with decimal
console.log(
  digitToNepaliWords(1234.56, {
    isCurrency: true,
    includeDecimal: true,
    currency: "रुपैयाँ",
    decimalSuffix: "पैसा",
  })
);
// Output: रुपैयाँ एक हजार दुई सय चौँतिस पैसा छपन्न
```

### Large Numbers

```typescript
// Lakhs (100,000)
console.log(digitToNepaliWords(100000));
// Output: एक लाख

// Crores (10,000,000)
console.log(digitToNepaliWords(10000000));
// Output: एक करोड

// Arab (1,000,000,000)
console.log(digitToNepaliWords(1000000000));
// Output: एक अरब

// Mixed large number
console.log(digitToNepaliWords(1234567890));
// Output: एक अरब तेइस करोड पैँतालीस लाख सतसट्ठी हजार आठ सय नब्बे
```

## API Reference

### digitToNepaliWords(num: number, config?: NepaliConverterConfig)

Configuration options:

```typescript
interface NepaliConverterConfig {
  isCurrency?: boolean; // Format as currency
  currency?: string; // Currency symbol/text (default: "रुपैयाँ")
  includeDecimal?: boolean; // Include decimal part
  decimalSuffix?: string; // Suffix for decimal (default: "दशमलव")
  lang?: "en" | "ne"; // Output language (default: "ne")
}
```

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
