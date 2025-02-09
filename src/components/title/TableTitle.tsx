import { useCurrentColor } from "@/hooks";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const TableTitle = ({ children, className }: Props) => {
  const theme = useCurrentColor();
  return (
    <h3 className={cn(`text-xl font-semibold ${theme.text}`, className)}>
      {children}
    </h3>
  );
};

export default TableTitle;
