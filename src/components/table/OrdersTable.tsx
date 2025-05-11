import classNames from "classnames";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useConfirmModal, useCurrentColor } from "@/hooks";
import { DropdownMenu,  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { OrderDataFull } from "@/types";
import { ConfirmModal } from "../modal";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/formatedDate";
import { useUpdateOrders } from "@/hooks/order/update-order";
import { priceFormat } from "@/utils";
import { useState } from "react";
import { usegetOrderbyId } from "@/hooks/order/get-order-by-id";
import OrdersModal from "../modal/OrdersModal";

export interface Props {
  ordersData: OrderDataFull[];
}

export const OrdersTable = ({ ordersData }: Props) => {
  const { mutate: updateOrders } = useUpdateOrders();
  const theme = useCurrentColor();
  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = usegetOrderbyId(selectedId ?? "", {
    enabled: !!selectedId,
  });

  const handleOpen = (id?: string) => {
    setSelectedId(id ?? null);
    setIsOpen(true);
  };


  

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this promotion?", () => {
        updateOrders({
          id,
          data: {
            deletedAt: new Date()
          }
        });
    });
};


  return (
    <Table>
      <TableHeader className={`${theme.header}`}>
        <TableRow>
            {["Id", "OrderNumber", "FullName", "Phone", "Total price", "OrderPriceStatus", "ValidStartDate", "ValidEndDate", "Action"].map((title) => (
              <TableHead key={title} className={classNames(`font-bold text-sm uppercase px-5 ${ title === "Action" ? "text-end" : ""}`, theme.text )} >
                {title}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersData?.map((item, index) => (
          <TableRow key={item?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {index + 1}
            </TableCell>
            <TableCell className={classNames( "text-sm px-5 py-1", theme.text )} >
              {item.orderNumber}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {item?.fullname}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {item?.phone}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {priceFormat(item?.total)} sum
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {item?.orderPriceStatus === "not paid" ? "Не оплачен" : "Оплачен"}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {formatDate(item?.validStartDate)}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {formatDate(item?.validEndDate)}
            </TableCell>
          
            <TableCell
              className={classNames("text-sm px-5 py-1 text-end", theme.text)} >
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
                      onClick={() => handleOpen(item?.id)}
                      className="w-full flex justify-center items-center"
                    >
                      <Edit className="mr-2 w-4 h-4 text-blue-600" />
                      <span className={`min-w-[47px] ${theme.text}`}>Detail</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className={classNames("w-full flex justify-center items-center", theme.text )}>
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
   
    <OrdersModal open={isOpen} handleOpen={() => setIsOpen(!isOpen)} orderData={data as OrderDataFull}/>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default OrdersTable;
