import classNames from "classnames";
import { useCurrentColor, useDeleteSubCatalog } from "@/hooks";
import { UpDelete } from "../menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubCatalog } from "@/types";
import { subCatalogTableData } from "@/data";
interface Props {
  subCatalogData: SubCatalog[];
  handleOpen: (data: SubCatalog) => void;
}
export const SubCatalogTable = ({ subCatalogData, handleOpen }: Props) => {
  const { mutate: deleteSubCatalog } = useDeleteSubCatalog();
  const theme = useCurrentColor();
  const handleDelete = (id: string) => {
    deleteSubCatalog({ id });
  };
  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
        <TableRow>
          {subCatalogTableData.map((el) => (
            <TableHead
              key={el}
              className={classNames(
                "font-bold text-sm uppercase px-5 last:text-right",
                theme.text
              )}
            >
              {el}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {subCatalogData.map((sub: SubCatalog) => (
          <TableRow key={sub.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {sub.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {sub.categories?.length || 0}
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
              <UpDelete
                handleOpen={handleOpen}
                item={sub}
                handleDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubCatalogTable;
