import { useState } from "react";
import classNames from "classnames";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
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
import { useConfirmModal, useCurrentColor, useDeleteFilterFull } from "@/hooks";
import { Button } from "../ui/button";
import { FilterResponse } from "@/types";
import DeleteFilterModal from "../modal/DeleteItem";
import { ConfirmModal } from "../modal";

interface Props {
  filterData: FilterResponse[];
  handleOpen: (element?: FilterResponse) => void;
}

export const FilterTable = ({ filterData, handleOpen }: Props) => {
  const theme = useCurrentColor();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutate: deleteFilter } = useDeleteFilterFull();

  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this filter?", () => {
      deleteFilter({ id });
    });
  };

  return (
    <>
      <Table className="table-auto min-w-[800px] w-full">
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            <TableHead className={`px-4 py-2 uppercase font-bold text-sm ${theme.text}`}>Name</TableHead>
            {/* <TableHead className="px-4 py-2">Type</TableHead> */}
            <TableHead className={`px-4 py-2 uppercase font-bold text-sm text-right ${theme.text}`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-auto">
          {filterData?.map((item, index) => (
            <TableRow key={item.id || index} className="overflow-x-auto">
              <TableCell className="flex gap-1 text-sm">
                {item.data.map((filterItem, idx) => (
                  <div key={`${item.id}-data-${idx}`} className="flex gap-1 ">
                    <span className="text-header font-bold"> {idx + 1}. </span>
                    <p className={theme.text}>{filterItem.title}</p>
                  </div>
                ))}
              </TableCell>

              {/* <TableCell>
                {item.data.map((filterItem, idx) => (
                  <div key={`${item.id}-data-${idx}`} className="mb-2">
                    <span className={theme.text}>{filterItem.type}</span>
                  </div>
                ))}
              </TableCell> */}

              <TableCell className="px-4 py-2 text-right ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal
                        className={classNames("w-4 h-4 text-header")}
                      />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className={theme.bg}>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(item)}
                        className="flex items-center justify-center px-3 py-2 w-full"
                      >
                        <Edit className="mr-2 w-4 h-4 text-blue-600" />
                        <span className={`min-w-[47px] ${theme.text}`}>
                          Edit
                        </span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => setIsDeleteOpen(true)}
                        className={`flex items-center justify-center px-3 py-2 w-full ${theme.text}`}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                        Delete Item
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className={`flex items-center justify-center px-3 py-2 w-full ${theme.text}`}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                        Delete Filter
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 📌 Delete Modal */}
      <DeleteFilterModal
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        filterData={filterData}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default FilterTable;
