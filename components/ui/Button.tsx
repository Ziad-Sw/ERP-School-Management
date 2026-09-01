import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = "Primary" | "Success" | "Info" | "Outline" | "Danger";
type ButtonSize = "Large" | "Medium" | "Small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type_?: ButtonType;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const typeStyles: Record<ButtonType, string> = {
  Primary: "bg-brand-500 text-white hover:bg-brand-600",
  Success: "bg-finance-500 text-white",
  Info: "bg-blue-500 text-white",
  Outline: "bg-transparent border border-brand-500 text-brand-500",
  Danger: "bg-error-500 text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  Large: "h-[56px] px-8 text-xl w-[348px]",
  Medium: "h-[48px] px-8 text-base w-[200px]",
  Small: "h-[40px] px-6 text-sm w-[150px]",
};

export default function Button({
  type_ = "Primary",
  size = "Medium",
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex gap-3 items-center justify-center rounded-lg font-tajawal font-bold",
        typeStyles[type_],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}