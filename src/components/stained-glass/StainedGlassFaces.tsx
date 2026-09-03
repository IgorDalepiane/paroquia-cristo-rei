"use client";

import Image from "next/image";
import { jumpToVitral } from "@/components/stained-glass/StainedGlassIndex";
import { stainedGlassFaces } from "@/content/stained-glass";

export function StainedGlassFaces() {
  return (
    <section
      id="rosto-de-jesus"
      aria-labelledby="rosto-de-jesus-title"
      className="scroll-mt-28 border-t border-border pt-14 md:pt-20"
    >
      <h2
        id="rosto-de-jesus-title"
        className="font-display normal-case text-3xl text-foreground md:text-4xl"
      >
        Rosto de Jesus
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Detalhes do rosto de Jesus em cada vitral da matriz — não é uma obra à
        parte, e sim o mesmo Cristo visto de perto nas janelas.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {stainedGlassFaces.map((face) => (
          <li key={face.slug}>
            <a
              href={`#${face.slug}`}
              onClick={(event) => jumpToVitral(event, face.slug)}
              className="group block overflow-hidden rounded-2xl bg-foreground"
            >
              <span className="relative block aspect-[3/4]">
                <Image
                  src={face.src}
                  alt={`Rosto de Jesus no vitral ${face.title}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </span>
              <span className="block bg-foreground px-3 py-2 text-sm text-white/85 group-hover:text-accent-gold">
                {face.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
