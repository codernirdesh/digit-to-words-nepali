import { MappableNumbers, ScaleValues } from '../types/mappingTypes';
import { ConverterConfig, CustomUnits, CustomScales, Language } from '../types/converterTypes';
import { SCALE_VALUES } from '../mappings/scaleMappings';

export function isValidNumber(num: number | string | bigint): boolean {
  try {
    if (typeof num === 'bigint') return num >= 0n;
    if (typeof num === 'number') {
      return !isNaN(num) && isFinite(num) && num >= 0;
    }

    const str = num.toString().trim();
    if (!str) return false;

    // Handle special cases
    if (str === 'NaN' || str === 'Infinity' || str === '-Infinity') {
      return false;
    }

    // Handle decimal numbers
    const [intPart, decPart] = str.split('.');
    if (!intPart || intPart.startsWith('-') || !/^\d+$/.test(intPart)) {
      return false;
    }

    if (decPart !== undefined && !/^\d+$/.test(decPart)) {
      return false;
    }

    // Validate the size
    try {
      BigInt(intPart);
      return true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

export function splitNumber(num: number | string | bigint): {
  integer: bigint;
  decimal?: string;
} {
  if (typeof num === 'bigint') return { integer: num };

  const str = num.toString();
  const [intPart, decPart] = str.split('.');
  
  const integer = BigInt(intPart);
  
  if (!decPart) return { integer };

  const decimalStr = decPart.padEnd(3, '0').slice(0, 3);
  const decimalNum = Number(`0.${decimalStr}`);
  const rounded = Math.round(decimalNum * 100);

  if (rounded === 100) {
    return { integer: integer + 1n };
  }

  return {
    integer,
    decimal: rounded.toString().padStart(2, '0')
  };
}

export function roundDecimal(decimal: string): string {
  const num = parseFloat(`0.${decimal}`);
  const rounded = Math.round(num * 100);
  return rounded.toString().padStart(2, '0');
}

export function validateDecimal(decimal: string | undefined): boolean {
  if (!decimal) return true;
  
  const num = parseInt(decimal);
  return (
    !isNaN(num) &&
    num >= 0 &&
    num <= 99 &&
    decimal.length <= 2 &&
    /^\d{1,2}$/.test(decimal)
  );
}

export function normalizeDecimal(decimal: string | undefined): string | undefined {
  if (!decimal) return undefined;
  
  const num = parseInt(decimal);
  if (num === 0) return undefined;
  
  return num.toString().padStart(2, '0');
}

function isValidLanguageMapping(mapping: unknown): mapping is Record<Language, string> {
  if (!mapping || typeof mapping !== 'object') return false;
  return (
    'en' in mapping &&
    'ne' in mapping &&
    typeof (mapping as any).en === 'string' &&
    typeof (mapping as any).ne === 'string'
  );
}

function isValidCustomUnits(units: unknown): units is CustomUnits {
  if (!units || typeof units !== 'object') return false;
  
  return Object.entries(units).every(([key, value]) => {
    const num = Number(key);
    return (
      !isNaN(num) &&
      num >= 0 &&
      num <= 99 &&
      isValidLanguageMapping(value)
    );
  });
}

function isValidCustomScales(scales: unknown): scales is CustomScales {
  if (!scales || typeof scales !== 'object') return false;
  
  const validScales = Object.values(SCALE_VALUES).map(Number);
  return Object.entries(scales).every(([key, value]) => {
    const num = Number(key);
    return (
      validScales.includes(num) &&
      isValidLanguageMapping(value)
    );
  });
}

export function validateCustomMappings(config: Required<ConverterConfig>): boolean {
  try {
    if (config.units && !isValidCustomUnits(config.units)) return false;
    if (config.scales && !isValidCustomScales(config.scales)) return false;
    return true;
  } catch {
    return false;
  }
}

export function getScaleValue(scale: number | string): bigint {
  const num = typeof scale === 'string' ? parseInt(scale) : scale;
  return BigInt(num);
}
