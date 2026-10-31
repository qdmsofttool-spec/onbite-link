import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { FolderProvider } from "@/components/folder/FolderProvider";
import { LinkProvider } from "@/components/link/LinkProvider";
import { folders, links } from "@/lib/mock-data";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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
