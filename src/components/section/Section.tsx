import { useCurrentColor } from "@/hooks";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}
export const Section = ({ children, className }: Props) => {
  const theme = useCurrentColor();
  return (
    <section
      className={cn(`p-6 rounded-md shadow-md ${theme.sidebar}`, className)}
    >
      {children}
    </section>
  );
};

export default Section;
