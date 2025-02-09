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
    setIsOpen(true);
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
          <CatalogTable catalogData={catalogData} handleOpen={handleOpen} />
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
