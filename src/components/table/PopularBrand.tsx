import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks";
import { IPopularBrand } from "@/types";
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
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useCreateToggleBrand } from "@/hooks/brand/create-popular-brand";
interface Props {
  brandsData: IPopularBrand[];
  handleOpen: () => void;
}
export const PopularBrandTable = ({ brandsData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { mutate: togglePopularBrand } = useCreateToggleBrand();
  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteIsOpen(true);
  };
  const handleDeleteBrand = () => {
    if (deleteId) {
      togglePopularBrand([deleteId]);
      setDeleteIsOpen(false);
    }
  };
  const handleCancel = () => {
    setDeleteIsOpen(false);
    setDeleteId(null);
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
            Image
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
        {brandsData?.map((brand: IPopularBrand) => (
          <TableRow key={brand?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {brand?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {brand?.popularBrand?.id ? "Popular" : "Not Popular"}
            </TableCell>

            <TableCell
              className={classNames(
                "text-sm px-6 py-1 cursor-pointer",
                theme.text
              )}
              onClick={() => handleImage(brand?.path)}
            >
              <img
                src={`${DOMAIN}/${brand?.path}`}
                alt={brand?.title}
                className="w-10 h-10"
              />
            </TableCell>
            <TableCell
              className={classNames("text text-red-400 text-end", theme.text)}
            >
              <Trash2Icon onClick={() => handleDelete(brand?.id)} className={cn("ml-auto text-red-400 cursor-pointer")} />
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
              Brand
            </DialogTitle>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <p className="text-lg font-medium mb-4 text-gray-700">
              Are you sure you want to delete this popular brand?
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleDeleteBrand}
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

export default memo(PopularBrandTable);
