import assert from "node:assert/strict";
import { eventNameFromHref } from "@/lib/analytics";

assert.equal(eventNameFromHref("/festa/bingo", "/festa"), "festa.bingo");
assert.equal(eventNameFromHref("/festa/bingo", "/"), "home.festa.bingo");
assert.equal(
  eventNameFromHref("/comunidades/santa-rita", "/agenda"),
  "agenda.comunidades.santa-rita",
);
assert.equal(
  eventNameFromHref("/comunidades/santa-rita", "/comunidades/santa-rita"),
  "comunidades.santa-rita",
);
assert.equal(
  eventNameFromHref("#comprar", "/festa/bingo"),
  "festa.bingo.comprar",
);
assert.equal(eventNameFromHref("/"), "home");
assert.equal(eventNameFromHref("/galeria", "/"), "home.galeria");
assert.equal(
  eventNameFromHref("/galeria/vitrais", "/"),
  "home.galeria.vitrais",
);
assert.equal(
  eventNameFromHref("https://wa.me/5554996165918", "/festa/bingo"),
  "festa.bingo.whatsapp",
);
console.log("analytics tests passed");
