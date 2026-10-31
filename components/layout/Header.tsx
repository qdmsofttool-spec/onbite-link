import NewLinkButton from "@/components/link/NewLinkButton";

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--header-bg)] px-4 backdrop-blur-[8px]">
      <span className="text-base font-semibold">🔗 한입 링크</span>
      <NewLinkButton />
    </header>
  );
}
