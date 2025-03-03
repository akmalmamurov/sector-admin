import { useState } from "react";
import { CreateButton } from "../create-button";
import { LoadingData } from "../loading";
import { PopularCategoryTable } from "../table";
import { TableTitle } from "../title";
import { Section } from "../section";
import { IPopularCategory, Catalog } from "@/types";
import { PopularCategoryModal } from "../modal/PopularModal";
import { useGetSubCatalogs } from "@/hooks/sub-catalog/get-subcatalog";
import { useGetCategories } from "@/hooks";

interface PopularCategoryListProps {
  categoriesData: IPopularCategory[];
  isLoading: boolean;
  error: Error;
  catalogData: Catalog[];
}

export const PopularCategoryList = ({
  categoriesData,
  isLoading,
  error,
  catalogData,
}: PopularCategoryListProps) => {
  const [isOpen, setIsOpen] = useState(false);

   const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);
   const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<string | null>(null);

   const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);

   const { data: selectedCategoriesData = [] } = useGetCategories(selectedSubCatalogId,false);


  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Popular Category Table</TableTitle>
        <CreateButton onClick={() => setIsOpen(true)}>Create Popular Category</CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {categoriesData?.length > 0 ? (
            <PopularCategoryTable categoriesData={categoriesData} handleOpen={() => setIsOpen(true)}/>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Popular Category found </p>
              <CreateButton onClick={() => setIsOpen(true)} className="mt-3">
                Create Popular Category
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <PopularCategoryModal
        selectedCatalogId={selectedCatalogId}
        selectedSubCatalogId={selectedSubCatalogId}
        selectedCategoriesData={selectedCategoriesData}
        subCatalogData={subCatalogData}
        setSelectedCatalogId={setSelectedCatalogId}
        setSelectedSubCatalogId={setSelectedSubCatalogId}
        catalogData={catalogData}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
    </Section>
  );    
};

export default PopularCategoryList;
