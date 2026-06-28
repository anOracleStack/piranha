"use client";

import { type MouseEvent, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useZipper } from "@/contexts/ZipperContext";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  href: string;
};

/**
 * Drop-in replacement for next/link that triggers the zipper page transition
 * instead of navigating immediately.
 */
export default function TransitionLink({
  href,
  onClick,
  ...props
}: Props) {
  const { phase, trigger } = useZipper();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Allow modifier keys (open in new tab, etc.) to pass through normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      onClick?.(e);
      return;
    }
    // Skip external links
    if (href.startsWith("http")) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    trigger(href);
  }

  // If context is unavailable (e.g. during SSR or outside provider), fall back to Link
  if (phase === undefined) {
    return (
      <Link href={href} onClick={onClick} {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch
      {...props}
    >
      {props.children}
    </Link>
  );
}
