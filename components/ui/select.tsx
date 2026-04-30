"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  hint?: string;
  options: readonly SelectOption[] | readonly string[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      id,
      options,
      placeholder = "Select an option",
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const normalized: SelectOption[] = (options as readonly (SelectOption | string)[]).map(
      (o) => (typeof o === "string" ? { label: o, value: o } : o)
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-[6px] block text-[14px] font-medium leading-[20px] text-[var(--text-primary)]"
          >
            {label}
            {props.required && (
              <span aria-hidden className="ml-[4px] text-[var(--color-error-600)]">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={cn(
              "flex h-[40px] w-full appearance-none rounded-[8px] border bg-transparent px-[12px] pr-[36px] text-[14px] leading-[20px] text-[var(--text-primary)] ring-offset-[var(--surface-default)] transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-[2px]",
              "disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
              !props.value && "text-[var(--text-alt-tertiary)]",
              error
                ? "border-[var(--color-error-600)] focus-visible:ring-[var(--color-error-500)]"
                : "border-[var(--stroke-primary)] hover:border-[var(--stroke-secondary)]",
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {normalized.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-[12px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[var(--text-tertiary)]"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
        {error && (
          <p className="mt-[6px] text-[12px] leading-[16px] text-[var(--color-error-600)]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="mt-[6px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
