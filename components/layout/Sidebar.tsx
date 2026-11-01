"use client";

import { useFolders } from "@/components/folder/FolderProvider";
import { useLinks } from "@/components/link/LinkProvider";
import LogoutButton from "@/components/auth/LogoutButton";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { folders } = useFolders();
  const { links } = useLinks();
  const withCount = folders.map((f) => ({
    ...f,
    count: links.filter((l) => l.folderId === f.id).length,
  }));

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-8 overflow-y-auto border-r border-[var(--border)] p-3 md:flex">
      <SidebarItem label="ALL" href="/" count={links.length} />
      <FolderList folders={withCount} />
      <LogoutButton />
    </aside>
  );
}
