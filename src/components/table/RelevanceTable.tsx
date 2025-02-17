import { useConfirmModal, useCurrentColor, useDeleteRelevance } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import classNames from "classnames";
import { Relevance } from "@/types";
import { ConfirmModal } from "../modal";
interface RelevanceTableProps {
  relevanceData: Relevance[];
  handleOpen: (element: Relevance) => void;
}
export const RelevanceTable = ({
  relevanceData,
  handleOpen,
}: RelevanceTableProps) => {
  const theme = useCurrentColor();
  const { mutate: deleteData } = useDeleteRelevance();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this user?", () => {
      deleteData({ id });
    });
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Name
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Title
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5 text-right",
              theme.text
            )}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {relevanceData?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item.name}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item.title}
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default RelevanceTable;
