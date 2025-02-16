import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Catalog, Category, ProductRequest, SubCatalog } from "@/types";
import { Button } from "../ui/button";

interface Props {
  catalogData: Catalog[];
  subCatalogData: SubCatalog[];
  categoriesData: Category[];
  catalogId: string | null;
  setCatalogId: (value: string) => void;
  subCatalogId: string | null;
  setSubCatalogId: (value: string) => void;
  setCategoryId: (value: string) => void;
  control: Control<ProductRequest>;
  errors: FieldErrors<ProductRequest>;
  handleNext: () => void;
}

export const ProductCatalogs = ({
  control,
  catalogData,
  subCatalogData,
  categoriesData,
  catalogId,
  setCatalogId,
  subCatalogId,
  setSubCatalogId,
  setCategoryId,
  handleNext,
}: Props) => {
  const isNextDisabled = !subCatalogId && !categoriesData.length;

  return (
    <div className="grid grid-cols-3 gap-5 pb-2 ">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="catalog"
          className="text-textColor font-medium w-fit text-sm"
        >
          Catalog
        </label>
        <Select onValueChange={setCatalogId} value={catalogId || ""}>
          <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header text-sm font-semibold h-11">
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
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="subcatalog"
          className="text-textColor font-medium w-fit text-sm"
        >
          Subcatalog
        </label>
        <Controller
          name="subcatalogId"
          control={control}
          rules={{ required: "Subcatalog is required" }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                setSubCatalogId(value);
                field.onChange(value);
              }}
              value={field.value}
              disabled={!catalogId || subCatalogData?.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md px-3 h-11 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    subCatalogData?.length === 0
                      ? "No Subcatalogs found"
                      : "Select Subcatalog"
                  }
                />
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
                ))}{" "}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Category Select */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="category"
          className="text-textColor font-medium w-fit text-sm"
        >
          Category
        </label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                setCategoryId(value);
                field.onChange(value);
              }}
              value={field.value}
              disabled={!subCatalogId || categoriesData?.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    categoriesData?.length === 0
                      ? "No Categories found"
                      : "Select Category"
                  }
                />
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
          )}
        />
      </div>

      <div className="col-span-3 flex justify-end mt-4">
        <Button onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductCatalogs;
