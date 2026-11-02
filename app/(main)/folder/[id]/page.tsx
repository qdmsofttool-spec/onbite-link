import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LinkGrid from "@/components/link/LinkGrid";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const folderId = Number((await params).id);
  if (!Number.isInteger(folderId)) return { title: "폴더" };

  const supabase = createClient(await cookies());
  const { data } = await supabase.from("folders").select("name").eq("id", folderId).maybeSingle();
  return { title: data?.name ?? "폴더" };
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const folderId = Number((await params).id);
  if (!Number.isInteger(folderId)) notFound();

  const supabase = createClient(await cookies());
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) notFound();

  const { data: folder } = await supabase
    .from("folders")
    .select("name")
    .eq("id", folderId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!folder) notFound();

  return (
    <div>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid folderId={folderId} />
    </div>
  );
}
