"use client";

import { useEffect, useRef } from "react";
import type { LinkItem } from "@/lib/types";

type Props = {
  link: LinkItem | null;
  onCancel: () => void;
  onConfirm: (link: LinkItem) => void;
};

export default function DeleteLinkDialog({ link, onCancel, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (link && !dialog.open) dialog.showModal();
    if (!link && dialog.open) dialog.close();
  }, [link]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-lg border border-[var(--border)] bg-[var(--card)] p-0 text-[var(--text)] shadow-xl backdrop:bg-black/40"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">링크 삭제</h2>
        <p className="text-sm text-[var(--text-sub)]">
          <strong className="text-[var(--text)]">{link?.title}</strong> 링크를 정말 삭제할까요?
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
            onClick={() => link && onConfirm(link)}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </dialog>
  );
}
