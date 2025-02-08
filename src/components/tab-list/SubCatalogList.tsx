import { useState } from "react";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { CreateButton } from "../create-button";
import { Button } from "@/components/ui/button";
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
import { SubCatalog } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteSubCatalog, useGetCatalog, useGetSubCatalogs } from "@/hooks";
import { SubCatalogModal } from "../modal";

export const SubCatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<SubCatalog>>({});
  const { data: catalogData = [] } = useGetCatalog();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    catalogData[0]?.id
  );

  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  const { mutate: deleteSubCatalog } = useDeleteSubCatalog();
  const handleOpen = (elementOrIsOpen?: boolean | SubCatalog) => {
    if (typeof elementOrIsOpen === "boolean") {
      setIsOpen(elementOrIsOpen);
    } else {
      setTableElement(elementOrIsOpen || {});
      setIsOpen(true);
    }
  };
  const handleDelete = (id: string) => {
    deleteSubCatalog({ id });
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subcatalog Table</h2>

        <div>
          <Select
            onValueChange={(value) => setSelectedCatalogId(value)}
            defaultValue={catalogData[0]?.id}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
              <SelectValue placeholder="Select Catalog" />
            </SelectTrigger>
            <SelectContent>
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
        </div>

        <CreateButton onClick={() => handleOpen()}>
          Create Subcatalog
        </CreateButton>
      </div>

      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {subCatalogData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Categories Count</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subCatalogData.map((sub: SubCatalog) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.title}</TableCell>
                  <TableCell>{sub.categories?.length || 0}</TableCell>
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
                            onClick={() => handleOpen(sub)}
                            className="w-full flex justify-center items-center"
                          >
                            <Edit className="mr-2 w-4 h-4 text-blue-600" />
                            <span className="min-w-[47px]">Edit</span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDelete(sub.id)}
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
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No subcatalogs found for this catalog</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Subcatalog
            </CreateButton>
          </div>
        )}
      </div>
      <SubCatalogModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        catalogs={catalogData}
      />
    </div>
  );
};

export default SubCatalogList;
