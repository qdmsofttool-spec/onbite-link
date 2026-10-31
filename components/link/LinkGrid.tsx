"use client";

import { useFolders } from "@/components/folder/FolderProvider";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinkProvider";

export default function LinkGrid({ folderId }: { folderId?: number }) {
  const { folders } = useFolders();
  const { links } = useLinks();
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));
  const visible = folderId === undefined ? links : links.filter((l) => l.folderId === folderId);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visible.map((link) => (
        <LinkCard key={link.id} link={link} folderName={folderNames.get(link.folderId)} />
      ))}
    </section>
  );
}
