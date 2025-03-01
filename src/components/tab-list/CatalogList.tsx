import { useState } from "react";

import { CreateButton } from "../create-button";
import { LoadingData } from "../loading";
import { CatalogModal } from "../modal";
import { CatalogTable } from "../table";
import { TableTitle } from "../title";
import { Section } from "../section";
import { Catalog } from "@/types";
interface CatalogListProps {
  catalogData: Catalog[];
  isLoading: boolean;
  error: Error;
}

export const CatalogList = ({ catalogData, isLoading, error }: CatalogListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Catalog>>({});

  const handleOpen = (element?: Catalog) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

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
