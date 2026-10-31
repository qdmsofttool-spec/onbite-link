"use client";

import type { Folder } from "@/lib/types";
import FormField from "@/components/form/FormField";
import Select from "@/components/form/Select";
import TextInput from "@/components/form/TextInput";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()} // TODO: 저장 로직 연결
    >
      <FormField label="링크" htmlFor="url">
        <TextInput id="url" name="url" type="url" placeholder="https://example.com" required />
      </FormField>
      <FormField label="폴더" htmlFor="folder">
        <Select
          id="folder"
          name="folder"
          placeholder="폴더 선택"
          options={folders.map((f) => ({ value: String(f.id), label: f.name }))}
        />
      </FormField>
      <button
        type="submit"
        className="btn-accent self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150"
      >
        저장
      </button>
    </form>
  );
}
