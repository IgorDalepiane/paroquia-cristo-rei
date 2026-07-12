const ENV_KEY = "AGENDA_ICAL_URLS_JSON_ARRAY";

export function readCalendarUrls(): string[] {
  const raw = process.env[ENV_KEY];
  if (!raw) {
    console.error(
      `Missing ${ENV_KEY}. Copy .env.example to .env.local for local sync, or set the GitHub repository variable in CI.`,
    );
    process.exit(1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error(`${ENV_KEY} must be valid JSON (array of URL strings).`);
    process.exit(1);
  }

  if (!Array.isArray(parsed)) {
    console.error(`${ENV_KEY} must be a JSON array.`);
    process.exit(1);
  }

  const urls = parsed.filter(
    (item): item is string => typeof item === "string",
  );
  if (urls.length !== parsed.length) {
    console.error(`${ENV_KEY} must contain only URL strings.`);
    process.exit(1);
  }

  return urls;
}
