import type { InputHTMLAttributes } from "react";

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base text-[var(--text)] transition-colors duration-150"
    />
  );
}
