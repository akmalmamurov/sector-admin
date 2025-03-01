import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor, useDeleteCategory } from "@/hooks";
import { Category } from "@/types";
import classNames from "classnames";
import { UpDelete } from "../menu";
import { DOMAIN } from "@/constants";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "../ui/dialog";
import { X } from "lucide-react";
interface Props {
  categoriesData: Category[];
  handleOpen: () => void;
}
export const CategoryTable = ({ handleOpen, categoriesData }: Props) => {
  const theme = useCurrentColor();
  const { mutate: deleteCategory } = useDeleteCategory();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = (id: string) => {
    deleteCategory({ id });
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
        {categoriesData?.map((category) => (
          <TableRow key={category?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {category?.title}
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 cursor-pointer", theme.text)}
              onClick={() => handleImage(category?.path)}
            >
              <img
                src={`${DOMAIN}/${category?.path}`}
                alt={category?.title}
                className="w-10 h-10"
              />
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
              <UpDelete
                item={category}
                handleOpen={handleOpen}
                handleDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`max-w-3xl h-[500px] ${theme.bg} px-5 pt-6 flex flex-col`}>
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
    </Table>
  );
};

export default CategoryTable;
