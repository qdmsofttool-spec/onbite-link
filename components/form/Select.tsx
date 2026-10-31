import type { SelectHTMLAttributes } from "react";

type Option = { value: string; label: string };
type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
};

export default function Select({ options, placeholder, ...rest }: Props) {
  return (
    <select
      {...rest}
      className="input-field select-arrow w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base text-[var(--text)] transition-colors duration-150"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
