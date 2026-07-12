import type { CalendarEvent } from "../../src/content/events";

export type SanitizeStats = {
  descriptionsOmitted: number;
  locationsOmitted: number;
};

const LOCATION_ALLOWLIST =
  /igreja|matriz|comunidade|capela|sal[aã]o|col[eé]gio|sagrado\s+cora[cç][aã]o|par[oó]quia|bento\s+gon[cç]alves/i;

const PHONE_KEYWORDS =
  /telefone|contato|celular|whatsapp|fone/i;

const PHONE_PATTERNS = [
  /\+55\s*\d{2}\s*9?\d{4,5}[\s-]?\d{4}/i,
  /\(\d{2}\)\s*9?\d{4,5}[\s-]?\d{4}/,
  /\b\d{2}\s*9\d{4}[\s-]?\d{4}\b/,
  /\b9\d{4}[\s-]?\d{4}\b/,
  /(?<!\d)\d{10,11}(?!\d)/,
];

const ADDRESS_KEYWORDS =
  /\bru[aá]\b|\bavenida\b|\bav\.?\b|\bapto\b|\bapartamento\b|\bap\.?\s+\d|\bresidem\b|\bresidimos\b|\bendere[cç]o\b|\bnosso\s+endere[cç]o\b|\bcep\b|\bprogresso\b|\blinha\s+\d+/i;

const ADDRESS_NUMBER_PATTERNS = [
  /\d{3,5}\/\d{2,4}/,
  /\d{5}-?\d{3}/,
];

const PERSONAL_KEYWORDS =
  /\bnoiva\b|\bnoivo\b|nome\s+completo|documentos|encaminhados/i;

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const WEDDING_TITLE = /^casamento/i;

export function normalizeUnicodeSpaces(value: string): string {
  return value
    .replace(/[\u00a0\u2000-\u200b\u202f\u205f\u3000]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isWeddingTitle(title: string): boolean {
  return WEDDING_TITLE.test(title.trim());
}

function hasPhonePattern(text: string): boolean {
  if (PHONE_KEYWORDS.test(text)) return true;
  return PHONE_PATTERNS.some((pattern) => pattern.test(text));
}

function hasAddressPattern(text: string): boolean {
  if (ADDRESS_KEYWORDS.test(text)) return true;
  return ADDRESS_NUMBER_PATTERNS.some((pattern) => pattern.test(text));
}

export function hasPiiInText(text: string): boolean {
  const normalized = normalizeUnicodeSpaces(text);
  if (!normalized) return false;
  if (hasPhonePattern(normalized)) return true;
  if (hasAddressPattern(normalized)) return true;
  if (PERSONAL_KEYWORDS.test(normalized)) return true;
  if (EMAIL_PATTERN.test(normalized)) return true;
  return false;
}

export function isLocationAllowlisted(location: string): boolean {
  const normalized = normalizeUnicodeSpaces(location);
  return LOCATION_ALLOWLIST.test(normalized);
}

export function normalizeLocation(
  location: string | undefined,
): string | undefined {
  if (!location) return undefined;

  const lines = location
    .split("\n")
    .map((line) => normalizeUnicodeSpaces(line))
    .filter(Boolean);

  if (lines.length === 0) return undefined;

  const firstLine = lines[0];

  if (isLocationAllowlisted(firstLine)) {
    return firstLine;
  }

  if (lines.length === 1 && isLocationAllowlisted(location)) {
    return normalizeUnicodeSpaces(location);
  }

  if (hasAddressPattern(firstLine) && !isLocationAllowlisted(firstLine)) {
    return undefined;
  }

  if (isLocationAllowlisted(normalizeUnicodeSpaces(location))) {
    return normalizeUnicodeSpaces(location);
  }

  if (hasAddressPattern(location)) {
    return undefined;
  }

  return firstLine;
}

function applyLocation(
  event: CalendarEvent,
  location: string | undefined,
  stats: SanitizeStats,
): CalendarEvent {
  if (!location) {
    if (event.location) stats.locationsOmitted += 1;
    const { location: _removed, ...rest } = event;
    return rest;
  }
  return { ...event, location };
}

export function sanitizeCalendarEvent(
  event: CalendarEvent,
  stats: SanitizeStats,
): CalendarEvent {
  let result: CalendarEvent = { ...event };

  const shouldOmitDescription =
    isWeddingTitle(result.title) ||
    !result.description ||
    hasPiiInText(result.description);

  if (shouldOmitDescription) {
    if (result.description) {
      stats.descriptionsOmitted += 1;
      const { description: _removed, ...rest } = result;
      result = rest;
    } else if ("description" in result) {
      const { description: _removed, ...rest } = result;
      result = rest;
    }
  }

  const previousLocation = result.location;
  const normalizedLocation = normalizeLocation(result.location);

  if (previousLocation && !normalizedLocation) {
    stats.locationsOmitted += 1;
  }

  return applyLocation(result, normalizedLocation, stats);
}

export function createSanitizeStats(): SanitizeStats {
  return { descriptionsOmitted: 0, locationsOmitted: 0 };
}
