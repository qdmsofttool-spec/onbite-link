"use client";

import { useEffect, useRef } from "react";
import type { Folder } from "@/lib/types";

type Props = {
  folder: Folder | null;
  onCancel: () => void;
  onConfirm: (folder: Folder) => Promise<void>;
};

export default function DeleteFolderDialog({ folder, onCancel, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (folder && !dialog.open) dialog.showModal();
    if (!folder && dialog.open) dialog.close();
  }, [folder]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-xl backdrop:bg-black/40"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">폴더 삭제</h2>
        <p className="text-sm text-[var(--text-sub)]">
          <strong className="text-[var(--text)]">{folder?.name}</strong> 폴더를 정말 삭제할까요?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-150"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => folder && onConfirm(folder)}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </dialog>
  );
}
