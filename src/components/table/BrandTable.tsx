import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCurrentColor, useDeleteBrand } from "@/hooks";
import { BrandResponse, Brand } from "@/types";
import { UpDelete } from "../menu";
import { DOMAIN } from "@/constants";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "../ui/dialog";
import { X } from "lucide-react";
import Pagination from "../pagination/Pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

export interface Props {
  handleOpen: (element: Brand) => void;
  brandData: BrandResponse,
  page: number,
  setPage: (page: number) => void,
  limit: number,
  setLimit: (limit: number) => void,
}
export const BrandTable = ({ handleOpen, brandData, page, setPage, limit, setLimit }: Props) => {
  const { mutate: deleteBrand } = useDeleteBrand();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useCurrentColor();
  const handleDelete = (id: string) => {
    deleteBrand({ id });
  };
  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };
  return (
    <div className="flex flex-col h-full">
      <Table>
        <TableHeader className={`${theme.header}`}>
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
              Description
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
          {brandData?.data?.brands?.map((brand, idx) => (
            <TableRow key={brand?.id}>
              <TableCell
                className={classNames("text-sm pl-5 py-1", theme.text)}
              >
                {(page - 1) * brandData.data.limitNumber + idx + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {brand?.title}
              </TableCell>
              <TableCell
                title={brand?.description}
                className={classNames(
                  "text-sm px-6 py-1 max-w-[200px] line-clamp-1",
                  theme.text
                )}
              >
                {brand?.description}
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
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <UpDelete
                  item={brand}
                  handleOpen={handleOpen}
                  handleDelete={handleDelete}
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
      </Table>
      <div className="flex items-center justify-center gap-4 mt-auto">
        <Select onValueChange={(value) => setLimit(Number(value))} value={limit.toString()}>
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
          page={page}
          setPage={setPage}
          total={brandData?.data?.total}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default BrandTable;
