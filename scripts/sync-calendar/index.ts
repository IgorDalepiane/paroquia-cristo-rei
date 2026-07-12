import { readCalendarUrls } from "./config";
import { fetchIcal } from "./fetch-ical";
import { loadLocalEnv } from "./load-env";
import {
  normalizeEvents,
  trimCalendarEvent,
  trimCalendarSources,
} from "./normalize";
import { buildSources, parseFeed, readCalendarLabel } from "./parse-ical";
import { createSanitizeStats, sanitizeCalendarEvent } from "./sanitize-pii";
import { slugify } from "./slugify";
import { writeGeneratedFile } from "./write-output";

async function main(): Promise<void> {
  loadLocalEnv();
  const urls = readCalendarUrls();
  const now = new Date();

  const feedMeta: Array<{ label: string; slug: string }> = [];
  const allEvents = [];

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    let body: string;
    try {
      body = await fetchIcal(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(
        `Failed to fetch calendar ${i + 1}/${urls.length}: ${message}`,
      );
      process.exit(1);
    }

    const label = readCalendarLabel(body, `Calendário ${i + 1}`);
    const slug = slugify(label) || `calendario-${i + 1}`;
    feedMeta.push({ label, slug });

    const events = parseFeed(body, slug, label, now);
    allEvents.push(...events);
  }

  const sources = trimCalendarSources(buildSources(feedMeta));
  const slugByLabel = new Map(sources.map((s) => [s.label, s.slug]));
  const stats = createSanitizeStats();

  const events = normalizeEvents(
    allEvents
      .map((event) => ({
        ...event,
        calendarSlug:
          slugByLabel.get(event.calendarLabel) ?? event.calendarSlug,
      }))
      .map(trimCalendarEvent)
      .map((event) => sanitizeCalendarEvent(event, stats)),
  );

  writeGeneratedFile(sources, events, now.toISOString());
  console.log(
    `Synced ${events.length} events from ${sources.length} calendar(s).`,
  );
  console.log(
    `Sanitized: ${stats.descriptionsOmitted} descriptions omitted, ${stats.locationsOmitted} locations omitted`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
