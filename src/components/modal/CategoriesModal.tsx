import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { CreateButton } from "../create-button";
import { useEffect, useState } from "react";
import { Catalog, Category, CategoryRequest } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCategory, useCurrentColor, useGetSubCatalogs } from "@/hooks";
import { X } from "lucide-react";

interface CategoriesModalProps {
  isOpen: boolean;
  handleOpen: (elementOrIsOpen?: boolean | Category) => void;
  element: Partial<Category>;
  catalogs: Catalog[];
}

export const CategoriesModal = ({
  isOpen,
  handleOpen,
  catalogs,
  element,
}: CategoriesModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRequest>();

  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    catalogs.length > 0 ? catalogs[0].id : null
  );

  const theme = useCurrentColor();
  const { data: subCatalogs = [] } = useGetSubCatalogs(selectedCatalogId);
  const { mutate: createCategory } = useCreateCategory();

  const onSubmit = (data: CategoryRequest) => {
    createCategory(
      {
        ...data,
        title: data.title.trim(),
        path: data.path.trim(),
      },
      {
        onSuccess: () => {
          handleOpen(false);
          reset();
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: element?.title || "",
        path: element?.path || "",
        subCatalogId: element?.subCatalogId || "",
      });

      setSelectedCatalogId(catalogs.length > 0 ? catalogs[0].id : null);
    }
  }, [isOpen, element, catalogs, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Category"
              : "Update Category"}{" "}
          </DialogTitle>
        </DialogHeader>
        <button onClick={() => handleOpen(false)}>
          <X
            className={classNames(theme.text, "w-6 h-6 absolute top-4 right-4")}
          />
        </button>
        <DialogDescription className="hidden">s</DialogDescription>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className={`block mb-1 ${theme.text}`}>Select Catalog</label>
            <Select
              onValueChange={(value) => {
                setSelectedCatalogId(value);
                reset({ subCatalogId: "" });
              }}
              value={selectedCatalogId || ""}
            >
              <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header">
                <SelectValue placeholder="Select Catalog" />
              </SelectTrigger>
              <SelectContent className={`${theme.bg} ${theme.text}`}>
                {catalogs.map((catalog) => (
                  <SelectItem key={catalog.id} value={catalog.id}>
                    {catalog.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className={`block mb-1 ${theme.text}`}>
              Select Subcatalog
            </label>
            <Controller
              name="subCatalogId"
              control={control}
              rules={{ required: "Subcatalog is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={!selectedCatalogId}
                >
                  <SelectTrigger
                    className={classNames(
                      "border border-header rounded-md px-3 text-header ring-header focus:ring-header",
                      errors.subCatalogId ? "ring-red-500 border-red-500" : ""
                    )}
                  >
                    <SelectValue placeholder="Select Subcatalog" />
                  </SelectTrigger>
                  <SelectContent className={`${theme.bg} ${theme.text}`}>
                    {subCatalogs.map((subcatalog) => (
                      <SelectItem key={subcatalog.id} value={subcatalog.id}>
                        {subcatalog.title || "Create Subcatalog"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subCatalogId && (
              <span className="text-red-500">
                {errors.subCatalogId.message}
              </span>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text}`,
                errors.title
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Category Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              {...register("path", { required: "Path is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text}`,
                errors.path
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Category Title"
            />
            {errors.path && (
              <span className="text-red-500">{errors.path.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <CreateButton type="button" onClick={() => handleOpen(false)}>
              Cancel
            </CreateButton>
            <CreateButton type="submit">
              {Object.keys(element).length === 0 ? "Create" : "Update"}
            </CreateButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesModal;
