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
import { memo, useState } from "react";
import { useCreateToggleProduct } from "@/hooks/product/create-popular-product";
import { ChangePopularOrderMenu, DeleltePopular, HandleImage } from "../change-order/change-popular";
import { IpopularProduct } from "@/hooks/product/get-products-popular";
import { DOMAIN } from "@/constants";
import { ChangeOrderDialog } from "../change-order/change-order.menu";
import { useChangeOrder } from "@/hooks/change-order/change-order";

interface Props {
  productData: IpopularProduct[];
}

export const PopularProductTable = ({ productData }: Props) => {

  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [orderData, setOrderData] = useState<{ id: string; index: number } | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const { mutate: togglePopularProduct } = useCreateToggleProduct();
  const { mutate: changeOrder } = useChangeOrder();


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

  const handleChangeOrder = (id: string, index: number) => {
    changeOrder({ id: id, index: index, name: "popularProduct" });
    setOrderData({ id: "", index: 0 });
    setIsOrderOpen(false);
  };  

  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
        <TableRow>
          {["Id", "Title", "Product code", "Is Popular", "Image", "Action"].map(
            (item, index) => (
              <TableHead
                key={index}
                className={classNames(
                  `font-bold text-sm uppercase px-5 ${
                    item === "Action" ? "text-right" : ""
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
        {productData
          ?.filter(
            (product: IpopularProduct) => product.product && product.product.id
          )
          .map((product: IpopularProduct, index) => (
            <TableRow key={product?.id}>
              <TableCell
                className={classNames("text-sm pl-6 py-1", theme.text)}
              >
                {index + 1}
              </TableCell>
              <TableCell
                title={product?.product?.title}
                className={classNames(
                  "text-sm px-6 py-1 max-w-[200px] truncate",
                  theme.text
                )}
              >
                {product?.product?.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {product?.product?.productCode}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {product?.product?.id ? "Popular" : "Not Popular"}
              </TableCell>

              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleImage(product?.product?.mainImage)}
              >
                <img
                  src={`${DOMAIN}/${product?.product?.mainImage}`}
                  alt={product?.product?.title}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames("text text-red-400 text-end", theme.text)}
              >
                <ChangePopularOrderMenu
                  id={product?.product?.id}
                  handleDelete={handleDelete}
                  setOrderData={setOrderData}
                  setIsOrderOpen={setIsOrderOpen}
                  valueId={product?.id}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <HandleImage isOpen={isOpen} setIsOpen={setIsOpen} image={image ?? ""} />

      <DeleltePopular
        deleteIsOpen={deleteIsOpen}
        setDeleteIsOpen={setDeleteIsOpen}
        handleDeletePopular={handleDeleteProduct}
        handleCancel={handleCancel}
        title="Popular Product"
      />

      <ChangeOrderDialog
        isOpen={isOrderOpen}
        setIsOpen={setIsOrderOpen}
        setOrderData={setOrderData}
        orderData={orderData as { id: string; index: number }}
        length={productData.length}
        handleChangeOrder={handleChangeOrder}
        name="Popular Product"
      />
    </Table>
  );
};

export default memo(PopularProductTable);
