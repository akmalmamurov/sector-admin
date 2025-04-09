import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks";
import { IPopularBrands } from "@/types";
import classNames from "classnames";
import { DOMAIN } from "@/constants";
import { memo, useState } from "react";
import { useCreateToggleBrand } from "@/hooks/brand/create-popular-brand";
import { ChangePopularOrderMenu, DeleltePopular, HandleImage } from "../change-order/change-popular";
import { ChangeOrderDialog } from "../change-order/change-order.menu";
import { useChangeOrder } from "@/hooks/change-order/change-order";

interface Props {
  popularBrandData: IPopularBrands[];
  handleOpen: () => void;
}

export const PopularBrandTable = ({ popularBrandData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { mutate: togglePopularBrand } = useCreateToggleBrand();
  const { mutate: changeOrder } = useChangeOrder();

  const [orderData, setOrderData] = useState<{ id: string; index: number }>({ id: "", index: 0 });
  const [isOrderOpen, setIsOrderOpen] = useState(false);  

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

   const handleChangeOrder = (id: string, index: number) => {
     changeOrder({ id: id, index: index, name: "popularBrand" });
     setOrderData({ id: "", index: 0 });
     setIsOrderOpen(false);
   };  

  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
        <TableRow>
          {["Id", "Title", "Is Popular", "Image", "Action"].map((title) => (
            <TableHead
              className={classNames(
                `font-bold text-sm uppercase px-5 ${
                  title === "Action" ? "text-end" : ""
                }`,
                theme.text
              )}
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {popularBrandData?.map(
          (popularBrand: IPopularBrands, index: number) => (
            <TableRow key={popularBrand?.id}>
              <TableCell
                className={classNames("text-sm pl-6 py-1", theme.text)}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {popularBrand?.brand?.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {popularBrand?.id ? "Popular" : "Not Popular"}
              </TableCell>

              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleImage(popularBrand?.brand?.path)}
              >
                <img
                  src={`${DOMAIN}/${popularBrand?.brand?.path}`}
                  alt={popularBrand?.brand?.title}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames("text text-red-400 text-end", theme.text)}
              >
                <ChangePopularOrderMenu
                  handleDelete={handleDelete}
                  setOrderData={setOrderData}
                  setIsOrderOpen={setIsOrderOpen}
                  id={popularBrand.brand?.id}
                  valueId={popularBrand.id}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      {/* handle image */}
      <HandleImage isOpen={isOpen} setIsOpen={setIsOpen} image={image ?? ""} />
      {/* handle delete */}
      <DeleltePopular
        deleteIsOpen={deleteIsOpen}
        setDeleteIsOpen={setDeleteIsOpen}
        handleDeletePopular={handleDeleteBrand}
        handleCancel={handleCancel}
        title="Popular Brand"
      />

      {/* handle order */}
      <ChangeOrderDialog
        isOpen={isOrderOpen}
        setIsOpen={setIsOrderOpen}
        setOrderData={setOrderData}
        orderData={orderData}
        length={popularBrandData.length}
        handleChangeOrder={handleChangeOrder}
        name="Popular Brand"
      />
    </Table>
  );
};

export default memo(PopularBrandTable);
