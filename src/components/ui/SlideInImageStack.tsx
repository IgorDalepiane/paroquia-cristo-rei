"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SlideInImage = {
  src?: string;
  alt: string;
};

type SlideInImageStackProps = {
  images: SlideInImage[];
  className?: string;
};

export function SlideInImageStack({
  images,
  className = "",
}: SlideInImageStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative h-[420px] w-full max-w-lg ${className}`}
    >
      {images.map((image, index) => {
        const offset = index * 48;
        const zIndex = images.length - index;
        return (
          <div
            key={image.alt}
            className={`absolute overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
            style={{
              top: `${index * 24}px`,
              left: `${offset}px`,
              width: "calc(100% - 3rem)",
              height: "280px",
              zIndex,
              transitionDelay: `${index * 120}ms`,
            }}
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            ) : (
              <div
                className="placeholder-photo h-full w-full"
                aria-label={image.alt}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
