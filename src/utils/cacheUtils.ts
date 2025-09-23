/**
 * Cache utility for storing conversion results to improve performance
 * for repeated conversions of the same numbers.
 */
import { ConversionResult } from '../types/converterTypes';

// CacheKey includes all factors affecting the conversion result
type CacheKey = {
  value: string;
  lang: string;
  isCurrency: boolean;
  includeDecimal: boolean;
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
  key.currency || '',
  key.decimalSuffix || '',
  key.currencyDecimalSuffix || ''
].join('|');

/**
 * LRU Cache for conversion results
 */
export class ConversionCache {
  private cache: Map<string, ConversionResult>;
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Get cached result, implementing LRU behavior.
   */
  get(key: CacheKey): ConversionResult | undefined {
    const cacheKey = createCacheKey(key);
    const result = this.cache.get(cacheKey);
    
    // Move to end of Map to implement LRU behavior
    if (result) {
      this.cache.delete(cacheKey);
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  /**
   * Set cached result, evicting oldest if necessary.
   */
  set(key: CacheKey, result: ConversionResult): void {
    const cacheKey = createCacheKey(key);
    
    // Ensure cache doesn't exceed max size by removing oldest entry
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(cacheKey, result);
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
