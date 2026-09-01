import { InputHTMLAttributes, cloneElement, isValidElement } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement<{ size?: number; className?: string }>;
  error?: boolean;
}

export default function Input({ icon, error, className, ...props }: InputProps) {
  const styledIcon =
    icon && isValidElement(icon)
      ? cloneElement(icon, {
          size: 22,
          className: twMerge("text-gray", icon.props.className),
        })
      : icon;

  return (
    <div
      className={twMerge(
        "flex items-center gap-2 h-[56px] px-3 rounded-md bg-input-fill border w-[348px]",
        error ? "border-error-500" : "border-[var(--color-brand-300)]",
        className
      )}
    >
      <input
        className="flex-1 bg-transparent outline-none text-right font-tajawal text-gray text-sm"
        {...props}
      />
      {styledIcon}
    </div>
  );
}