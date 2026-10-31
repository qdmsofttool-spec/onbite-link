"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  count?: number;
  icon?: string;
};

export default function SidebarItem({ label, href, count, icon }: Props) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`item-hover flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-150 ${
        active
          ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
          : "text-[var(--text-sub)]"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon && <span aria-hidden>{icon}</span>}
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[13px] text-[var(--text-sub)]">{count}</span>
      )}
    </Link>
  );
}
