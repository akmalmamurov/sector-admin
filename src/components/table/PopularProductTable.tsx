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
} from "../ui/dialog";
import { Trash2Icon, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { PopularProduct } from "@/types";
interface Props {
  productData: PopularProduct[];
}
export const PopularProductTable = ({ productData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
              <Trash2Icon className={cn("ml-auto text-red-400")} />
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
    </Table>
  );
};

export default memo(PopularProductTable);
