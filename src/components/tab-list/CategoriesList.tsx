import { CreateButton } from "../create-button";
import { useCurrentColor, useGetCatalog, useGetCategories, useGetSubCatalogs } from "@/hooks";
import CategoriesModal from "../modal/CategoriesModal";
import { CategoryTable } from "../table";
import { Section } from "../section";
import { TableTitle } from "../title";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCatalogSelection, useModal, useSubCatalogSelection } from "@/helpers";
import { Category } from "@/types";

export const CategoriesList = () => {
  const { data: catalogData = [] } = useGetCatalog();
  const { selectedCatalogId, setSelectedCatalogId } = useCatalogSelection(catalogData);

  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  const { selectedSubCatalogId, setSelectedSubCatalogId } = useSubCatalogSelection(subCatalogData, selectedCatalogId);

  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId);
  const { isOpen, handleOpen, tableElement } = useModal();

  const theme = useCurrentColor();
  

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Categories List</TableTitle>
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
                <SelectItem key={catalog.id} value={catalog.id} className="text-header cursor-pointer">
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
                <SelectItem key={subcatalog.id} value={subcatalog.id} className="text-header cursor-pointer">
                  {subcatalog.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CreateButton onClick={() => handleOpen()}>Create Category</CreateButton>
      </div>

      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {categoriesData.length > 0 ? (
          <CategoryTable categoriesData={categoriesData} handleOpen={handleOpen} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No categories found for this subcatalog</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Category
            </CreateButton>
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      <CategoriesModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement as Category}
        catalogs={catalogData}
        subCatalogs={subCatalogData}
      />
    </Section>
  );
};

export default CategoriesList;
