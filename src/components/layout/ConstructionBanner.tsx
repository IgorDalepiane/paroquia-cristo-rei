function WarningIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 md:h-7 md:w-7"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConstructionBanner() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-amber-700/30 bg-amber-500 px-5 py-3.5 text-white shadow-[0_-4px_24px_rgb(0_0_0/0.15)] md:py-4"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-center text-base leading-snug font-medium md:gap-3.5 md:text-lg">
        <WarningIcon />
        <p>
          <span className="font-bold">Site em construção.</span> As informações exibidas podem não
          estar corretas.
        </p>
      </div>
    </div>
  );
}
