"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";
import { StainedGlassPhoto } from "@/components/stained-glass/StainedGlassPhoto";
import type { StainedGlassShot } from "@/content/stained-glass";

type StainedGlassCarouselProps = {
  title: string;
  shots: StainedGlassShot[];
};

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const EXPAND_MS = 520;
const EXPAND_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FRAME_PAD = 6;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wrapIndex(next: number, length: number) {
  return ((next % length) + length) % length;
}

function readRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export function StainedGlassCarousel({
  title,
  shots,
}: StainedGlassCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lightboxRef = useRef(false);
  const ignoreScrollRef = useRef(false);
  const closeTimerRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [origin, setOrigin] = useState<Rect | null>(null);
  const labelId = useId();

  lightboxRef.current = lightbox;

  const scrollToSlide = useCallback(
    (next: number, behavior: ScrollBehavior) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const slide = scroller.children[next];
      if (!(slide instanceof HTMLElement)) return;
      ignoreScrollRef.current = true;
      scroller.scrollTo({ left: slide.offsetLeft, behavior });
      window.setTimeout(
        () => {
          ignoreScrollRef.current = false;
        },
        behavior === "smooth" ? EXPAND_MS : 50,
      );
    },
    [],
  );

  const goTo = useCallback(
    (next: number) => {
      const wrapped = wrapIndex(next, shots.length);
      setIndex(wrapped);
      scrollToSlide(
        wrapped,
        lightboxRef.current || prefersReducedMotion() ? "auto" : "smooth",
      );
    },
    [scrollToSlide, shots.length],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      if (ignoreScrollRef.current || lightboxRef.current) return;
      const slides = [...scroller.children];
      const nearest = slides.reduce(
        (best, slide, slideIndex) => {
          if (!(slide instanceof HTMLElement)) return best;
          const distance = Math.abs(slide.offsetLeft - scroller.scrollLeft);
          return distance < best.distance
            ? { index: slideIndex, distance }
            : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setIndex(nearest.index);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
      }
    };
    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) {
      setExpanded(false);
      return;
    }
    if (prefersReducedMotion()) {
      setExpanded(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setExpanded(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, lightbox]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  const current = shots[index];

  const openLightbox = (shotIndex: number, target: HTMLElement) => {
    const photo = target.querySelector("img") ?? target;
    setOrigin(readRect(photo));
    setIndex(shotIndex);
    setLightbox(true);
  };

  const requestClose = () => {
    const scroller = scrollerRef.current;
    const slide = scroller?.children[index];
    const photo =
      slide instanceof HTMLElement ? slide.querySelector("img") : null;
    if (photo) setOrigin(readRect(photo));
    window.clearTimeout(closeTimerRef.current);
    if (prefersReducedMotion()) {
      setLightbox(false);
      return;
    }
    setExpanded(false);
    closeTimerRef.current = window.setTimeout(() => {
      setLightbox(false);
    }, EXPAND_MS + 80);
  };

  const onExpandTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "width") return;
    if (!expanded) {
      window.clearTimeout(closeTimerRef.current);
      setLightbox(false);
    }
  };

  const imageStyle: CSSProperties = expanded
    ? {
        top: FRAME_PAD,
        left: FRAME_PAD,
        width: `calc(100vw - ${FRAME_PAD * 2}px)`,
        height: `calc(100dvh - ${FRAME_PAD * 2}px)`,
      }
    : origin
      ? {
          top: origin.top,
          left: origin.left,
          width: origin.width,
          height: origin.height,
        }
      : {
          top: FRAME_PAD,
          left: FRAME_PAD,
          width: `calc(100vw - ${FRAME_PAD * 2}px)`,
          height: `calc(100dvh - ${FRAME_PAD * 2}px)`,
        };

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-2xl bg-foreground"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
      >
        <p id={labelId} className="sr-only">
          Fotos do vitral {title}
        </p>
        <ul
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, shotIndex) => (
            <li
              key={shot.id}
              className="h-[26rem] w-full shrink-0 snap-start overflow-hidden sm:h-[32rem] md:h-[36rem]"
            >
              <button
                type="button"
                className="relative h-full w-full cursor-zoom-in overflow-hidden"
                aria-label={`Ampliar foto ${shotIndex + 1} de ${shots.length}`}
                onClick={(event) =>
                  openLightbox(shotIndex, event.currentTarget)
                }
              >
                <span className="absolute inset-1.5 overflow-hidden">
                  <StainedGlassPhoto
                    shot={shot}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {shots.length > 1 ? (
          <CarouselArrows
            onPrev={() => goTo(index - 1)}
            onNext={() => goTo(index + 1)}
          />
        ) : null}
      </div>

      <div className="flex justify-center gap-1.5" aria-label="Fotos">
        {shots.map((shot, shotIndex) => (
          <button
            key={shot.id}
            type="button"
            aria-current={shotIndex === index ? "true" : undefined}
            aria-label={`Foto ${shotIndex + 1} de ${shots.length}`}
            className={`h-2.5 rounded-full transition-all ${
              shotIndex === index
                ? "w-6 bg-accent"
                : "w-2.5 bg-border hover:bg-muted"
            }`}
            onClick={() => goTo(shotIndex)}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          requestClose();
        }}
        onClose={() => setLightbox(false)}
        className="fixed inset-0 m-0 hidden h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-0 open:flex"
        aria-label={`Foto ampliada do vitral ${title}`}
      >
        {lightbox && current ? (
          <div className="relative h-full min-h-0 w-full flex-1">
            <div
              className="absolute inset-0 bg-black"
              style={{
                opacity: expanded ? 1 : 0,
                transition: prefersReducedMotion()
                  ? "none"
                  : `opacity ${EXPAND_MS}ms ${EXPAND_EASE}`,
              }}
            />
            <div
              className="pointer-events-none absolute z-0 overflow-hidden"
              style={{
                ...imageStyle,
                transition: prefersReducedMotion()
                  ? "none"
                  : `top ${EXPAND_MS}ms ${EXPAND_EASE}, left ${EXPAND_MS}ms ${EXPAND_EASE}, width ${EXPAND_MS}ms ${EXPAND_EASE}, height ${EXPAND_MS}ms ${EXPAND_EASE}`,
              }}
              onTransitionEnd={onExpandTransitionEnd}
            >
              <StainedGlassPhoto shot={current} sizes="100vw" priority />
            </div>
            <button
              type="button"
              onClick={requestClose}
              className={`absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white text-foreground shadow-md transition-opacity ${
                expanded ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-label="Fechar"
            >
              <span aria-hidden className="text-3xl leading-none">
                ×
              </span>
            </button>
            {shots.length > 1 ? (
              <div
                className={`pointer-events-none absolute inset-0 z-40 ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <CarouselArrows
                  overlay
                  onPrev={() => goTo(index - 1)}
                  onNext={() => goTo(index + 1)}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function CarouselArrows({
  onPrev,
  onNext,
  overlay = false,
}: {
  onPrev: () => void;
  onNext: () => void;
  overlay?: boolean;
}) {
  const buttonClass = overlay
    ? "pointer-events-auto absolute top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-white text-foreground shadow-md"
    : "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm";

  return (
    <>
      <button
        type="button"
        className={`${buttonClass} left-[max(0.5rem,env(safe-area-inset-left))]`}
        aria-label="Foto anterior"
        onClick={onPrev}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        className={`${buttonClass} right-[max(0.5rem,env(safe-area-inset-right))]`}
        aria-label="Próxima foto"
        onClick={onNext}
      >
        <Chevron direction="right" />
      </button>
    </>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
