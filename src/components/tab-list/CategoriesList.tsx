import { useState } from "react";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { CreateButton } from "../create-button";
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
import { Category } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCurrentColor,
  useDeleteCategory,
  useGetCatalog,
  useGetCategories,
  useGetSubCatalogs,
} from "@/hooks";
import CategoriesModal from "../modal/CategoriesModal";
import classNames from "classnames";

export const CategoriesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Category>>({});

  const { data: catalogData = [] } = useGetCatalog();

  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    catalogData.length > 0 ? catalogData[0]?.id : null
  );

  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);

  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<
    string | null
  >(subCatalogData.length > 0 ? subCatalogData[0]?.id : null);

  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId);
  const theme = useCurrentColor();

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleOpen = (elementOrIsOpen?: boolean | Category) => {
    if (typeof elementOrIsOpen === "boolean") {
      setIsOpen(elementOrIsOpen);
    } else {
      setTableElement(elementOrIsOpen || {});
      setIsOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory({ id });
  };

  return (
    <div className={classNames("p-6  rounded-md shadow-md", theme.sidebar)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={classNames("text-xl font-semibold", theme.text)}>
          Categories List
        </h2>
        <div className="flex gap-5">
          <Select
            onValueChange={(value) => {
              setSelectedCatalogId(value);
              setSelectedSubCatalogId(null);
            }}
            value={selectedCatalogId || ""}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
              <SelectValue placeholder="Select Catalog" />
            </SelectTrigger>
            <SelectContent className={theme.bg}>
              {catalogData.map((catalog) => (
                <SelectItem
                  key={catalog.id}
                  value={catalog.id}
                  className="text-header cursor-pointer"
                >
                  {catalog.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setSelectedSubCatalogId(value)}
            value={selectedSubCatalogId || ""}
            disabled={!selectedCatalogId}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
              <SelectValue placeholder="Select Subcatalog" />
            </SelectTrigger>
            <SelectContent className={theme.bg}>
              {subCatalogData.map((subcatalog) => (
                <SelectItem
                  key={subcatalog.id}
                  value={subcatalog.id}
                  className="text-header cursor-pointer"
                >
                  {subcatalog.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CreateButton onClick={() => handleOpen()}>
          Create Categories
        </CreateButton>
      </div>

      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {categoriesData.length > 0 ? (
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
                  <TableCell
                    className={classNames("text-sm px-6 py-1", theme.text)}
                  >
                    {category?.title}
                  </TableCell>
                  <TableCell
                    className={classNames("text-sm px-6 py-1", theme.text)}
                  >
                    {category?.path}
                  </TableCell>
                  <TableCell
                    className={classNames(
                      "text-sm px-6 py-1 text-end",
                      theme.text
                    )}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 p-0  ">
                          <MoreHorizontal
                            className={classNames("w-4 h-4 ", theme.text)}
                          />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={classNames(theme.bg)}
                      >
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleOpen(category)}
                            className="w-full flex justify-center items-center"
                          >
                            <Edit className="mr-2 w-4 h-4 text-blue-600" />
                            <span className={`min-w-[47px] ${theme.text}`}>
                              Edit
                            </span>
                          </button>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className={classNames(
                              "w-full flex justify-center items-center",
                              theme.text
                            )}
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
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No categories found for this subcatalog</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Category
            </CreateButton>
          </div>
        )}
      </div>

      <CategoriesModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        catalogs={catalogData}
      />
    </div>
  );
};

export default CategoriesList;
