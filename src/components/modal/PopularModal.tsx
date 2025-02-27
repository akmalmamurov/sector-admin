import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentColor } from "../../hooks";
import classNames from "classnames";
import { X } from "lucide-react";
import { Catalog, Category, SubCatalog } from "../../types";
import { FC, memo, useState } from "react";
import ReactSelect from "react-select";
import { useCreatePopularCategory } from "../../hooks/popular-category/create-popular-category";

interface IPopularData {
  isOpen: boolean;
  handleOpen: () => void;
  catalogData: Catalog[];
  setSelectedCatalogId: (value: string) => void;
  setSelectedSubCatalogId: (value: string) => void;
  subCatalogData: SubCatalog[];
  selectedCatalogId: string;
  selectedSubCatalogId: string;
  categoriesData: Category[];
}
const PopularModal: FC<IPopularData> = ({
  catalogData,
  handleOpen,
  isOpen,
  selectedCatalogId,
  setSelectedCatalogId,
  setSelectedSubCatalogId,
  selectedSubCatalogId,
  subCatalogData,
  categoriesData,
}) => {
  const theme = useCurrentColor();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const categoryOptions = categoriesData.map((category: Category) => ({
    value: category.id,
    label: category.title,
  }));

  const { mutate: createPopularCategory} = useCreatePopularCategory()

  const handleCreatePopular = () => {
    console.log("Tanlangan Category IDlari:", selectedCategoryIds);
    createPopularCategory(selectedCategoryIds);
    handleOpen()
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={classNames(theme.text)}>Create Popular Category</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogClose>

        <ReactSelect
          
          onChange={(selectedOption) =>
            setSelectedCatalogId(selectedOption ? selectedOption.value : "")
          }
          value={catalogData
            .filter((item) => item.id === selectedCatalogId)
            .map((item) => ({ value: item.id, label: item.title }))}
          options={catalogData.map((catalog) => ({
            value: catalog.id,
            label: catalog.title,
          }))}
          placeholder="Select Catalog"
        />

        <ReactSelect
          onChange={(selectedOption) =>
            setSelectedSubCatalogId(selectedOption ? selectedOption.value : "")
          }
          value={subCatalogData
            .filter((item) => item.id === selectedSubCatalogId)
            .map((item) => ({ value: item.id, label: item.title }))}
          options={subCatalogData.map((subcatalog) => ({
            value: subcatalog.id,
            label: subcatalog.title,
          }))}
          placeholder="Select Subcatalog"
          isDisabled={!selectedCatalogId}
        />

        {/* Multiple Category Select */}
        <ReactSelect
          options={categoryOptions}
          isMulti
          onChange={(selectedOptions) =>
            setSelectedCategoryIds(
              selectedOptions
                ? selectedOptions.map((option) => option.value)
                : []
            )
          }
          placeholder="Select Categories"
          className="mt-4"
        />

        <button
          onClick={handleCreatePopular}
          className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Create Popular
        </button>

        <DialogDescription className="hidden">
          Description text goes here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PopularModal);
