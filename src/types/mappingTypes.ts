import { Language } from './converterTypes';

export interface WordMapping {
  en: string;
  ne: string;
}

export interface NumberScale {
  value: bigint;
  names: Record<Language, string>;
}

export interface UnitMapping {
  value: number;
  names: Record<Language, string>;
}

export interface ScaleDefinition {
  value: number;
  names: Record<Language, string>;
}

export type MappableNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
  21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
  31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
  41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 |
  51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 |
  61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 |
  71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 |
  81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 |
  91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99;

export const VALID_SCALES = {
  HUNDRED: 100n,
  THOUSAND: 1000n,
  LAKH: 100000n,
  CRORE: 10000000n,
  ARAB: 1000000000n,
  KHARAB: 100000000000n,
  NEEL: 10000000000000n,
  PADMA: 1000000000000000n,
  SHANKHA: 100000000000000000n
} as const;

export type ScaleValues = typeof VALID_SCALES[keyof typeof VALID_SCALES];

export type CustomMapping = Record<Language, string>;
