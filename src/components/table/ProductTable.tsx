import { useCurrentColor } from "@/hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
 import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { ProductData } from "@/types";
import { DOMAIN } from "@/constants";
import { priceFormat } from "@/utils";

interface Props {
  productData: ProductData[];
}
export const ProductTable = ({ productData }: Props) => {
  const theme = useCurrentColor();
  console.log(productData);

  return (
    <Table>
      <TableHeader className={`${theme.header}`}>
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
              "font-bold text-sm uppercase px-5 text-right",
              theme.text
            )}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productData?.map((product) => (
          <TableRow key={product?.id}>
            <TableCell
              className={classNames("text-sm px-6 py-1 w-1/3", theme.text)}
            >
              {product?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              <img src={`${DOMAIN}/${product?.images}`} alt="" />
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {product.inStock}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {product.productCode}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {priceFormat(product.price)} summ
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
                    <button className="flex items-center justify-center px-3 py-2 w-full">
                      <Edit className="mr-2 w-4 h-4 text-blue-600" />
                      <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
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
  );
};

export default ProductTable;
