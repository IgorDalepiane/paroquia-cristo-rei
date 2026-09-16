type PhotoPlaceholderProps = {
  compact?: boolean;
};

export function PhotoPlaceholder({ compact }: PhotoPlaceholderProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-muted">
      <svg
        className={compact ? "h-7 w-7 opacity-50" : "h-9 w-9 opacity-50"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="11" r="1.5" />
        <path d="M21 17.5 16 13l-3.5 3.5-2-2L3 18" />
      </svg>
      <p
        className={
          compact
            ? "text-[11px] font-medium uppercase tracking-[0.16em]"
            : "text-xs font-medium uppercase tracking-[0.18em] sm:text-sm"
        }
      >
        Foto em construção
      </p>
    </div>
  );
}
