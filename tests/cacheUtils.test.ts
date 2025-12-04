import { ConversionCache, conversionCache } from '../src/utils/cacheUtils';
import { ConversionResult } from '../src/types/converterTypes';

describe('ConversionCache', () => {
  const makeKey = (v: string) => ({
    value: v,
    lang: 'en',
    isCurrency: false,
    includeDecimal: true,
    individualDecimalDigits: true,
  });

  const makeRes = (v: string): ConversionResult => ({
    words: [v],
    meta: { originalNumber: v, language: 'en', isCurrency: false },
  });

  it('reorders on get and evicts least recently used entry', () => {
    const cache = new ConversionCache(2);
    const k1 = makeKey('1');
    const k2 = makeKey('2');
    cache.set(k1, makeRes('one'));
    cache.set(k2, makeRes('two'));
    cache.get(k1); // k2 becomes LRU
    const k3 = makeKey('3');
    cache.set(k3, makeRes('three'));
    expect(cache.get(k2)).toBeUndefined();
    expect(cache.get(k1)?.words[0]).toBe('one');
    expect(cache.get(k3)?.words[0]).toBe('three');
  });

  it('evicts oldest without access reordering', () => {
    const cache = new ConversionCache(2);
    const k1 = makeKey('10');
    const k2 = makeKey('20');
    cache.set(k1, makeRes('ten'));
    cache.set(k2, makeRes('twenty'));
    const k3 = makeKey('30');
    cache.set(k3, makeRes('thirty'));
    expect(cache.get(k1)).toBeUndefined();
    expect(cache.get(k2)?.words[0]).toBe('twenty');
    expect(cache.get(k3)?.words[0]).toBe('thirty');
  });

  it('clear removes all entries', () => {
    const cache = new ConversionCache(3);
    const k = makeKey('100');
    cache.set(k, makeRes('hundred'));
    expect(cache.size).toBe(1);
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.get(k)).toBeUndefined();
  });
});

describe('conversionCache singleton', () => {
  it('stores and retrieves globally', () => {
    const k = {
      value: '42',
      lang: 'en',
      isCurrency: false,
      includeDecimal: true,
      individualDecimalDigits: true,
    };
    const value: ConversionResult = {
      words: ['forty', 'two'],
      meta: { originalNumber: '42', language: 'en', isCurrency: false },
    };
    conversionCache.set(k, value);
    expect(conversionCache.get(k)).toEqual(value);
  });
});
