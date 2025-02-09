import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { useCurrentColor } from "@/hooks";
import { Catalog, SubCatalog,  } from "@/types"; // Subcatalog qo‘shildi

// `T` faqat Catalog yoki Subcatalog bo‘lishi mumkin
type ItemType = Catalog | SubCatalog;

interface UpDeleteProps<T extends ItemType> {
  item: T;
  handleOpen: (item: T) => void;
  handleDelete: (id: string) => void;
  label?: string;
}

export const UpDelete = <T extends ItemType>({
  item,
  handleOpen,
  handleDelete,
  label = "Item",
}: UpDeleteProps<T>) => {
  const theme = useCurrentColor();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className={classNames("w-4 h-4", theme.text)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={classNames(theme.bg)}>
        <DropdownMenuItem>
          <button
            onClick={() => handleOpen(item)}
            className="w-full flex justify-center items-center"
          >
            <Edit className="mr-2 w-4 h-4 text-blue-600" />
            <span className={`min-w-[47px] ${theme.text}`}>
              Edit {label}
            </span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() => handleDelete(item.id)}
            className={classNames(
              "w-full flex justify-center items-center",
              theme.text
            )}
          >
            <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
            Delete {label}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpDelete;
