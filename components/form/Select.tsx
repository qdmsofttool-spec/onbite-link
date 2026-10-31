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
      className="w-full rounded-lg border border-zinc-300 bg-background px-3 py-2 text-sm outline-none focus:border-foreground dark:border-zinc-700"
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
