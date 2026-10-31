"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/components/folder/FolderProvider";
import FormField from "@/components/form/FormField";
import Select from "@/components/form/Select";
import TextInput from "@/components/form/TextInput";
import { useLinks } from "./LinkProvider";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const url = String(form.get("url")).trim();
    const folderId = Number(form.get("folder"));

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      addLink({
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
        folderId,
      });
      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "링크를 저장하지 못했습니다.");
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormField label="링크" htmlFor="url">
        <TextInput id="url" name="url" type="url" placeholder="https://example.com" required />
      </FormField>
      <FormField label="폴더" htmlFor="folder">
        <Select
          id="folder"
          name="folder"
          placeholder="폴더 선택"
          required
          options={folders.map((f) => ({ value: String(f.id), label: f.name }))}
        />
      </FormField>
      {error && (
        <p role="alert" className="text-sm text-[var(--error)]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-accent self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
      >
        {loading ? "저장 중..." : "확인"}
      </button>
    </form>
  );
}
