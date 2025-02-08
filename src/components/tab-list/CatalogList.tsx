import { useState } from "react";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { CreateButton } from "../create-button";
import { CatalogModal } from "../modal";
import { useGetCatalog } from "@/hooks/catalog/get-catalog";
import { useDeleteCatalog } from "@/hooks/catalog/delete-catalog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Catalog } from "@/types";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";

export const CatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Catalog>>({});
  const { mutate: deleteCatalog } = useDeleteCatalog();
  const theme = useCurrentColor();
  const handleOpen = (element?: Catalog) => {
    setTableElement(element || {});
    setIsOpen(true);
  };

  const { data: catalogData = [], isLoading, error } = useGetCatalog();

  const handleDelete = (id: string) => {
    deleteCatalog({ id });
  };

  return (
    <div className={classNames("p-6  rounded-md shadow-md", theme.sidebar)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={classNames("text-xl font-semibold", theme.text)}>
          Catalog Table
        </h2>
        <CreateButton onClick={() => handleOpen()}>Create Catalog</CreateButton>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
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
                  Subcatalog Count
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
              {catalogData.map((catalog: Catalog) => (
                <TableRow key={catalog.id}>
                  <TableCell
                    className={classNames("text-sm px-6 py-1", theme.text)}
                  >
                    {catalog.title}
                  </TableCell>
                  <TableCell
                    className={classNames("text-sm px-6 py-1", theme.text)}
                  >
                    {catalog.subcatalogs?.length ?? 0}
                  </TableCell>
                  <TableCell
                    className={classNames(
                      "text-sm px-6 py-1 text-end",
                      theme.text
                    )}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal
                            className={classNames("w-4 h-4", theme.text)}
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={classNames(theme.bg)}
                      >
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleOpen(catalog)}
                            className="w-full flex justify-center items-center"
                          >
                            <Edit className="mr-2 w-4 h-4 text-blue-600" />
                            <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDelete(catalog.id)}
                            className={classNames("w-full flex justify-center items-center", theme.text)}
                          >
                            <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                            Delete
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CatalogModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </div>
  );
};

export default CatalogList;
