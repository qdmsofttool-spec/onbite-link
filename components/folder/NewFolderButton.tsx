"use client";

import { useRef, useState } from "react";
import FormField from "@/components/form/FormField";
import TextInput from "@/components/form/TextInput";
import { useFolders } from "./FolderProvider";

export default function NewFolderButton() {
  const { addFolder } = useFolders();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addFolder(trimmed);
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="item-hover flex items-center gap-1 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150"
      >
        <span aria-hidden>📁</span> 새 폴더
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setName("")}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-xl backdrop:bg-black/40"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-semibold">새 폴더</h2>
          <FormField label="폴더 이름" htmlFor="folder-name">
            <TextInput
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="폴더 이름을 입력하세요"
              autoFocus
              required
            />
          </FormField>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
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
    </>
  );
}
