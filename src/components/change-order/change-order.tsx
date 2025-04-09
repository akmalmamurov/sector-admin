import { SelectItem } from "@/components/ui/select";

export const orderSelect = (length: number) => {
    return Array.from({ length }, (_, i) => (
        <SelectItem
      key= { i }
      value = { i.toString() }
      className = "text-header cursor-pointer"
        >
        { i + 1}
</SelectItem>
    ));
  };

