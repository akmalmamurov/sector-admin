import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  className?: string;
}

export const LoadingData = ({ text = "Loading", className }: LoadingProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className="w-6 h-6 animate-spin text-header" />
      <span className="text-header text-base">{text}</span>
    </div>
  );
};

export default LoadingData;
