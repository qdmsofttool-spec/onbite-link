"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { LinkItem } from "@/lib/types";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => void;
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

  const addLink = useCallback((link: Omit<LinkItem, "id" | "createdAt">) => {
    setLinks((prev) => {
      const nextId = prev.reduce((max, l) => Math.max(max, Number(l.id)), 0) + 1;
      const createdAt = new Date().toISOString().slice(0, 10);
      return [{ ...link, id: String(nextId), createdAt }, ...prev];
    });
  }, []);

  return <LinkContext.Provider value={{ links, addLink }}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}
