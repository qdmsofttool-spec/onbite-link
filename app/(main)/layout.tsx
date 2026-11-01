import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { FolderProvider } from "@/components/folder/FolderProvider";
import { LinkProvider } from "@/components/link/LinkProvider";
import { links } from "@/lib/mock-data";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("folders").select("id, name").order("id", { ascending: true });
  const folders: Folder[] = (data ?? []).map((f) => ({ ...f, count: 0 }));

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
