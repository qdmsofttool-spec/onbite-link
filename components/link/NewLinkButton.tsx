import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-accent flex items-center gap-1 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150"
    >
      <span aria-hidden>+</span> 새 링크
    </Link>
  );
}
