import type { Folder, LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";

type Props = { links: LinkItem[]; folders: Folder[] };

export default function LinkGrid({ links, folders }: Props) {
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folderNames.get(link.folderId)}
        />
      ))}
    </section>
  );
}
