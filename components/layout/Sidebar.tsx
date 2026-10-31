import type { Folder } from "@/lib/types";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

type Props = { folders: Folder[]; totalCount: number };

export default function Sidebar({ folders, totalCount }: Props) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 overflow-y-auto border-r border-zinc-200 p-4 dark:border-zinc-800 md:flex">
      <SidebarItem label="ALL" href="/" count={totalCount} />
      <FolderList folders={folders} />
    </aside>
  );
}
