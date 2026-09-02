## [Unreleased]

### Fixed
- Numbers that JavaScript stringifies in exponential notation no longer crash. `digitToNepaliWords(1e21)` previously threw `SyntaxError: Cannot convert 1e+21 to a BigInt`; it now returns `"एक अङ्क"`. The same applies to very small values such as `1e-7`, which correctly round to zero.
- The upper bound is now enforced for English output too. `digitToEnglishWords("1" + "0".repeat(42))` previously returned a bogus scale phrase instead of throwing.
- English output now honours the documented zero-decimal rule: `digitToEnglishWords(123.001)` returns `"one hundred twenty three"` rather than `"one hundred twenty three point zero"`.
- Cached results are copied in and out of `conversionCache`, so mutating a returned `ConversionResult` can no longer corrupt later conversions.
- `ConversionCache.set` no longer evicts an unrelated entry when overwriting a key that is already cached.

### Changed
- The English and Nepali converters now share a single implementation in `BaseConverter`, removing ~200 lines of duplicated conversion, caching, and default-config logic. Behaviour for documented cases is unchanged.
- `MAX_SUPPORTED_INTEGER` is now derived from the scale table rather than hardcoded, so the bound and the table cannot drift apart when a scale is added.
- `VALID_SCALES` is deprecated in favour of the complete `SCALE_VALUES` table, which is now exported from the package root.

### Added
- **अदन्त सिंघर / adanta singhar (10^39) added to the scale table.** The README already documented this scale but the code stopped at महासिंघर (10^37), which is why the advertised "up to 10^39" ceiling did not line up. The maximum supported value is now `10^41 - 1` (99 अदन्त सिंघर). This is purely additive — every value that converted before produces identical output; numbers that previously threw now convert.
- `englishToUnicodeNumber` — converts ASCII digits to Nepali unicode digits.
- `unicodeToEnglishDigits` — Nepali unicode digits to an ASCII digit string, with no safe-integer limit.
- Package root now also exports `SCALE_VALUES`, `baseScaleMappings`, `BASE_NUMBERS`, `createNumberWordMap`, `LANGUAGE_DEFAULTS`, `MAX_SUPPORTED_INTEGER`, `isValidNumber`, `ConversionCache`, `NepaliConverter`, and `EnglishConverter`.
- Source maps and declaration maps are published alongside `dist`.
- Test suites for the English converter and the utility modules (207 tests, up from 142).

## [1.0.2] - 2025-12-04

Release via GitHub Actions

Release via GitHub Actions

- Version bump: major

## [0.1.2] - 2025-09-23

### Added
- **Individual Decimal Digits Feature**: New configuration option `individualDecimalDigits` to control how decimal places are pronounced
  - Default behavior now spells decimal digits individually for non-currency numbers (e.g., "1.33" → "एक दशमलव तीन तीन")
  - Currency mode retains combined decimal pronunciation (e.g., "1.33" → "रुपैयाँ एक पैसा तेत्तिस")
  - Users can override the default behavior using the `individualDecimalDigits` configuration option

### Changed
- **Breaking Change**: Default decimal pronunciation for non-currency numbers now uses individual digits instead of combined numbers
  - Before: `1.33` → "एक दशमलव तेत्तिस" 
  - After: `1.33` → "एक दशमलव तीन तीन"
- Enhanced cache system to support the new configuration parameter
- Updated both English and Nepali converters to support individual decimal digit pronunciation

### Fixed
- Improved decimal handling logic for better consistency across different number formats

## [0.1.1] - 2025-09-23

- Version bump: patch

## [0.1.0] - 2025-09-23

- Version bump: minor

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.9] - 2025-01-20

### Added
- Complete codebase refactoring for enhanced readability, maintainability, and performance
- Comprehensive JSDoc documentation across all modules
- Enhanced error handling and validation
- LRU caching system for performance optimization
- Factory pattern for converter instances
- 46 new real-world Nepali test scenarios covering diverse contexts
- Specific test cases for complex kharab scale numbers (1756000000000)
- Support for numbers up to 10^39 (Adanta Singhar)
- BigInt support for very large numbers
- Currency formatting with customizable options
- Decimal handling with proper rounding
- English and Nepali language output support

### Changed
- Improved code structure and organization
- Enhanced TypeScript type definitions
- Better error messages and validation
- Optimized performance with caching

### Fixed
- Edge cases in number conversion
- Decimal rounding issues
- BigInt handling improvements

## [Previous Versions]

Previous version history can be found in the git commit history.