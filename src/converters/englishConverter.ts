const units = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];
const scales = ["", "Thousand", "Million", "Billion"];

export const digitToEnglishWords = (num: number | string | bigint): string => {
  const bigNum = BigInt(num);
  
  if (bigNum < 0n) {
    throw new Error("Input must contain only valid digits");
  }

  if (bigNum === 0n) return "Zero";

  const convertChunk = (n: number): string => {
    let words = "";
    if (n > 99) {
      words += `${units[Math.floor(n / 100)]} Hundred `;
      n %= 100;
    }
    if (n > 19) {
      words += `${tens[Math.floor(n / 10)]} `;
      n %= 10;
    }
    if (n > 0) {
      words += `${n < 10 ? units[n] : teens[n - 10]} `;
    }
    return words.trim();
  };

  const chunks: string[] = [];
  let scaleIndex = 0;
  let remaining = bigNum;

  while (remaining > 0n) {
    const chunk = Number(remaining % 1000n);
    if (chunk > 0) {
      chunks.unshift(`${convertChunk(chunk)} ${scales[scaleIndex]}`.trim());
    }
    remaining = remaining / 1000n;
    scaleIndex++;
  }

  return chunks.join(", ");
};
