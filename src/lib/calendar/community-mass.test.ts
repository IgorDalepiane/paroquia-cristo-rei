import assert from "node:assert/strict";
import { COMMUNITY_MASS_ALIASES } from "@/content/community-mass-aliases";
import { getCommunityLocation } from "@/content/community-locations";
import { getCommunityHeroPhoto } from "@/content/community-photos";
import { communities, LEGACY_COMMUNITY_SLUGS } from "@/content/communities";
import type { CalendarEvent } from "@/content/events";
import { calendarEvents } from "@/content/events.generated";
import {
  getCommunityHrefForEventTitle,
  getCommunityHrefForMassTitle,
  getCommunityWeeklySchedule,
  getMatrizWeeklySchedule,
  isMatrizCristoReiNovena,
  matchCommunityMassAlias,
  MATRIZ_COMMUNITY_SLUG,
  MATRIZ_MASS_TITLE,
} from "@/lib/calendar/community-mass";

const FIXED_NOW = new Date("2026-09-02T12:00:00.000-03:00");

function event(title: string, start: string, allDay = false): CalendarEvent {
  return {
    id: title + start,
    calendarSlug: "agenda-paroquial",
    calendarLabel: "Agenda Paroquial",
    title,
    start,
    end: null,
    allDay,
  };
}

