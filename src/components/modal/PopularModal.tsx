import { X } from "lucide-react";
import classNames from "classnames";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentColor } from "@/hooks";
import { Category, SubCatalog, Catalog } from "@/types";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import ReactSelect from "react-select";
import { useCreatePopularCategory } from "@/hooks/popular-category/create-popular-category";

interface PopularCategoryModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  selectedCatalogId: string | null;
  selectedSubCatalogId: string | null;
  selectedCategoriesData: Category[];
  subCatalogData: SubCatalog[];
  catalogData: Catalog[];
  setSelectedCatalogId: (id: string) => void;
  setSelectedSubCatalogId: (id: string) => void;
}

export const PopularCategoryModal = (props: PopularCategoryModalProps) => {
  const {isOpen, setOpen, selectedCatalogId, selectedSubCatalogId, selectedCategoriesData, subCatalogData, catalogData, setSelectedCatalogId, setSelectedSubCatalogId} = props;
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const theme = useCurrentColor();
  const handleOpen = () => {
    setOpen(!isOpen);
    setSelectedCategoryIds([]);
    setSelectedCatalogId("");
    setSelectedSubCatalogId("");
  }
  const {mutate: createPopularCategory} = useCreatePopularCategory();
  
  const handleCreatePopular = () => {
    createPopularCategory(selectedCategoryIds);
    setSelectedCategoryIds([]);
    setSelectedCatalogId("");
    setSelectedSubCatalogId("");
    handleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            Create Popular Category
          </DialogTitle>
          <button onClick={() => handleOpen()}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>

        <Select
          onValueChange={(value) => {
            setSelectedCatalogId(value);
            setSelectedSubCatalogId("");
          }}
          value={selectedCatalogId || ""}
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
        <Select
          onValueChange={(value) => setSelectedSubCatalogId(value)}
          value={selectedSubCatalogId || ""}
          disabled={!selectedCatalogId || !subCatalogData.length}
        >
          <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
            <SelectValue placeholder="Select Subcatalog" />
          </SelectTrigger>
          <SelectContent className={theme.bg}>
            {subCatalogData.map((subcatalog) => (
              <SelectItem
                key={subcatalog.id}
                value={subcatalog.id}
                className="text-header cursor-pointer"
              >
                {subcatalog.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ReactSelect
          options={selectedCategoriesData.map((category) => ({
            label: category.title,
            value: category.id,
          }))}
          isMulti
          onChange={(selectedOptions) =>
            setSelectedCategoryIds(
              selectedOptions
                ? selectedOptions.map((option) => option.value)
                : []
            )
          }
          placeholder="Select Categories"
          className={classNames(
            theme.text,
            theme.bg,
          )}
        />

        <Button
          onClick={handleCreatePopular}
          disabled={selectedCategoryIds.length === 0}
          className={classNames("w-full disabled:opacity-50")}
        >
          Create
        </Button>

        <DialogDescription className="hidden">a</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PopularCategoryModal;
