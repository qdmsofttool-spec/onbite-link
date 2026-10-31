import { notFound } from "next/navigation";
import LinkGrid from "@/components/link/LinkGrid";
import { folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((f) => ({ id: String(f.id) }));
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const folderId = Number((await params).id);
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) notFound();


  return (
    <div>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid folderId={folderId} />
    </div>
  );
}
