import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";
import { DOMAIN } from "@/constants";
import { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { AlertTriangle, Trash2Icon, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { PopularProduct } from "@/types";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useCreateToggleProduct } from "@/hooks/product/create-popular-product";
interface Props {
  productData: PopularProduct[];
}
export const PopularProductTable = ({ productData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { mutate: togglePopularProduct } = useCreateToggleProduct();
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteIsOpen(true);
  };

  const handleDeleteProduct = () => {
    if (deleteId) {
      togglePopularProduct([deleteId]);
      setDeleteIsOpen(false);
    }
  };  

  const handleCancel = () => {
    setDeleteIsOpen(false);
    setDeleteId(null);
  };




  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };
  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
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
            Is Popular
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Categories path
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
        {productData?.map((product: PopularProduct) => (
          <TableRow key={product?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {product?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {product?.popularProduct?.id ? "Popular" : "Not Popular"}
            </TableCell>

            <TableCell
              className={classNames(
                "text-sm px-6 py-1 cursor-pointer",
                theme.text
              )}
              onClick={() => handleImage(product?.mainImage)}
            >
              <img
                src={`${DOMAIN}/${product?.mainImage}`}
                alt={product?.title}
                className="w-10 h-10"
              />
            </TableCell>
            <TableCell
              className={classNames("text text-red-400 text-end", theme.text)}
            >
              <Trash2Icon
                onClick={() => handleDelete(product?.id)}
                className={cn("ml-auto text-red-400 cursor-pointer")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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

      <Dialog open={deleteIsOpen} onOpenChange={setDeleteIsOpen}>
        <DialogContent className="max-w-md p-6 rounded-xl shadow-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-semibold text-red-600 flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" /> Delete Popular
              Product
            </DialogTitle>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <p className="text-lg font-medium mb-4 text-gray-700">
              Are you sure you want to delete this popular product?
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleDeleteProduct}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md"
              >
                Delete
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md shadow-md"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
          <DialogFooter />
        </DialogContent>
      </Dialog> 
    </Table>
  );
};

export default memo(PopularProductTable);
