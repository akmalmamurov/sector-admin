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

export const CatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Catalog>>({});
  const { mutate: deleteCatalog } = useDeleteCatalog();

  const handleOpen = (element?: Catalog) => {
    setTableElement(element || {});
    setIsOpen(true);
  };

  // ✅ `catalogData` endi faqat massiv bo‘ladi
  const { data: catalogData = [], isLoading, error } = useGetCatalog();

  const handleDelete = (id: string) => {
    deleteCatalog({ id });
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Catalog Table</h2>
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
                <TableHead>Title</TableHead>
                <TableHead>Subcatalog Count</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {catalogData.map((catalog: Catalog) => (
                <TableRow key={catalog.id}>
                  <TableCell>{catalog.title}</TableCell>
                  <TableCell>{catalog.subcatalogs?.length ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleOpen(catalog)}
                            className="w-full flex justify-center items-center"
                          >
                            <Edit className="mr-2 w-4 h-4 text-blue-600" />
                            <span className="min-w-[47px]">Edit</span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDelete(catalog.id)}
                            className="w-full flex justify-center items-center"
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
