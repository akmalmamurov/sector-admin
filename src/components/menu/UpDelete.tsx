import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { useConfirmModal, useCurrentColor } from "@/hooks";
import { Brand, Catalog, Category, SubCatalog, IComment } from "@/types";
import { ConfirmModal } from "../modal";

type ItemType = Catalog | SubCatalog | Category | Brand | IComment;

interface UpDeleteProps<T extends ItemType> {
  item: T;
  handleOpen: (item: T) => void;
  handleDelete: (id: string) => void;
}

export const UpDelete = <T extends ItemType>({
  item,
  handleOpen,
  handleDelete,
}: UpDeleteProps<T>) => {
  const theme = useCurrentColor();

  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete ?", () => {
      handleDelete(id);
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className={classNames("w-4 h-4 text-header")} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={classNames(theme.bg)}>
          <DropdownMenuItem>
            <button
              onClick={() => handleOpen(item)}
              className="w-full flex justify-center items-center"
            >
              <Edit className="mr-2 w-4 h-4 text-blue-600" />
              <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => handleDeleteClick(item.id)}
              className={classNames(
                "w-full flex justify-center items-center",
                theme.text
              )}
            >
              <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default UpDelete;
