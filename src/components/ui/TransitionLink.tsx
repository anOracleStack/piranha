"use client";

import { type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useZipper } from "@/contexts/ZipperContext";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  title?: string;
}

/**
 * Drop-in replacement for next/link that triggers the zipper page transition
 * instead of navigating immediately.
 */
export default function TransitionLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
  title,
}: Props) {
  const { phase, trigger } = useZipper();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Allow modifier keys (open in new tab, etc.) to pass through normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // Skip external links
    if (href.startsWith("http")) return;

    e.preventDefault();
    trigger(href);
  }

  // If context is unavailable (e.g. during SSR or outside provider), fall back to Link
  if (phase === undefined) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      onClick={handleClick}
      prefetch
    >
      {children}
    </Link>
  );
}
