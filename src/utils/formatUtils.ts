import { Language } from '../types/converterTypes';

export function formatWords(words: string[]): string {
  return words
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function padDecimal(decimal: string): string {
  return decimal.padStart(2, '0');
}

export function formatCurrencyAmount(
  amount: string,
  currency: string,
  lang: Language
): string {
  return lang === 'ne' 
    ? `${currency} ${amount}` 
    : `${amount} ${currency}`;
}
