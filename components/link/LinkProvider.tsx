"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { LinkItem } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => Promise<boolean>;
  removeLink: (id: string) => void;
  updateLink: (id: string, edit: Pick<LinkItem, "folderId" | "title" | "description">) => Promise<boolean>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState(initialLinks);

  const addLink = useCallback(async (link: Omit<LinkItem, "id" | "createdAt">) => {
    const { data, error } = await createClient()
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail ?? null,
        folder_id: link.folderId,
      })
      .select("id, created_at")
      .single();
    if (error || !data) return false;
    setLinks((prev) => [
      { ...link, id: String(data.id), createdAt: data.created_at.slice(0, 10) },
      ...prev,
    ]);
    return true;
  }, []);

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLink = useCallback(
    async (id: string, edit: Pick<LinkItem, "folderId" | "title" | "description">) => {
      const { error } = await createClient()
        .from("links")
        .update({ folder_id: edit.folderId, title: edit.title, description: edit.description })
        .eq("id", Number(id));
      if (error) return false;
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...edit } : l)));
      return true;
    },
    [],
  );

  return <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}
