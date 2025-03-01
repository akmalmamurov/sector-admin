import { CreateButton } from "../../components/create-button";
import { TableTitle } from "../../components/title";
import { memo, useState } from "react";
import { useGetPopularCategory } from "../../hooks/popular-category/get-popular-category";
import { cn } from "../../lib/utils";
import { PopularCategoryTable } from "../../components/table";
import { Select } from "../../components/ui/select";
import PopularModal from "../../components/modal/PopularModal";
import { useGetCatalog, useGetCategories, useGetSubCatalogs } from "../../hooks";

export const PopularCategory = () => {
  const { data: catalogData = [] } = useGetCatalog();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>("");
  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<string>("");

  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  
  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId,false);

  console.log(categoriesData);
  
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const { data, isError } = useGetPopularCategory(true);
  // const { data: catalogData = [] } = useGetCatalog();

  if (!data) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <>
      <div className={cn("mt-12")}>
        <div className={cn("flex justify-between mb-4")}>
          <TableTitle>Popular Category List</TableTitle>
          <CreateButton
            onClick={() => setOpen((prev) => !prev)}
            className="mt-3"
          >
            Create Popular Category
          </CreateButton>
        </div>
      </div>
      <PopularModal
        isOpen={isOpen}
        handleOpen={() => setOpen(false)}
        catalogData={catalogData}
        setSelectedCatalogId={setSelectedCatalogId}
        subCatalogData={subCatalogData}
        selectedCatalogId={selectedCatalogId}
        selectedSubCatalogId={selectedSubCatalogId}
        setSelectedSubCatalogId={setSelectedSubCatalogId}
        categoriesData={categoriesData}
      />
      <Select>
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {data.length > 0 ? (
            <PopularCategoryTable
              categoriesData={data}
              handleOpen={handleOpen}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Popular Category found for this page</p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Popular Category
              </CreateButton>
            </div>
          )}
        </div>
      </Select>
    </>
  );
};

export default memo(PopularCategory);
