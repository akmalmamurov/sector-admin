import { useConfirmModal, useCurrentColor } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { ProductData } from "@/types";
import { DOMAIN } from "@/constants";
import { priceFormat } from "@/utils";
import { useDeleteProduct } from "@/hooks/product/delete-product";
import { ConfirmModal } from "../modal";

interface Props {
  productData: ProductData[];
  handleOpen: (element: ProductData) => void;
}
export const ProductTable = ({ productData, handleOpen }: Props) => {
  const theme = useCurrentColor();

  const { mutate: deleteProduct } = useDeleteProduct();

  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this garantee?", () => {
      deleteProduct({ id });
    });
  };
  
  return (
    <div className="overflow-y-scroll h-[calc(100vh-300px)]">
      <Table className="">
        <TableHeader className={`${theme.header}`}>
          <TableRow>
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
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              image
            </TableHead>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              instock
            </TableHead>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              product code
            </TableHead>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              price
            </TableHead>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              fullDescription
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
          {productData?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell
                className={classNames("text-sm px-6 py-1 w-1/3", theme.text)}
              >
                {product?.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                <img
                  src={`${DOMAIN}/${product?.mainImage}`}
                  alt="productImage"
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {product.inStock}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {product.productCode}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {priceFormat(product.price)} summ
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                Uzunligi:{" "}
                {product.fullDescription?.length
                  ? product.fullDescription.length
                  : 0}
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

                  <DropdownMenuContent align="end" className={theme.bg}>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(product)}
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
                        className={`flex items-center justify-center px-3 py-2 w-full ${theme.text}`}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                        Delete Item
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
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
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ProductTable;
