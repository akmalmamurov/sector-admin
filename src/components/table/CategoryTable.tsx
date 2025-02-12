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
interface Props {
  categoriesData: Category[];
  handleOpen: () => void;
}
export const CategoryTable = ({ handleOpen, categoriesData }: Props) => {
  const theme = useCurrentColor();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id: string) => {
    deleteCategory({ id });
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
            Categories path
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
        {categoriesData?.map((category) => (
          <TableRow key={category?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {category?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {category?.path}
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
              <UpDelete
                item={category}
                handleOpen={handleOpen}
                handleDelete={handleDelete}
                label="Category"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
