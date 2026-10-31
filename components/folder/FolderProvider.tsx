"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}
