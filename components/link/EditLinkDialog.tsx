"use client";

import { useEffect, useRef, useState } from "react";
import { useFolders } from "@/components/folder/FolderProvider";
import FormField from "@/components/form/FormField";
import Select from "@/components/form/Select";
import TextInput from "@/components/form/TextInput";
import type { LinkItem } from "@/lib/types";

export type LinkEdit = Pick<LinkItem, "folderId" | "title" | "description">;

type Props = {
  link: LinkItem | null;
  onCancel: () => void;
  onSave: (id: string, edit: LinkEdit) => Promise<void>;
};

export default function EditLinkDialog({ link, onCancel, onSave }: Props) {
  const { folders } = useFolders();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [folderId, setFolderId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (link && !dialog.open) {
      setFolderId(String(link.folderId ?? ""));
      setTitle(link.title);
      setDescription(link.description);
      dialog.showModal();
    }
    if (!link && dialog.open) dialog.close();
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!link || !trimmed || !folderId) return;
    onSave(link.id, { folderId: Number(folderId), title: trimmed, description: description.trim() });
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-[480px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-xl backdrop:bg-black/40"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">링크 수정</h2>
        <FormField label="폴더" htmlFor="edit-link-folder">
          <Select
            id="edit-link-folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            required
            options={folders.map((f) => ({ value: String(f.id), label: f.name }))}
          />
        </FormField>
        <FormField label="제목" htmlFor="edit-link-title">
          <TextInput
            id="edit-link-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormField>
        <FormField label="설명" htmlFor="edit-link-description">
          <textarea
            id="edit-link-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-field w-full resize-none rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base text-[var(--text)] transition-colors duration-150"
          />
        </FormField>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !folderId}
            className="btn-accent rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
          >
            저장
          </button>
        </div>
      </form>
    </dialog>
  );
}
