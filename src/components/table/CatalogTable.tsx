import classNames from "classnames";
import { UpDelete } from "../menu";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Catalog } from "@/types";
import { useCurrentColor, useDeleteCatalog } from "@/hooks";
import { catalogTableData } from "@/data";

interface CatalogTableProps {
  catalogData: Catalog[];
  handleOpen: (catalog: Catalog) => void;
}

export const CatalogTable = ({
  catalogData,
  handleOpen,
}: CatalogTableProps) => {
  const theme = useCurrentColor();
  const { mutate: deleteCatalog } = useDeleteCatalog();

  const handleDelete = (id: string) => {
    deleteCatalog({ id });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {catalogTableData.map((el) => (
            <TableHead
              key={el}
              className={classNames(
                "font-medium text-sm uppercase px-5 last:text-right",
                theme.text
              )}
            >
              {el}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {catalogData.map((catalog) => (
          <TableRow key={catalog.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {catalog.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {catalog.subcatalogs?.length ?? 0}
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
              <UpDelete
                handleOpen={handleOpen}
                item={catalog}
                handleDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CatalogTable;
