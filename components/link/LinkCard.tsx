import type { LinkItem } from "@/lib/types";

type Props = { link: LinkItem; folderName?: string };

export default function LinkCard({ link, folderName }: Props) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors duration-150"
    >
      <div className="flex items-center justify-between gap-2 text-[13px] text-[var(--text-sub)]">
        <span className="truncate">{host}</span>
        {folderName && (
          <span className="shrink-0 rounded-[4px] bg-[var(--hover-bg)] px-2 py-0.5 text-[13px] text-[var(--text)]">
            {folderName}
          </span>
        )}
      </div>
      <h3 className="line-clamp-1 text-base font-semibold leading-[1.4] text-[var(--text)]">
        {link.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">
        {link.description}
      </p>
      <time className="mt-auto pt-2 text-[13px] text-[var(--text-sub)]" dateTime={link.createdAt}>
        {link.createdAt}
      </time>
    </a>
  );
}
