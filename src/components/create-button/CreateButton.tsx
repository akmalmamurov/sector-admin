import { Button } from "../ui/button";
import { useCurrentColor } from "@/hooks";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}
export const CreateButton = ({ children, className, onClick,type }: Props) => {
  const theme = useCurrentColor();
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        `h-[42px] border border-header  rounded-[8px] font-semibold text-header ${theme.bg}`,
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
