import NewLinkForm from "@/components/link/NewLinkForm";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">새 링크</h1>
      <NewLinkForm folders={folders} />
    </div>
  );
}
