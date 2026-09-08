import { twMerge } from "tailwind-merge";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={twMerge(
        "bg-sidebar-bg rounded-[32px] px-8 sm:px-16 py-12 flex flex-col gap-6 items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
