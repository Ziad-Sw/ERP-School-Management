import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-brand-600 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-sidebar-bg rounded-[32px] px-12 py-16 flex flex-col items-center gap-6 max-w-md w-full text-center">
        <Loader2 size={48} className="text-brand-600 animate-spin" />
        {text && (
          <p className="font-tajawal font-medium text-lg text-text">{text}</p>
        )}
      </div>
    </div>
  );
}
