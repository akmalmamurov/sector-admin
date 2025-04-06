import classNames from "classnames";
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow, } from "../ui/table";
import { useConfirmModal, useCurrentColor, useDeleteCatalog } from "@/hooks";
import { catalogTableData } from "@/data";
import { Catalog } from "@/types";
import { ConfirmModal } from "../modal";
import { Trash2Icon, MoreHorizontal, ArrowUpDown, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { useChangeOrder } from "@/hooks/change-order/change-order";
import { orderSelect } from "@/utils/change-order-select-data";

interface CatalogTableProps {
  catalogData: Catalog[];
  handleOpen: (catalog: Catalog) => void;
}

export const CatalogTable = ({ catalogData, handleOpen, }: CatalogTableProps) => {
  const theme = useCurrentColor();
  const { mutate: deleteCatalog } = useDeleteCatalog();
  const handleDelete = (id: string) => deleteCatalog({ id });

  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState<{ id: string; index: number }>({
    id: "",
    index: 0, 
  });

  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const { mutate: changeOrder } = useChangeOrder();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete ?", () => {
      handleDelete(id);
    });
  };

  const handleChangeOrder = (id: string, index: number) => {
    changeOrder({ id: id, index: index, name: "catalog" });
    setOrderData({ id: "", index: 0 });
    setIsOpen(false);
  };  

  return (
    <>
      <Table>
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            {catalogTableData.map((el) => (
              <TableHead
                key={el}
                className={classNames(
                  "font-bold text-sm uppercase px-5 last:text-right",
                  theme.text
                )}
              >
                {el}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogData.map((catalog, index) => (
            <TableRow key={catalog.id}>
              <TableCell
                className={classNames("text-sm pl-6 py-1", theme.text)}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {catalog.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {catalog.subcatalogs?.length ?? 0}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 ">
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
                        onClick={() => handleOpen(catalog)}
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
                        onClick={() => handleDeleteClick(catalog.id)}
                        className={classNames(
                          "w-full flex justify-center items-center",
                          theme.text
                        )}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                        Delete
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          setOrderData({ id: catalog.id, index: 0 });
                          setIsOpen(true);
                        }}
                        className={classNames(
                          "w-full flex justify-center items-center",
                          theme.text
                        )}
                      >
                        <ArrowUpDown className="mr-2 w-4 h-4 text-blue-600" />
                        Change order
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={classNames(
            "bg-white dark:bg-background rounded-2xl shadow-xl p-6 max-w-md w-full"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center text-header">
              Change Catalog Order
            </DialogTitle>
            <button onClick={() => {
              setOrderData({ id: "", index: 0 });
              setIsOpen(false);
            }}>
              <X
                className={classNames(
                  theme.text,
                  "w-5 h-5 absolute top-4 right-4 hover:text-red-500 transition-colors"
                )}
              />
            </button>
          </DialogHeader>

          <DialogDescription className="text-sm text-muted-foreground text-center mb-4">
            Select a new order index for the catalog item
          </DialogDescription>

          <div className="flex flex-col gap-4 items-center justify-center">
            <Select
              onValueChange={(value) => {
                setOrderData((prev) => ({
                  ...prev,
                  index: Number(value),
                }));
              }}
            >
              <SelectTrigger className=" border-header rounded-lg px-4 py-2 text-sm font-medium min-w-[220px] ">
                <SelectValue placeholder="Select order index" />
              </SelectTrigger>
              <SelectContent>{orderSelect(catalogData.length)}</SelectContent>
            </Select>

            <Button
              onClick={() => handleChangeOrder(orderData.id, orderData.index)}
              className="w-full mt-2"
            >
              Confirm Change
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default CatalogTable;
