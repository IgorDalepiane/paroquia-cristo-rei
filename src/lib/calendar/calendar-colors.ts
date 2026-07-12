/** Pastel HSL — one per calendar label, no duplicates within the set. */
export function buildCalendarColorMap(labels: string[]): Map<string, string> {
  const unique = [...new Set(labels)].sort();
  const n = unique.length;
  const map = new Map<string, string>();

  unique.forEach((label, i) => {
    const hue = n === 0 ? 0 : Math.round((i * 360) / n);
    map.set(label, `hsl(${hue} 45% 78%)`);
  });

  return map;
}
