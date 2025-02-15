import { useState } from "react";
import { CreateButton } from "../create-button";
import { CatalogModal } from "../modal";
import { useGetCatalog } from "@/hooks/catalog/get-catalog";

import { Catalog } from "@/types";
import { CatalogTable } from "../table";
import { Section } from "../section";
import { LoadingData } from "../loading";
import { TableTitle } from "../title";

export const CatalogList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Catalog>>({});

  const handleOpen = (element?: Catalog) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  const { data: catalogData = [], isLoading, error } = useGetCatalog();

  

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Catalog Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create Catalog</CreateButton>
      </div>

      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {catalogData?.length > 0 ? (
            <CatalogTable catalogData={catalogData} handleOpen={handleOpen} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No catalog found </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Catalog
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <CatalogModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </Section>
  );
};

export default CatalogList;
