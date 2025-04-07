import classNames from "classnames";
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow, } from "../ui/table";
import { useConfirmModal, useCurrentColor, useDeleteCatalog } from "@/hooks";
import { catalogTableData } from "@/data";
import { Catalog } from "@/types";
import { ConfirmModal } from "../modal";
import { useState } from "react";
import { useChangeOrder } from "@/hooks/change-order/change-order";
import ChangeOrderMenu from "../change-order/change-order.menu";
import { ChangeOrderDialog } from "../change-order/change-order.menu";

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
                <ChangeOrderMenu handleOpen={handleOpen} handleDeleteClick={handleDeleteClick} setOrderData={setOrderData} setIsOpen={setIsOpen} value={catalog} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ChangeOrderDialog isOpen={isOpen} setIsOpen={setIsOpen} setOrderData={setOrderData} orderData={orderData} length={catalogData.length} handleChangeOrder={handleChangeOrder} name="Catalog" />

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
