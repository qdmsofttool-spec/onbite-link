"use client";

import { useState } from "react";
import { useFolders } from "@/components/folder/FolderProvider";
import type { LinkItem } from "@/lib/types";
import DeleteLinkDialog from "./DeleteLinkDialog";
import EditLinkDialog from "./EditLinkDialog";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinkProvider";

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--text-sub)] opacity-0 shadow-sm transition-opacity duration-150 focus-visible:opacity-100 group-hover:opacity-100";

export default function LinkGrid({ folderId }: { folderId?: number }) {
  const { folders } = useFolders();
  const { links, removeLink, updateLink } = useLinks();
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null);
  const [editTarget, setEditTarget] = useState<LinkItem | null>(null);
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));
  const visible = folderId === undefined ? links : links.filter((l) => l.folderId === folderId);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visible.map((link) => (
        <div key={link.id} className="group relative flex flex-col">
          <LinkCard link={link} folderName={link.folderId === null ? undefined : folderNames.get(link.folderId)} />
          <div className="absolute right-2 top-2 flex gap-1">
            <button
              type="button"
              aria-label={`${link.title} 링크 수정`}
              onClick={() => setEditTarget(link)}
              className={`${iconButton} hover:text-[var(--accent)]`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 2.5l2.5 2.5L5.5 13H3v-2.5L11 2.5z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`${link.title} 링크 삭제`}
              onClick={() => setDeleteTarget(link)}
              className={`${iconButton} hover:text-[var(--error)]`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9h6.8l.6-9M6.5 6.5v4M9.5 6.5v4" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <EditLinkDialog
        link={editTarget}
        onCancel={() => setEditTarget(null)}
        onSave={(id, edit) => {
          updateLink(id, edit);
          setEditTarget(null);
        }}
      />
      <DeleteLinkDialog
        link={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={(l) => {
          removeLink(l.id);
          setDeleteTarget(null);
        }}
      />
    </section>
  );
}
