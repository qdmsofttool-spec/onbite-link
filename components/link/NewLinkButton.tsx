import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="flex items-center gap-1 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
    >
      <span aria-hidden>+</span> 새 링크
    </Link>
  );
}
