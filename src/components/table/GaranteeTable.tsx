import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks/useCurrentColor";
import { GaranteeData } from "@/types";
import classNames from "classnames";
import { memo } from "react";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useConfirmModal, useDeleteGarantee } from "@/hooks";
import { ConfirmModal } from "../modal/ConfirmModal";
interface Props {
  garanteeData: GaranteeData[];
  handleOpen: (element: GaranteeData) => void;
}

export const GaranteeTable = ({ garanteeData, handleOpen }: Props) => {

  const { mutate: deleteGarantee } = useDeleteGarantee();

  const theme = useCurrentColor();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this garantee?", () => {
      deleteGarantee({ id });
    });
  };

  return (
    <>
      <Table>
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            {["ID", "Title", "Price", "Action"].map((title) => (
              <TableHead
                key={title}
                className={classNames(
                  `font-bold text-sm uppercase px-5 ${
                    title === "Action" ? "text-end" : ""
                  }`,
                  theme.text
                )}
              >
                {title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {garanteeData?.map((garantee, inx) => (
            <TableRow key={garantee.id}>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {inx + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 ", theme.text)}
              >
                {garantee.title}
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 max-w-[200px] truncate line-clamp-1",
                  theme.text
                )}
              >
                {garantee.price}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal
                        className={classNames("w-4 h-4 text-header")}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={classNames(theme.bg)}
                  >
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(garantee)}
                        className="w-full flex justify-center items-center"
                      >
                        <Edit className="mr-2 w-4 h-4 text-blue-600" />
                        <span className={`min-w-[47px] ${theme.text}`}>
                          Edit
                        </span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDeleteClick(garantee.id)}
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default memo(GaranteeTable);
