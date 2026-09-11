"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { festaBingo } from "@/content/festa-bingo";

export function BingoTicketLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const ticket = festaBingo.ticket;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <figure>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full cursor-zoom-in"
          aria-label="Ampliar ingresso"
        >
          <Image
            src={ticket.src}
            alt={ticket.alt}
            width={1800}
            height={1075}
            priority
            className="h-auto w-full"
            sizes="(min-width: 768px) 48rem, 100vw"
          />
        </button>
      </figure>

      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 hidden h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-black p-0 open:flex"
        aria-label="Ingresso ampliado"
      >
        {open ? (
          <div className="relative h-full min-h-0 w-full flex-1">
            <button
              type="button"
              className="absolute inset-0 z-10 cursor-zoom-out"
              tabIndex={-1}
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <div className="pointer-events-none absolute inset-4 md:inset-8">
              <Image
                src={ticket.src}
                alt={ticket.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-50 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white text-foreground shadow-md sm:top-4 sm:right-4"
              aria-label="Fechar"
            >
              <span aria-hidden className="text-3xl leading-none">
                ×
              </span>
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
