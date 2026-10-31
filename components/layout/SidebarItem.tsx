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
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active
          ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon && <span aria-hidden>{icon}</span>}
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-zinc-400">{count}</span>
      )}
    </Link>
  );
}
