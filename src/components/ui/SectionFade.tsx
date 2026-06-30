import type { CSSProperties } from "react";

type SectionColor = "background" | "surface" | "muted-bg" | "footer-bg";

const colorVars: Record<SectionColor, string> = {
  background: "var(--background)",
  surface: "var(--surface)",
  "muted-bg": "var(--muted-bg)",
  "footer-bg": "var(--footer-bg)",
};

type SectionFadeProps = {
  from?: SectionColor;
  to?: SectionColor;
  size?: "default" | "sm";
};

export function SectionFade({
  from = "background",
  to = "surface",
  size = "default",
}: SectionFadeProps) {
  return (
    <div
      aria-hidden
      className={size === "sm" ? "section-fade-sm" : "section-fade"}
      style={
        {
          "--section-fade-from": colorVars[from],
          "--section-fade-to": colorVars[to],
        } as CSSProperties
      }
    />
  );
}
