import { useState } from "react";
import { CreateButton } from "@/components/create-button";
import { Section } from "@/components/section";
import { TableTitle } from "@/components/title";
import { FilterModal } from "@/components/modal";
import {
  useGetCatalog,
  useGetCategories,
  useGetFilter,
  useGetSubCatalogs,
} from "@/hooks";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import FilterTable from "@/components/table/FilterTable";
import { FilterResponse } from "@/types";
import useSettings from "@/context/settings";
const FilterList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedCatalogId,
    selectedSubCatalogId,
    selectedCategoryId,
    setSelectedCatalogId,
    setSelectedSubCatalogId,
    setSelectedCategoryId,
  } = useSettings();
  const [tableElement, setTableElement] = useState({});

  const { data: catalogData = [] } = useGetCatalog();
  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId);

  const { data: filterData = [] } = useGetFilter(
    selectedCategoryId
  );
  const formattedData: FilterResponse[] = Array.isArray(filterData)
    ? filterData
    : [filterData];

  const handleOpen = (element?: FilterResponse) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  const handleCatalogChange = (value: string) => {
    setSelectedCatalogId(value);
    setSelectedSubCatalogId("");
    setSelectedCategoryId("");
  };

  const handleSubCatalogChange = (value: string) => {
    setSelectedSubCatalogId(value);
    setSelectedCategoryId("");
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Filter Table</TableTitle>
        <div className="flex gap-5">
          <Select
            onValueChange={(value) => {
              handleCatalogChange(value === "none" ? "" : value);
            }}
            value={selectedCatalogId || "none"}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Catalog" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={0} value="none">
                No selected
              </SelectItem>
              {catalogData.map(({ id, title }) => (
                <SelectItem
                  key={id}
                  value={id}
                  className="text-header cursor-pointer"
                >
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              handleSubCatalogChange(value === "none" ? "" : value);
            }}
            value={selectedSubCatalogId || "none"}
            disabled={!selectedCatalogId || !subCatalogData.length}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Subcatalog" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={1} value="none">
                No selected
              </SelectItem>
              {subCatalogData.map(({ id, title }) => (
                <SelectItem
                  key={id}
                  value={id}
                  className="text-header cursor-pointer"
                >
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              setSelectedCategoryId(value === "none" ? "" : value);
            }}
            value={selectedCategoryId || "none"}
            disabled={!selectedSubCatalogId || !categoriesData.length}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Category (Optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={2} value="none">
                No selected
              </SelectItem>
              {categoriesData.map(({ id, title }) => (
                <SelectItem
                  key={id}
                  value={id}
                  className="text-header cursor-pointer"
                >
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CreateButton onClick={() => handleOpen()}>Create Filter</CreateButton>
      </div>

      {formattedData.length === 0 ||
      formattedData.every((item) => item.data.length === 0) ? (
        <div className="p-4 text-center text-gray-500">
          <p>No filter found </p>
          <CreateButton onClick={() => handleOpen()} className="mt-3">
            Create Filter
          </CreateButton>
        </div>
      ) : (
        <FilterTable
          selectedSubCatalogId={selectedSubCatalogId || ""}
          selectedCategoryId={selectedCategoryId || ""}
          filterData={formattedData}
          handleOpen={handleOpen}
        />
      )}

      <FilterModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        catalog={catalogData}
        catalogApi={selectedCatalogId}
      />
    </Section>
  );
};

export default FilterList;
