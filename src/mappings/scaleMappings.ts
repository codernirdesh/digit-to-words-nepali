import { NumberScale } from '../types/mappingTypes';

/**
 * SCALE_VALUES
 * Maps scale names to their BigInt values for Nepali/Indian number system.
 */
export const SCALE_VALUES = Object.freeze({
  ADANTA_SINGHAR: 10n ** 39n,
  MAHA_SINGHAR: 10n ** 37n,
  SINGHAR: 10n ** 35n,
  SHISHANT: 10n ** 33n,
  MAHA_ANT: 10n ** 31n,
  ANT: 10n ** 29n,
  PARAARDHA: 10n ** 27n,
  MADH: 10n ** 25n,
  JALD: 10n ** 23n,
  ANK: 10n ** 21n,
  UDPADH: 10n ** 19n,
  SHANKHA: 10n ** 17n,
  PADMA: 10n ** 15n,
  NEEL: 10n ** 13n,
  KHARAB: 10n ** 11n,
  ARAB: 10n ** 9n,
  CRORE: 10n ** 7n,
  LAKH: 10n ** 5n,
  THOUSAND: 10n ** 3n,
  HUNDRED: 10n ** 2n,
} as const);

function freezeScale(scale: NumberScale): Readonly<NumberScale> {
  return Object.freeze({
    value: scale.value,
    names: Object.freeze({ ...scale.names }),
  });
}

/**
 * baseScaleMappings
 * List of all supported number scales, sorted descending by value.
 * Frozen so consumers cannot mutate the shared converter scale table.
 */
const SCALE_MAPPINGS: readonly NumberScale[] = Object.freeze(
  [
  {
    value: SCALE_VALUES.ADANTA_SINGHAR,
    names: { en: 'adanta singhar', ne: 'अदन्त सिंघर' }
  },
  {
    value: SCALE_VALUES.MAHA_SINGHAR,
    names: { en: 'maha singhar', ne: 'महासिंघर' }
  },
  { 
    value: SCALE_VALUES.SINGHAR,
    names: { en: 'singhar', ne: 'सिंघर' }
  },
  { 
    value: SCALE_VALUES.SHISHANT,
    names: { en: 'shishant', ne: 'शिशान्त' }
  },
  { 
    value: SCALE_VALUES.MAHA_ANT,
    names: { en: 'maha ant', ne: 'महाअन्त' }
  },
  { 
    value: SCALE_VALUES.ANT,
    names: { en: 'ant', ne: 'अन्त' }
  },
  { 
    value: SCALE_VALUES.PARAARDHA,
    names: { en: 'paraardha', ne: 'परार्ध' }
  },
  { 
    value: SCALE_VALUES.MADH,
    names: { en: 'madh', ne: 'मध' }
  },
  { 
    value: SCALE_VALUES.JALD,
    names: { en: 'jald', ne: 'जल्द' }
  },
  { 
    value: SCALE_VALUES.ANK,
    names: { en: 'ank', ne: 'अङ्क' }
  },
  { 
    value: SCALE_VALUES.UDPADH,
    names: { en: 'udpadh', ne: 'उपाध' }
  },
  { value: SCALE_VALUES.SHANKHA, names: { en: 'shankha', ne: 'शंख' }},
  { value: SCALE_VALUES.PADMA, names: { en: 'padma', ne: 'पद्म' }},
  { value: SCALE_VALUES.NEEL, names: { en: 'neel', ne: 'नील' }},
  { value: SCALE_VALUES.KHARAB, names: { en: 'kharab', ne: 'खरब' }},
  { value: SCALE_VALUES.ARAB, names: { en: 'arab', ne: 'अरब' }},
  { value: SCALE_VALUES.CRORE, names: { en: 'crore', ne: 'करोड' }},
  { value: SCALE_VALUES.LAKH, names: { en: 'lakh', ne: 'लाख' }},
  { value: SCALE_VALUES.THOUSAND, names: { en: 'thousand', ne: 'हजार' }},
  { value: SCALE_VALUES.HUNDRED, names: { en: 'hundred', ne: 'सय' }}

  // Ensure correct descending order for BigInt values
  ]
    .sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    })
    .map(freezeScale)
);

export const baseScaleMappings = SCALE_MAPPINGS;

/**
 * Nepali and English scale mappings. Same Indian numbering table; both
 * exports are frozen so a consumer cannot mutate converter state through either name.
 */
export const nepaliScaleMappings = SCALE_MAPPINGS;
export const englishScaleMappings = SCALE_MAPPINGS;
