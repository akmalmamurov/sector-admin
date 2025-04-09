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
import { X } from "lucide-react";
import { ProductData } from "@/types";
import { DOMAIN } from "@/constants";
import { priceFormat } from "@/utils";
import { ConfirmModal } from "../modal";
// import { Pagination } from "../pagination/Pagination";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../ui/select";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScroll";

interface Props {
  productData: ProductData[];
  setPage: (page: number) => void;
  page: number;
  limit: number;
  setLimit: (limit: number) => void;
  number?: boolean;
  handleChecked: (product: ProductData) => void;
  checkedProduct: ProductData[];
}
export const ProductModalTable = ({
  productData,
  number = false,
  handleChecked,
  checkedProduct,
}: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { visibleData, loaderRef } = useInfiniteScrollObserver(productData, 20);

  const {
    isOpen: isConfirmOpen,
    message,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  return (
    <div className="h-[calc(100vh-300px)] flex flex-col ">
      <Table className="">
        <TableHeader className={`${theme.header} bg-gray-300`}>
          <TableRow>
            <TableHead
              className={classNames(
                "font-bold text-sm uppercase px-5",
                theme.text
              )}
            ></TableHead>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleData.map((product, index) => (
            <TableRow key={product?.id}>
              <TableCell className={classNames("text-sm pl-5", theme.text)}>
                {number ? (
                  <p>{index + 1}</p>
                ) : (
                  <Checkbox checked={checkedProduct.some((item) => item.id === product.id)} onCheckedChange={() => handleChecked(product)} />
                )}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 w-1/3", theme.text)}
              >
                {product?.title}
              </TableCell>
              <TableCell
                onClick={() => handleImage(product?.mainImage)}
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
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
                {product.productCode}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {priceFormat(product.price)} summ
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        ref={loaderRef}
        className="h-10 w-full flex justify-center items-center"
      >
        <p className="text-gray-500 text-sm"></p>
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

export default ProductModalTable;
