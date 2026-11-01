"use client";

import { useEffect, useRef, useState } from "react";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";
import type { Folder } from "@/lib/types";

type Props = {
  folder: Folder | null;
  onCancel: () => void;
  onSave: (id: number, name: string) => Promise<void>;
};

export default function EditFolderDialog({ folder, onCancel, onSave }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (folder && !dialog.open) {
      setName(folder.name);
      dialog.showModal();
    }
    if (!folder && dialog.open) dialog.close();
  }, [folder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!folder || !trimmed) return;
    onSave(folder.id, trimmed);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-xl backdrop:bg-black/40"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">폴더 수정</h2>
        <FormField label="폴더 이름" htmlFor="edit-folder-name">
          <TextInput
            id="edit-folder-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            required
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
            disabled={!name.trim()}
            className="btn-accent rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 disabled:opacity-50"
          >
            저장
          </button>
        </div>
      </form>
    </dialog>
  );
}
