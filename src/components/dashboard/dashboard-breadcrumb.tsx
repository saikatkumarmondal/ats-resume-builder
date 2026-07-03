"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

function toTitleCase(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
      <Link href="/dashboard" className="hover:text-foreground">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <Fragment key={href}>
            <ChevronRight className="size-3.5" />
            {isLast ? (
              <span className="font-medium text-foreground">
                {toTitleCase(segment)}
              </span>
            ) : (
              <Link href={href} className="hover:text-foreground">
                {toTitleCase(segment)}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}