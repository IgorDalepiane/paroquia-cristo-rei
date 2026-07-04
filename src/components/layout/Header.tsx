"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoBrandText, LogoIcon } from "@/components/layout/LogoBrand";
import { navItems, siteConfig } from "@/content/site";
import { useCompactNav } from "@/hooks/useCompactNav";

const mainNavItems = navItems.filter((item) => item.href !== "/contato");

const navLinkClass = (active: boolean) =>
  `rounded-full px-3 py-2 text-base font-medium transition-colors xl:px-4 xl:text-[1.05rem] ${
    active ? "text-accent" : "text-foreground/70 hover:text-foreground"
  }`;

function MobileNav({
  id,
  open,
  onClose,
  className = "",
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <nav
      id={id}
      className={`border-t border-border bg-white px-6 py-4 lg:hidden ${className}`}
      aria-label="Principal mobile"
    >
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-muted-bg"
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const compact = useCompactNav();

  const closeMenu = () => setOpen(false);

  const navLinks = mainNavItems.map((item) => {
    const active =
      pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link key={item.href} href={item.href} className={navLinkClass(active)}>
        {item.label}
      </Link>
    );
  });

  const contatoButton = (
    <Link
      href="/contato"
      className="rounded-full bg-accent px-5 py-2 text-base font-medium text-white transition-colors hover:bg-accent-light xl:text-[1.05rem]"
    >
      Contato
    </Link>
  );

  const hamburger = (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-border p-2.5 text-foreground lg:hidden"
      aria-expanded={open}
      aria-controls={compact ? "mobile-nav-compact" : "mobile-nav-tall"}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      onClick={() => setOpen((v) => !v)}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        {open ? (
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );

  const tallLogo = (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-3"
      onClick={closeMenu}
      aria-label={siteConfig.name}
    >
      <LogoIcon size={52} priority />
      <LogoBrandText size="md" />
    </Link>
  );

  const compactLogo = (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      onClick={closeMenu}
      aria-label={siteConfig.name}
    >
      <LogoIcon size={40} priority />
    </Link>
  );

  return (
    <>
      <header className="relative border-b border-border/60 bg-white">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-7 lg:px-8 lg:py-9">
          {tallLogo}
          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center gap-1" aria-label="Principal">
              {navLinks}
            </nav>
            <span className="ml-2">{contatoButton}</span>
          </div>
          {hamburger}
        </div>
        {!compact ? (
          <MobileNav id="mobile-nav-tall" open={open} onClose={closeMenu} />
        ) : null}
      </header>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white shadow-[0_1px_0_rgb(0_0_0/0.04),0_8px_24px_rgb(0_0_0/0.04)] transition-opacity duration-200 ${
          compact
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!compact}
      >
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3 lg:px-8">
          <div className="justify-self-start">{compactLogo}</div>
          <nav
            className="hidden items-center gap-1 justify-self-center lg:flex"
            aria-label="Principal compacto"
          >
            {navLinks}
          </nav>
          <div className="flex items-center justify-end gap-2 justify-self-end">
            <span className="hidden lg:inline-flex">{contatoButton}</span>
            {hamburger}
          </div>
        </div>
        {compact ? (
          <MobileNav id="mobile-nav-compact" open={open} onClose={closeMenu} />
        ) : null}
      </header>
    </>
  );
}