function main(): void {
  assert.equal(new Set(communities.map((c) => c.slug)).size, 24);
  assert.equal(LEGACY_COMMUNITY_SLUGS["comunidade-01"], "igreja-matriz");
  assert.equal(LEGACY_COMMUNITY_SLUGS["comunidade-07"], "santa-rita");
  assert.equal(LEGACY_COMMUNITY_SLUGS["comunidade-18"], "almas-do-purgatorio");

  assert.equal(
    matchCommunityMassAlias("Missa Com. Santa Rita")?.slug,
    "santa-rita",
  );
  assert.equal(
    getCommunityHrefForMassTitle("Missa Com. Santa Rita"),
    "/comunidades/santa-rita",
  );

  assert.equal(
    matchCommunityMassAlias("Missa Novena Com. São Bento")?.slug,
    "sao-bento",
  );
  assert.equal(
    matchCommunityMassAlias("Missa Festiva Com. Santo Expedito")?.slug,
    "santo-expedito",
  );
  assert.equal(
    matchCommunityMassAlias("Missa Com. Matriz Cristo Rei com CRISMA")?.slug,
    MATRIZ_COMMUNITY_SLUG,
  );
  assert.equal(
    matchCommunityMassAlias(
      "Missa Ação de Graças da 80ª Festa de Cristo Rei - Com. Matriz",
    )?.slug,
    MATRIZ_COMMUNITY_SLUG,
  );

  assert.equal(
    matchCommunityMassAlias("Missa Com. São José (Garibaldina)")?.slug,
    "sao-jose-gruta-da-garibaldina",
  );
  assert.equal(
    matchCommunityMassAlias("Missa Com. São José (Sertorina)")?.slug,
    "sao-jose-sertorina",
  );

  assert.equal(
    matchCommunityMassAlias("Missa Com. N. Sra. de Fátima")?.slug,
    "nossa-senhora-de-fatima",
  );
  assert.equal(
    matchCommunityMassAlias("Missa Com. N. Sra. Fátima")?.slug,
    "nossa-senhora-de-fatima",
  );

  assert.equal(
    getCommunityHrefForMassTitle(
      "Missa no Colégio Sagrado Coração de Jesus (Pe. Roberto)",
    ),
    undefined,
  );
  assert.equal(
    getCommunityHrefForMassTitle("Missa UPA (Secretaria da Saúde)"),
    undefined,
  );
  assert.equal(
    getCommunityHrefForMassTitle(
      "1º Dia do Tríduo Missa 80ª Festa de Cristo Rei - Com. Matriz",
    ),
    undefined,
  );

  const padroeiroHrefs: Record<string, string | undefined> = {
    "Visita do Padroeiro - Comunidade das Almas do Purgatório":
      "/comunidades/almas-do-purgatorio",
    "Visita do Padroeiro - Comunidade Santa Helena":
      "/comunidades/santa-helena",
    "Visita do Padroeiro - Comunidade São Carlos": "/comunidades/sao-carlos",
    "Missa e Visita do Padroeiro - Comunidade São José – Sertorina":
      "/comunidades/sao-jose-sertorina",
    "Visita do Padroeiro - Nossa Senhora da Glória – 40 da Leopoldina":
      "/comunidades/nossa-senhora-da-gloria-40-da-leopoldina",
    "Visita do Padroeiro - Comunidade Sagrado Coração de Jesus – Municipal":
      "/comunidades/sagrado-coracao-de-jesus-municipal",
    "Visita do Padroeiro - Comunidade Nossa Senhora de Lourdes – Ceará":
      "/comunidades/nossa-senhora-de-lourdes-ceara",
    "Visita do Padroeiro - UPA – Hospital Galassi": undefined,
    "Visita do Padroeiro - Visita à Paróquia Santo Antônio": undefined,
    "Visita do Padroeiro - Cavalgada de Cristo Rei ABCTG": undefined,
    "Visita do Padroeiro - Vilarejo Integração": undefined,
    "Visita do Padroeiro - Cáritas Paroquial Cristo Rei": undefined,
    "Visita do Padroeiro - Escola ABRACAI – Sinara": undefined,
    "Visita do Padroeiro - Hospital Tacchini": undefined,
  };

  const padroeiroTitles = [
    ...new Set(
      calendarEvents
        .map((item) => item.title)
        .filter((title) => title.includes("Visita do Padroeiro")),
    ),
  ].sort();
  assert.deepEqual(
    Object.fromEntries(
      padroeiroTitles.map((title) => [
        title,
        getCommunityHrefForEventTitle(title),
      ]),
    ),
    Object.fromEntries(
      padroeiroTitles.map((title) => [title, padroeiroHrefs[title]]),
    ),
    "padroeiro visit → community href map is stale",
  );
  assert.equal(
    getCommunityHrefForEventTitle("Missa Com. Santa Rita"),
    "/comunidades/santa-rita",
  );

  const weekly = getCommunityWeeklySchedule(
    [
      event("Missa Com. Santa Rita", "2026-09-06T22:30:00.000Z"),
      event("Missa Com. Santa Rita", "2026-09-13T22:30:00.000Z"),
      event("Missa Com. Santa Rita", "2026-10-04T22:30:00.000Z"),
      event("Missa Festiva Com. Santo Expedito", "2026-09-06T22:30:00.000Z"),
      event(
        "Missa Com. Matriz Cristo Rei com CRISMA",
        "2026-09-06T21:00:00.000Z",
      ),
      event(MATRIZ_MASS_TITLE, "2026-09-06T21:00:00.000Z"),
      event(MATRIZ_MASS_TITLE, "2026-09-06T11:00:00.000Z"),
    ],
    "santa-rita",
    FIXED_NOW,
  );
  assert.deepEqual(weekly, [
    { day: "Domingo, 6 de Setembro", times: ["19h30"] },
    { day: "Domingo, 13 de Setembro", times: ["19h30"] },
  ]);

  const matrizWeekly = getMatrizWeeklySchedule(
    [
      event(MATRIZ_MASS_TITLE, "2026-09-06T21:00:00.000Z"),
      event(MATRIZ_MASS_TITLE, "2026-09-06T11:00:00.000Z"),
      event(MATRIZ_MASS_TITLE, "2026-09-09T21:00:00.000Z"),
      event(
        "Missa Com. Matriz Cristo Rei com CRISMA",
        "2026-09-06T22:00:00.000Z",
      ),
    ],
    FIXED_NOW,
  );
  assert.deepEqual(matrizWeekly, [
    { day: "Domingo, 6 de Setembro", times: ["8h", "18h"] },
    { day: "Quarta-feira, 9 de Setembro", times: ["18h"] },
  ]);

  assert.equal(
    isMatrizCristoReiNovena("Missa 2º Domingo Novena Cristo Rei - Com. Matriz"),
    true,
  );
  assert.equal(isMatrizCristoReiNovena("Missa Novena Com. São Bento"), false);

  const matrizWithNovena = getMatrizWeeklySchedule(
    [
      event(MATRIZ_MASS_TITLE, "2026-09-20T11:00:00.000Z"),
      event(
        "Missa 1º Domingo Novena Cristo Rei - Com. Matriz",
        "2026-09-20T21:00:00.000Z",
      ),
      event("Missa Novena Com. São Bento", "2026-09-20T21:00:00.000Z"),
      event(MATRIZ_MASS_TITLE, "2026-09-20T21:00:00.000Z"),
    ],
    new Date("2026-09-15T12:00:00.000-03:00"),
  );
  assert.deepEqual(matrizWithNovena, [
    { day: "Domingo, 20 de Setembro", times: ["8h", "18h (Novena)"] },
  ]);

  const weeklySlugs = new Set(
    COMMUNITY_MASS_ALIASES.filter((alias) => alias.weekly).map(
      (alias) => alias.slug,
    ),
  );
  for (const community of communities) {
    assert.ok(
      weeklySlugs.has(community.slug),
      `missing weekly alias for ${community.slug}`,
    );
    assert.ok(
      getCommunityLocation(community.slug),
      `missing address for ${community.slug}`,
    );
  }

  assert.equal(
    getCommunityLocation("santa-rita")?.areaLine,
    "Bairro Santa Rita",
  );
  assert.equal(
    getCommunityLocation("sao-pedro")?.areaLine,
    "Vale dos Vinhedos",
  );
  assert.equal(getCommunityLocation("igreja-matriz")?.areaLine, "Cidade Alta");

  assert.equal(
    getCommunityHeroPhoto("sao-bento")?.src,
    "/images/comunidades/sao-bento.webp",
  );
  assert.equal(
    getCommunityHeroPhoto("sao-bento")?.cardSrc,
    "/images/comunidades/sao-bento.card.webp",
  );
  assert.equal(
    getCommunityHeroPhoto("igreja-matriz")?.src,
    "/images/comunidades/igreja-matriz.webp",
  );
  assert.equal(getCommunityHeroPhoto("igreja-matriz")?.orientation, "portrait");
  assert.equal(
    getCommunityHeroPhoto("nossa-senhora-de-pompeia")?.orientation,
    "portrait",
  );
  assert.equal(
    getCommunityHeroPhoto("almas-do-purgatorio")?.orientation,
    "portrait",
  );
  assert.equal(getCommunityHeroPhoto("sao-bento")?.orientation, "landscape");
  assert.equal(getCommunityHeroPhoto("sao-carlos")?.orientation, "portrait");
  assert.equal(
    getCommunityHeroPhoto("nossa-senhora-de-fatima")?.orientation,
    "portrait",
  );
  assert.equal(
    getCommunityHeroPhoto("nossa-senhora-aparecida")?.orientation,
    "landscape",
  );
  assert.equal(getCommunityHeroPhoto("sao-pedro")?.orientation, "portrait");
  assert.equal(getCommunityHeroPhoto("santa-helena")?.orientation, "landscape");
  assert.equal(
    getCommunityHeroPhoto("sagrado-coracao-de-jesus-municipal")?.orientation,
    "portrait",
  );
  assert.equal(getCommunityHeroPhoto("santa-marta")?.orientation, "portrait");
  assert.equal(
    getCommunityHeroPhoto("nossa-senhora-de-lourdes-ceara")?.src,
    "/images/comunidades/nossa-senhora-de-lourdes-ceara.webp",
  );

  assert.equal(
    getCommunityLocation("sao-carlos")?.street,
    "Rua Elói Seccondo, 78",
  );
  assert.equal(
    getCommunityLocation("sao-carlos")?.areaLine,
    "Bairro Conceição",
  );
  assert.equal(
    getCommunityLocation("sao-carlos")?.mapsUrl,
    "https://maps.app.goo.gl/K5oCfDXwDy1hHoWf8",
  );
  assert.equal(
    getCommunityLocation("nossa-senhora-de-caravaggio")?.mapsUrl,
    "https://maps.app.goo.gl/LudFCiLRPTshczKd6",
  );
  assert.equal(
    getCommunityLocation("nossa-senhora-de-lourdes-ceara")?.mapsUrl,
    "https://maps.app.goo.gl/K3EErFerSovZvSEk9",
  );

  const unmatchedCom = [
    ...new Set(
      calendarEvents
        .map((item) => item.title)
        .filter((title) => title.startsWith("Missa Com.")),
    ),
  ].filter((title) => !matchCommunityMassAlias(title));
  assert.deepEqual(
    unmatchedCom,
    [],
    `unmapped Missa Com. titles: ${unmatchedCom.join("; ")}`,
  );

  console.log("community-mass tests passed");
}

main();
