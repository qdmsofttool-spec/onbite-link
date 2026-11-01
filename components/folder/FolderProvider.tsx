"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<boolean>;
  removeFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
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

  const removeFolder = useCallback((id: number) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const renameFolder = useCallback((id: number, name: string) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
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
