import { useConfirmModal, useCurrentColor } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon, X } from "lucide-react";
import { ProductData } from "@/types";
import { DOMAIN } from "@/constants";
import { priceFormat } from "@/utils";
import { useDeleteProduct } from "@/hooks/product/delete-product";
import { ConfirmModal } from "../modal";
import { Pagination } from "../pagination/Pagination";
import { IProductResponse } from "@/hooks/product/get-product-by-filter";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useState } from "react";

interface Props {
  productData: IProductResponse;
  handleOpen: (element: ProductData) => void;
  setPage: (page: number) => void;
  page: number;
  limit: number;
  setLimit: (limit: number) => void;
  color?: string;
}
export const ProductTable = ({
  productData,
  handleOpen,
  setPage,
  page,
  limit,
  setLimit,
  color
}: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  return (
    <div className="overflow-y-scroll h-[calc(100vh-300px)] flex flex-col ">
      <Table className="">
        <TableHeader className={`${theme.header} ${color ? `bg-${color}` : ""}`}>
          <TableRow>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            >
              ID
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
          {productData.data.products?.map((product, idx) => (
            <TableRow key={product?.id}>
              <TableCell className={classNames("text-sm pl-5", theme.text)}>
                {(page - 1) * limit + idx + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 w-1/3", theme.text)}
              >
                {product?.title}
              </TableCell>
              <TableCell
                onClick={() => handleImage(product?.mainImage)}
                className={classNames("text-sm px-6 py-1 cursor-pointer", theme.text)}
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
      <div className="flex items-center justify-center gap-4 mt-auto">
        <Select
          onValueChange={(value) => setLimit(Number(value))}
          value={limit.toString()}
        >
          <SelectTrigger className="border border-blue-500 hover:border-blue-500 focus:border-blue-500 w-[150px] rounded-none py-2">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent defaultValue={limit} className="rounded-none">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Pagination
          total={productData.data.total}
          page={page}
          limit={limit}
          setPage={setPage}
        />
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`max-w-3xl h-[500px] ${theme.bg} px-5 pt-6 flex flex-col`}
        >
          <DialogHeader>
            <DialogTitle className="hidden">Image</DialogTitle>
            <button onClick={() => setIsOpen(false)}>
              <X
                className={classNames(
                  theme.text,
                  "w-6 h-6 absolute top-4 right-4"
                )}
              />
            </button>
          </DialogHeader>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="w-full h-full px-14 rounded-md overflow-hidden flex justify-center items-center">
            <img
              src={`${DOMAIN}/${image}`}
              alt="brandImage"
              className="w-[300px] h-[240px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductTable;
