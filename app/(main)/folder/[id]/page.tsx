import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LinkGrid from "@/components/link/LinkGrid";
import { createClient } from "@/utils/supabase/server";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const folderId = Number((await params).id);
  if (!Number.isInteger(folderId)) notFound();

  const supabase = createClient(await cookies());
  const { data: folder } = await supabase
    .from("folders")
    .select("name")
    .eq("id", folderId)
    .maybeSingle();
  if (!folder) notFound();

  return (
    <div>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid folderId={folderId} />
    </div>
  );
}
