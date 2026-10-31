"use client";

import { useFolders } from "@/components/folder/FolderProvider";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ totalCount }: { totalCount: number }) {
  const { folders } = useFolders();

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-8 overflow-y-auto border-r border-[var(--border)] p-3 md:flex">
      <SidebarItem label="ALL" href="/" count={totalCount} />
      <FolderList folders={folders} />
    </aside>
  );
}
