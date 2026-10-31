"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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

  const addFolder = useCallback((name: string) => {
    setFolders((prev) => {
      const nextId = prev.reduce((max, f) => Math.max(max, f.id), 0) + 1;
      return [...prev, { id: nextId, name, count: 0 }];
    });
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
