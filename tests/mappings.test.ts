import { BASE_NUMBERS, createNumberWordMap } from "../src/mappings/numberMappings";
import {
  SCALE_VALUES,
  baseScaleMappings,
  nepaliScaleMappings,
  englishScaleMappings,
} from "../src/mappings/scaleMappings";
import { digitToNepaliWords } from "../src/converters/nepaliConverter";
import { ConverterFactory } from "../src/utils/converterFactory";

describe("BASE_NUMBERS", () => {
  it("looks up the documented 0-99 mappings", () => {
    expect(BASE_NUMBERS.size).toBe(100);
    expect(BASE_NUMBERS.get(0)).toEqual({ en: "zero", ne: "शून्य" });
    expect(BASE_NUMBERS.get(21)).toEqual({ en: "twenty one", ne: "एक्काइस" });
  });

  it("rejects Map mutations", () => {
    const mutable = BASE_NUMBERS as unknown as Map<number, { en: string; ne: string }>;
    expect(() => mutable.set(1, { en: "uno", ne: "एक" })).toThrow(TypeError);
    expect(() => mutable.delete(1)).toThrow(TypeError);
    expect(() => mutable.clear()).toThrow(TypeError);
    expect(BASE_NUMBERS.get(1)).toEqual({ en: "one", ne: "एक" });
  });

  it("freezes nested word objects", () => {
    const mapping = BASE_NUMBERS.get(1)!;
    expect(() => {
      (mapping as { en: string }).en = "uno";
    }).toThrow(TypeError);
    expect(BASE_NUMBERS.get(1)?.en).toBe("one");
  });
});

describe("createNumberWordMap", () => {
  it("returns an independently mutable deep copy", () => {
    const copy = createNumberWordMap();
    const original = BASE_NUMBERS.get(2)!;

    copy.set(2, { en: "dos", ne: "दुई" });
    copy.get(3)!.en = "tres";

    expect(BASE_NUMBERS.get(2)).toEqual(original);
    expect(BASE_NUMBERS.get(3)?.en).toBe("three");
    expect(copy.get(2)?.en).toBe("dos");
    expect(copy.get(3)?.en).toBe("tres");
  });
});

describe("scale mappings", () => {
  it("share one frozen Indian-numbering table", () => {
    expect(nepaliScaleMappings).toBe(baseScaleMappings);
    expect(englishScaleMappings).toBe(baseScaleMappings);
    expect(Object.isFrozen(baseScaleMappings)).toBe(true);
    expect(Object.isFrozen(baseScaleMappings[0])).toBe(true);
    expect(Object.isFrozen(baseScaleMappings[0].names)).toBe(true);
  });

  it("rejects array and nested mutations", () => {
    expect(() => {
      (baseScaleMappings as any).push({
        value: 1n,
        names: { en: "one", ne: "एक" },
      });
    }).toThrow(TypeError);

    expect(() => {
      (baseScaleMappings[0].names as { ne: string }).ne = "changed";
    }).toThrow(TypeError);

    expect(baseScaleMappings[0].names.ne).toBe("अदन्त सिंघर");
  });

  it("freezes SCALE_VALUES", () => {
    expect(Object.isFrozen(SCALE_VALUES)).toBe(true);
    expect(() => {
      (SCALE_VALUES as { LAKH: bigint }).LAKH = 1n;
    }).toThrow(TypeError);
    expect(SCALE_VALUES.LAKH).toBe(10n ** 5n);
  });
});

describe("conversion after attempted table mutation", () => {
  afterEach(() => {
    ConverterFactory.clearInstances();
  });

  it("still converts with the original mappings", () => {
    expect(() =>
      (BASE_NUMBERS as unknown as Map<number, { en: string; ne: string }>).set(1, {
        en: "uno",
        ne: "एक",
      })
    ).toThrow();
    expect(digitToNepaliWords(1)).toBe("एक");
    expect(digitToNepaliWords(100000)).toBe("एक लाख");
  });
});
