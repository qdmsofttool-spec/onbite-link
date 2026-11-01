"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderDialog from "@/components/folder/DeleteFolderDialog";
import EditFolderDialog from "@/components/folder/EditFolderDialog";
import { useFolders } from "@/components/folder/FolderProvider";
import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";

const iconButton =
  "flex h-7 w-7 items-center justify-center rounded-md bg-[var(--hover-bg)] text-[var(--text-sub)] opacity-0 transition-opacity duration-150 focus-visible:opacity-100 group-hover:opacity-100";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const { removeFolder, renameFolder } = useFolders();
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async (folder: Folder) => {
    if (!(await removeFolder(folder.id))) return;
    setDeleteTarget(null);
    if (pathname === `/folder/${folder.id}`) router.push("/");
  };

  const handleSave = async (id: number, name: string) => {
    if (await renameFolder(id, name)) setEditTarget(null);
  };

  return (
    <div>
      <h2 className="mb-2 px-3 text-[13px] font-semibold text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id} className="group relative">
            <SidebarItem label={folder.name} href={`/folder/${folder.id}`} count={folder.count} icon="📁" />
            <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-1">
              <button
                type="button"
                aria-label={`${folder.name} 폴더 수정`}
                onClick={() => setEditTarget(folder)}
                className={`${iconButton} hover:text-[var(--accent)]`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 2.5l2.5 2.5L5.5 13H3v-2.5L11 2.5z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={`${folder.name} 폴더 삭제`}
                onClick={() => setDeleteTarget(folder)}
                className={`${iconButton} hover:text-[var(--error)]`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9h6.8l.6-9M6.5 6.5v4M9.5 6.5v4" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <EditFolderDialog folder={editTarget} onCancel={() => setEditTarget(null)} onSave={handleSave} />
      <DeleteFolderDialog folder={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  );
}
