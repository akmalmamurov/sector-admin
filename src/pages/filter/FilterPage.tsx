import { useState } from "react";
import { CreateButton } from "@/components/create-button";
import { Section } from "@/components/section";
import { TableTitle } from "@/components/title";
import { FilterModal } from "@/components/modal";
import FilterTable from "@/components/table/FilterTable";
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

const FilterPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);
  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState< string | null >(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>( null );
  const [tableElement, setTableElement] = useState({});

  const { data: catalogData = [] } = useGetCatalog();
  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId);

  const { data: filterData = [] } = useGetFilter(
    selectedCategoryId || selectedSubCatalogId
  );
  console.log(filterData);
  

  const handleOpen = (element?: any) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Filter Table</TableTitle>
        <div className="flex gap-5">
          {/* 📌 Catalog tanlash */}
          <Select
            onValueChange={(value) => {
              setSelectedCatalogId(value);
              setSelectedSubCatalogId(null);
              setSelectedCategoryId(null);
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
              setSelectedCategoryId(null);
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
            onValueChange={(value) => setSelectedCategoryId(value)}
            value={selectedCategoryId || ""}
            disabled={!selectedSubCatalogId}
          >
            <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[250px] text-sm font-semibold">
              <SelectValue placeholder="Select Category (Optional)" />
            </SelectTrigger>
            <SelectContent>
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
        <CreateButton onClick={() => handleOpen({})}>
          Create Filter
        </CreateButton>
      </div>

      {/* 📌 FilterTable (Yangi formatda) */}
      {/* <FilterTable filterData={filterData} handleOpen={handleOpen} /> */}

      <FilterModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
        catalog={catalogData}
        
      />
    </Section>
  );
};

export default FilterPage;
