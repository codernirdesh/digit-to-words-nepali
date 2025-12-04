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