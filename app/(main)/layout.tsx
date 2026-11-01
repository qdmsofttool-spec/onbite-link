import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { FolderProvider } from "@/components/folder/FolderProvider";
import { LinkProvider } from "@/components/link/LinkProvider";
import type { Folder, LinkItem } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("folders").select("id, name").order("id", { ascending: true });
  const folders: Folder[] = (data ?? []).map((f) => ({ ...f, count: 0 }));
  const { data: linkRows } = await supabase
    .from("links")
    .select("id, url, title, description, thumbnail_url, folder_id, created_at")
    .order("created_at", { ascending: false });
  const links: LinkItem[] = (linkRows ?? []).map((l) => ({
    id: String(l.id),
    url: l.url,
    title: l.title ?? l.url,
    description: l.description ?? "",
    thumbnail: l.thumbnail_url,
    folderId: l.folder_id,
    createdAt: l.created_at.slice(0, 10),
  }));

  return (
    <FolderProvider initialFolders={folders}>
      <LinkProvider initialLinks={links}>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex min-h-0 flex-1">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-[720px] px-6 pb-16 pt-10">{children}</div>
            </main>
          </div>
        </div>
      </LinkProvider>
    </FolderProvider>
  );
}
