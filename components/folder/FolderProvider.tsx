"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<boolean>;
  removeFolder: (id: number) => Promise<boolean>;
  renameFolder: (id: number, name: string) => Promise<boolean>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState(initialFolders);

  const addFolder = useCallback(async (name: string) => {
    const { data, error } = await createClient()
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();
    if (error || !data) return false;
    setFolders((prev) => [...prev, { ...data, count: 0 }]);
    return true;
  }, []);

  const removeFolder = useCallback(async (id: number) => {
    const { error } = await createClient().from("folders").delete().eq("id", id);
    if (error) return false;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    return true;
  }, []);

  const renameFolder = useCallback(async (id: number, name: string) => {
    const { error } = await createClient().from("folders").update({ name }).eq("id", id);
    if (error) return false;
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
    return true;
  }, []);

  return (
    <FolderContext.Provider value={{ folders, addFolder, removeFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}
