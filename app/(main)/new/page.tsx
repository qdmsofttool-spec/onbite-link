import type { Metadata } from "next";
import NewLinkForm from "@/components/link/NewLinkForm";

export const metadata: Metadata = { title: "새 링크" };

export default function NewLinkPage() {
  return (
    <div>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">새 링크</h1>
      <NewLinkForm />
    </div>
  );
}
