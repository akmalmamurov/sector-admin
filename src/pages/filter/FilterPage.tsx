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

const FilterPage = () => {
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


  const { data: filterData = [] } = useGetFilter(selectedCategoryId || selectedSubCatalogId);
  const formattedData: FilterResponse[] = Array.isArray(filterData)
    ? filterData
    : [filterData];

  const handleOpen = (element?: FilterResponse) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Filter Table</TableTitle>
        <div className="flex gap-5">
          <Select
            onValueChange={(value) => {
              setSelectedCatalogId(value);
            }}
            value={selectedCatalogId || ""}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Catalog" />
            </SelectTrigger>
            <SelectContent>
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

          {/* 📌 SubCatalog tanlash */}
          <Select
            onValueChange={(value) => {
              setSelectedSubCatalogId(value);
            }}
            value={selectedSubCatalogId || ""}
            disabled={!selectedCatalogId}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Subcatalog" />
            </SelectTrigger>
            <SelectContent>
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

          {/* 📌 Categories tanlash */}
          <Select
            onValueChange={(value) => {
              setSelectedCategoryId(value);
            }}
            value={selectedCategoryId || ""}
            disabled={!selectedSubCatalogId}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Category (Optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null" className="text-header cursor-pointer">
                No Category (Use SubCatalog)
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
        <FilterTable filterData={formattedData} handleOpen={handleOpen} />
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

export default FilterPage;
