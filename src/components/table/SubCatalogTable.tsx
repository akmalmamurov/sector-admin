import classNames from "classnames";
import { useConfirmModal, useCurrentColor, useDeleteSubCatalog } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubCatalog, Catalog } from "@/types";
import { subCatalogTableData } from "@/data";
import ChangeOrderMenu, { ChangeOrderDialog } from "../change-order/change-order.menu";
import { useState } from "react";
import { useChangeOrder } from "@/hooks/change-order/change-order";
import { ConfirmModal } from "../modal";

interface Props {
  subCatalogData: SubCatalog[];
  handleOpen: (data: SubCatalog | Catalog) => void;
}

export const SubCatalogTable = ({ subCatalogData, handleOpen }: Props) => {
  const { mutate: deleteSubCatalog } = useDeleteSubCatalog();
  const theme = useCurrentColor();

  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState<{ id: string; index: number }>({ id: "", index: 0 });

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
      deleteSubCatalog({ id });
    });
  };

  const handleChangeOrder = (id: string, index: number) => {
    changeOrder({ id: id, index: index, name: "subcatalog" });
    setOrderData({ id: "", index: 0 });
    setIsOpen(false);
  };  
  return (
    <>
      <Table>
        <TableHeader className={`${theme.header} `}>
          <TableRow>
            {subCatalogTableData.map((el) => (
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
          {subCatalogData.map((sub: SubCatalog, index: number) => (
            <TableRow key={sub.id}>
              <TableCell
                className={classNames("text-sm pl-6 py-1", theme.text)}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {sub.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {sub.categories?.length || 0}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <ChangeOrderMenu
                  handleOpen={handleOpen}
                  handleDeleteClick={handleDeleteClick}
                  setOrderData={setOrderData}
                  setIsOpen={setIsOpen}
                  value={sub}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ChangeOrderDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setOrderData={setOrderData}
        orderData={orderData}
        length={subCatalogData.length}
        handleChangeOrder={handleChangeOrder}
        name="SubCatalog"
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

export default SubCatalogTable;
