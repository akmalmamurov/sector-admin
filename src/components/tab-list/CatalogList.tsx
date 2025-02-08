import { useState } from "react";
import { CreateButton } from "../create-button";
import { CatalogModal } from "../modal";
import { useGetData } from "@/hooks";
import { Catalog, PageInterface } from "@/types"; // Global types
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const CatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const {
    data: catalogResponse,
    isLoading,
    error,
  } = useGetData<PageInterface<Catalog[]>>("/catalog/with-subcatalogs");

  const catalogData = catalogResponse?.data || [];

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Catalog Table</h2>
        <CreateButton onClick={toggleOpen}>Create Catalog</CreateButton>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subcatalog Count</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogData.map((catalog) => (
              <TableRow key={catalog.id}>
                <TableCell>{catalog.title}</TableCell>
                <TableCell>{catalog.subcatalogs.length}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CatalogModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default CatalogList;
