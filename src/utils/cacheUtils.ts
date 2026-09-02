/**
 * Cache utility for storing conversion results to improve performance
 * for repeated conversions of the same numbers.
 */
import { ConversionResult } from '../types/converterTypes';

// CacheKey includes all factors affecting the conversion result
export type CacheKey = {
  value: string;
  lang: string;
  isCurrency: boolean;
  includeDecimal: boolean;
  individualDecimalDigits?: boolean;
  padDecimalDigits?: boolean;
  currency?: string;
  decimalSuffix?: string;
  currencyDecimalSuffix?: string;
};

// Create a stable string key for caching
const createCacheKey = (key: CacheKey): string => [
  key.value,
  key.lang,
  key.isCurrency ? '1' : '0',
  key.includeDecimal ? '1' : '0',
  key.individualDecimalDigits ? '1' : '0',
  key.padDecimalDigits ? '1' : '0',
  key.currency || '',
  key.decimalSuffix || '',
  key.currencyDecimalSuffix || ''
].join('|');

// Callers receive their own copy so that mutating a result cannot corrupt the cache.
const cloneResult = (result: ConversionResult): ConversionResult => ({
  words: [...result.words],
  meta: { ...result.meta }
});

/**
 * LRU Cache for conversion results
 */
export class ConversionCache {
  private cache: Map<string, ConversionResult>;
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    if (!Number.isInteger(maxSize) || maxSize < 1) {
      throw new Error('Cache maxSize must be a positive integer');
    }
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Get a copy of the cached result, refreshing its LRU position.
   */
  get(key: CacheKey): ConversionResult | undefined {
    const cacheKey = createCacheKey(key);
    const result = this.cache.get(cacheKey);
    if (!result) return undefined;

    // Move to end of Map to implement LRU behavior
    this.cache.delete(cacheKey);
    this.cache.set(cacheKey, result);
    return cloneResult(result);
  }

  /**
   * Store a result, evicting the least recently used entry when full.
   */
  set(key: CacheKey, result: ConversionResult): void {
    const cacheKey = createCacheKey(key);

    // Overwriting an existing key does not grow the cache, so only evict when
    // inserting a genuinely new entry would exceed the limit.
    if (this.cache.has(cacheKey)) {
      this.cache.delete(cacheKey);
    } else if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(cacheKey, cloneResult(result));
  }

  /**
   * Clear all cached entries.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get current cache size.
   */
  get size(): number {
    return this.cache.size;
  }
}

/**
 * Global singleton cache instance
 */
export const conversionCache = new ConversionCache();
