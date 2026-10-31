import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";

export default function FolderList({ folders }: { folders: Folder[] }) {
  return (
    <div>
      <h2 className="mb-2 px-3 text-[13px] font-semibold text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <SidebarItem label={folder.name} href={`/folder/${folder.id}`} count={folder.count} icon="📁" />
          </li>
        ))}
      </ul>
    </div>
  );
}
