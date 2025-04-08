import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks";
import { IPopularCategory } from "@/types";
import classNames from "classnames";
import { DOMAIN } from "@/constants";
import { memo, useState } from "react";

import { useCreateToggleCategory } from "@/hooks/popular-category/create-popular-category";
import { useChangeOrder } from "@/hooks/change-order/change-order";
import { ChangeOrderDialog } from "../change-order/change-order.menu";
import { DeleltePopular, HandleImage, ChangePopularOrderMenu } from "../change-order/change-popular";

interface Props {
  categoriesData: IPopularCategory[];
  handleOpen: () => void; 
}

export const PopularCategoryTable = ({ categoriesData }: Props) => {
  const theme = useCurrentColor();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const { mutate: togglePopularCategory } = useCreateToggleCategory();
  const [orderData, setOrderData] = useState<{ id: string; index: number }>({ id: "", index: 0 });
  const [isOrderOpen, setIsOrderOpen] = useState(false);  

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteIsOpen(true);
  };
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  const handleDeleteCategory = () => {
    if (deleteId) {
      togglePopularCategory([deleteId]);
      setDeleteIsOpen(false);
    }
  };

  const handleCancel = () => {
    setDeleteIsOpen(false);
    setDeleteId(null);
  };


  const { mutate: changeOrder } = useChangeOrder();

  const handleChangeOrder = (id: string, index: number) => {
    changeOrder({ id: id, index: index, name: "popularCategory" });
    setOrderData({ id: "", index: 0 });
    setIsOrderOpen(false);
  };  

  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
        <TableRow>
          {["Id", "Title", "Is Popular", "Image", "Action"].map(
            (item, index) => (
              <TableHead
                key={index}
                className={classNames(
                  `font-bold text-sm uppercase px-5 ${
                    item === "Action" ? "text-end" : ""
                  }`,
                  theme.text
                )}
              >
                {item}
              </TableHead>
            )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoriesData?.map(
          (popularCategory: IPopularCategory, index: number) => (
            <TableRow key={popularCategory?.id}>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {popularCategory?.category?.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {popularCategory?.category?.id ? "Popular" : "Not Popular"}
              </TableCell>

              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleImage(popularCategory?.category?.path)}
              >
                <img
                  src={`${DOMAIN}/${popularCategory?.category?.path}`}
                  alt={popularCategory?.category?.title}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames("text text-red-400 text-end", theme.text)}
              >
                <ChangePopularOrderMenu
                  id={popularCategory?.category?.id}
                  handleDelete={handleDelete}
                  setOrderData={setOrderData}
                  setIsOrderOpen={setIsOrderOpen}
                  valueId={popularCategory?.id}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      {/* handle image */}
      <HandleImage
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        image={image ?? ""}
      />
      {/* handle delete */}
      <DeleltePopular
        deleteIsOpen={deleteIsOpen}
        setDeleteIsOpen={setDeleteIsOpen}
        handleDeletePopular={handleDeleteCategory}
        handleCancel={handleCancel}
        title="Popular Category"
      />
      {/* handle order */}
      <ChangeOrderDialog
        isOpen={isOrderOpen}
        setIsOpen={setIsOrderOpen}
        setOrderData={setOrderData}
        orderData={orderData}
        length={categoriesData.length}
        handleChangeOrder={handleChangeOrder}
        name="Popular Category"
      />
    </Table>
  );
};

export default memo(PopularCategoryTable);
