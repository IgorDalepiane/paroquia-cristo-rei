export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function dedupeSlugs(labels: string[]): Map<string, string> {
  const map = new Map<string, string>();
  const used = new Set<string>();

  for (const label of labels) {
    let slug = slugify(label);
    if (!slug) slug = "calendario";

    let candidate = slug;
    let suffix = 2;
    while (used.has(candidate)) {
      candidate = `${slug}-${suffix}`;
      suffix += 1;
    }

    used.add(candidate);
    map.set(label, candidate);
  }

  return map;
}
