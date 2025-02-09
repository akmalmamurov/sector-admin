import { useState } from "react";
import { CreateButton } from "../create-button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useCurrentColor, useGetCatalog, useGetSubCatalogs } from "@/hooks";
import { SubCatalogModal } from "../modal";
import { SubCatalogTable } from "../table";
import { SubCatalog } from "@/types";
import { Section } from "../section";
import { TableTitle } from "../title";

export const SubCatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<SubCatalog>>({});
  const { data: catalogData = [] } = useGetCatalog();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>( catalogData[0]?.id);
  const theme = useCurrentColor();

  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);

  const handleOpen = (elementOrIsOpen?: boolean | SubCatalog) => {
    if (typeof elementOrIsOpen === "boolean") {
      setIsOpen(elementOrIsOpen);
    } else {
      setTableElement(elementOrIsOpen || {});
      setIsOpen(true);
    }
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Subcatalog Table</TableTitle>
        <div>
          <Select
            onValueChange={(value) => setSelectedCatalogId(value)}
            defaultValue={catalogData[0]?.id}
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
        </div>

        <CreateButton onClick={() => handleOpen()}>
          Create Subcatalog
        </CreateButton>
      </div>

      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {subCatalogData?.length > 0 ? (
          <SubCatalogTable
            subCatalogData={subCatalogData}
            handleOpen={handleOpen}
          />
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
    </Section>
  );
};

export default SubCatalogList;
