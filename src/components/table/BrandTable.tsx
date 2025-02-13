import classNames from "classnames";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import { useCurrentColor, useDeleteBrand } from "@/hooks";
import { Brand } from "@/types";
import { UpDelete } from "../menu";
import { DOMAIN } from "@/constants";
export interface Props {
  handleOpen: () => void;
  brandData: Brand[];
}
export const BrandTable = ({ handleOpen, brandData }: Props) => {
  const { mutate: deleteBrand } = useDeleteBrand();
  const theme = useCurrentColor();
  const handleDelete = (id: string) => {
    deleteBrand({ id });
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            className={classNames(
              "font-medium text-sm uppercase px-5",
              theme.text
            )}
          >
            Title
          </TableHead>
          <TableHead
            className={classNames(
              "font-medium text-sm uppercase px-5",
              theme.text
            )}
          >
            Image
          </TableHead>
          <TableHead
            className={classNames(
              "font-medium text-sm uppercase px-5 text-right",
              theme.text
            )}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brandData?.map((brand) => (
          <TableRow key={brand?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {brand?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              <img src={`${DOMAIN}/${brand?.path}`} alt={brand?.title} className="w-10 h-10" />
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
    </Table>
  );
};

export default BrandTable;
