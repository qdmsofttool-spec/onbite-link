"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderDialog from "@/components/folder/DeleteFolderDialog";
import { useFolders } from "@/components/folder/FolderProvider";
import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const { removeFolder } = useFolders();
  const [target, setTarget] = useState<Folder | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleConfirm = (folder: Folder) => {
    removeFolder(folder.id);
    setTarget(null);
    if (pathname === `/folder/${folder.id}`) router.push("/");
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
            <button
              type="button"
              aria-label={`${folder.name} 폴더 삭제`}
              onClick={() => setTarget(folder)}
              className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md bg-[var(--hover-bg)] text-[var(--text-sub)] opacity-0 transition-opacity duration-150 hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9h6.8l.6-9M6.5 6.5v4M9.5 6.5v4" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <DeleteFolderDialog folder={target} onCancel={() => setTarget(null)} onConfirm={handleConfirm} />
    </div>
  );
}
