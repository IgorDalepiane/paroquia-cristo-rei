import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compareCalendarEvents, normalizeEvents } from "./normalize";
import { parseFeed, stableEventId } from "./parse-ical";
import { dayKeyInParish } from "./parish-time";

const FIXTURE_PATH = resolve(
  import.meta.dirname,
  "__fixtures__/sample.ics",
);
const FIXED_NOW = new Date("2026-07-12T12:00:00.000Z");
const SLUG = "fixture-calendar";
const LABEL = "Fixture Calendar";

function loadFixture(): string {
  return readFileSync(FIXTURE_PATH, "utf8");
}

function reverseVeventBlocks(body: string): string {
  const headerEnd = body.indexOf("BEGIN:VEVENT");
  const footerStart = body.lastIndexOf("END:VCALENDAR");
  if (headerEnd === -1 || footerStart === -1) return body;

  const header = body.slice(0, headerEnd);
  const footer = body.slice(footerStart);
  const eventSection = body.slice(headerEnd, footerStart).trim();
  const blocks = eventSection
    .split(/(?=BEGIN:VEVENT)/)
    .map((block) => block.trim())
    .filter(Boolean);

  return `${header}${blocks.reverse().join("\n")}\n${footer}`;
}

function parseNormalized(body: string) {
  return normalizeEvents(parseFeed(body, SLUG, LABEL, FIXED_NOW));
}

function main(): void {
  const fixture = loadFixture();
  const reversed = reverseVeventBlocks(fixture);

  const runA = parseNormalized(fixture);
  const runB = parseNormalized(fixture);
  assert.equal(
    JSON.stringify(runA),
    JSON.stringify(runB),
    "parseFeed + normalizeEvents should be identical across two runs",
  );

  const runReversed = parseNormalized(reversed);
  assert.equal(
    JSON.stringify(runA),
    JSON.stringify(runReversed),
    "shuffled VEVENT order should not change normalized output",
  );

  const tied = runA.filter((event) => event.start === "2026-07-20T15:00:00.000Z");
  assert.equal(tied.length, 2, "fixture should include two tied-start events");
  assert.deepEqual(
    tied.map((event) => event.title),
    ["Alpha Event", "Bravo Event"],
    "tied events should sort by title after start",
  );
  assert.ok(
    compareCalendarEvents(tied[0], tied[1]) < 0,
    "compareCalendarEvents should order Alpha before Bravo",
  );

  const recurringTuesday = runA.find(
    (event) =>
      event.title === "Recurring Mass" &&
      event.start === "2026-07-14T21:00:00.000Z",
  );
  assert.ok(recurringTuesday, "recurring fixture should expand first Tuesday");

  const recurringIdAt2100 = recurringTuesday.id;
  const recurringIdAt2000 = stableEventId(
    "recurring-mass@fixture",
    SLUG,
    new Date("2026-07-14T20:00:00.000Z"),
    true,
  );
  const recurringIdNextDay = stableEventId(
    "recurring-mass@fixture",
    SLUG,
    new Date("2026-07-15T21:00:00.000Z"),
    true,
  );

  assert.equal(
    recurringIdAt2100,
    recurringIdAt2000,
    "recurring id should be stable when time changes on the same parish day",
  );
  assert.notEqual(
    recurringIdAt2100,
    recurringIdNextDay,
    "recurring id should change when parish date changes",
  );

  const oneOff = runA.find((event) => event.title === "Alpha Event");
  assert.ok(oneOff, "fixture should include one-off Alpha Event");

  const oneOffIdOriginal = oneOff.id;
  const oneOffIdMovedTime = stableEventId(
    "oneoff-alpha@fixture",
    SLUG,
    new Date("2026-07-20T18:30:00.000Z"),
    false,
  );
  assert.equal(
    oneOffIdOriginal,
    oneOffIdMovedTime,
    "one-off id should be stable when start time changes",
  );

  assert.equal(
    dayKeyInParish(new Date("2026-07-14T20:00:00.000Z")),
    dayKeyInParish(new Date("2026-07-14T23:00:00.000Z")),
    "parish day key should match for same calendar day",
  );

  console.log("sync-calendar tests passed");
}

main();
