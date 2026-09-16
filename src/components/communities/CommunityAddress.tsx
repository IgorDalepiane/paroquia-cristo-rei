import { MapPinIcon } from "@/components/ui/BrandIcons";
import { getCommunityLocation } from "@/content/community-locations";

type CommunityAddressProps = {
  slug: string;
};

export function CommunityAddress({ slug }: CommunityAddressProps) {
  const location = getCommunityLocation(slug);
  if (!location) return null;

  return (
    <section className="mt-12 border-t border-border pt-12">
      <h2 className="mb-4 font-display normal-case text-2xl text-foreground">
        Endereço
      </h2>
      <address className="not-italic space-y-2 text-muted">
        <p>{location.street}</p>
        <p>{location.areaLine}</p>
        <p>{location.locality}</p>
        {location.postal ? <p>{location.postal}</p> : null}
      </address>
      <a
        href={location.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-track={`comunidades.${slug}.maps`}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-accent-light"
      >
        <MapPinIcon />
        Ver no Maps
      </a>
    </section>
  );
}
