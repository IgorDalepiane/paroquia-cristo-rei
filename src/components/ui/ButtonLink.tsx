import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "secondary" | "text";
  className?: string;
};

const baseClass =
  "inline-flex items-center justify-center text-sm font-medium transition-colors";

const variants = {
  primary:
    "rounded-full px-6 py-2.5 tracking-wide uppercase bg-accent text-white hover:bg-accent-light border border-transparent",
  outline:
    "rounded-full px-6 py-2.5 tracking-wide uppercase border border-accent text-accent hover:bg-accent/5",
  ghost:
    "rounded-full px-6 py-2.5 tracking-wide uppercase text-accent hover:text-accent-light underline-offset-4 hover:underline",
  secondary:
    "rounded-full px-6 py-2.5 tracking-wide uppercase bg-muted-bg text-foreground border border-border hover:border-accent/30 hover:text-accent",
  text: "text-foreground/80 hover:text-accent px-0 py-0 font-normal normal-case tracking-normal",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
