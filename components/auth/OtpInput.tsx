"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  error,
  disabled,
}: OtpInputProps) {
  const [localValue, setLocalValue] = useState<string[]>(
    value.split("").concat(Array(length).fill("")).slice(0, length)
  );
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const updateValue = (newValues: string[]) => {
    setLocalValue(newValues);
    onChange(newValues.join(""));
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newValues = [...localValue];
    newValues[index] = char;
    updateValue(newValues);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !localValue[index] && index > 0) {
      const newValues = [...localValue];
      newValues[index - 1] = "";
      updateValue(newValues);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newValues = pasted.split("").concat(Array(length).fill("")).slice(0, length);
    updateValue(newValues);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={localValue[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={twMerge(
            "w-12 h-14 text-center text-2xl font-poppins font-medium rounded-md bg-input-fill border outline-none focus:border-brand-500",
            error ? "border-error-500" : "border-[var(--color-brand-300)]"
          )}
        />
      ))}
    </div>
  );
}
