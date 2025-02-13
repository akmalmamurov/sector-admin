import { Controller, Control, FieldErrors } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Catalog, Category, SubCatalog, FilterFormData } from "@/types";

interface Props {
  catalog: Catalog[];
  subCatalogData: SubCatalog[];
  categoriesData: Category[];
  catalogId?: string | null;
  setCatalogId: (value: string) => void;
  subCatalogId: string | null;
  setSubCatalogId: (value: string) => void;
  setCategoryId: (value: string) => void;
  control: Control<FilterFormData>;
  errors: FieldErrors<FilterFormData>;
}

export const FilterTopSelect = ({
  catalog,
  subCatalogData,
  categoriesData,
  catalogId,
  setCatalogId,
  subCatalogId,
  setSubCatalogId,
  setCategoryId,
  control,
  errors,
}: Props) => {
  return (
    <div className="grid grid-cols-3 gap-5 border-b pb-2 border-header">
      {/* Catalog Select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="catalog" className="text-textColor font-medium w-fit text-sm">
          Catalog
        </label>
        <Select onValueChange={setCatalogId} value={catalogId || ""}>
          <SelectTrigger
            id="catalog"
            className="border border-header rounded-md px-3 text-header ring-header focus:ring-header text-sm font-semibold h-11"
          >
            <SelectValue placeholder="Select Catalog" />
          </SelectTrigger>
          <SelectContent>
            {catalog.map(({ id, title }) => (
              <SelectItem key={id} value={id} className="text-header cursor-pointer">
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcatalog Select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="subcatalog" className="text-textColor font-medium w-fit text-sm">
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
              disabled={!catalogId}
            >
              <SelectTrigger
                id="subcatalog"
                className="border border-header rounded-md px-3 h-11 text-header ring-header focus:ring-header text-sm font-semibold"
              >
                <SelectValue placeholder="Select SubCatalog" />
              </SelectTrigger>
              <SelectContent>
                {subCatalogData.map(({ id, title }) => (
                  <SelectItem key={id} value={id} className="text-header cursor-pointer">
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subcatalogId && <p className="text-red-500 text-xs">{errors.subcatalogId.message}</p>}
      </div>

      {/* Category Select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-textColor font-medium w-fit text-sm">
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
              disabled={!subCatalogId}
            >
              <SelectTrigger
                id="category"
                className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold"
              >
                <SelectValue placeholder="Select Category (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {categoriesData.map(({ id, title }) => (
                  <SelectItem key={id} value={id} className="text-header cursor-pointer">
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};
