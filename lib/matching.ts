import { CAREERS, Career } from "@/lib/careers";

export interface CareerMatch extends Career {
  score: number;
  matchedValues: string[];
}

export function matchCareers(selectedValues: string[]): CareerMatch[] {
  const uniqueValues = Array.from(new Set(selectedValues)).slice(0, 3);

  const matches = CAREERS.map((career) => {
    const matchedValues = uniqueValues.filter((value) => career.values.includes(value));
    const score = matchedValues.length;

    return { ...career, score, matchedValues };
  })
    .filter((career) => career.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.accessibilityScore !== a.accessibilityScore) {
        return b.accessibilityScore - a.accessibilityScore;
      }
      return a.title.localeCompare(b.title);
    });

  return matches.slice(0, 4);
}

export function formatMoney(value: number): string {
  return `$${Math.round(value / 1000)}K`;
}
