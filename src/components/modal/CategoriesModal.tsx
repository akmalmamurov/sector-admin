import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CreateButton } from "../create-button";
import { Catalog, Category, CategoryRequest, SubCatalog } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCategory, useCurrentColor, useUpdateCategory } from "@/hooks";

interface CategoriesModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  element?: Category;
  catalogs: Catalog[];
  subCatalogs: SubCatalog[];
}

export const CategoriesModal = ({
  isOpen,
  handleOpen,
  catalogs,
  subCatalogs,
  element,
}: CategoriesModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryRequest>();
  

  const theme = useCurrentColor();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  console.log(element);

  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    element?.subCatalogId
      ? subCatalogs.find((sc) => sc.id === element.subCatalogId)?.catalogId ||
          null
      : catalogs.length > 0
      ? catalogs[0].id
      : null
  );

  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<
    string | null
  >(element?.subCatalogId || "");

  const filteredSubCatalogs = subCatalogs.filter(
    (sc) => sc.catalogId === selectedCatalogId
  );

  const onSubmit = (data: CategoryRequest) => {
    if (element?.id) {
      updateCategory(
        { id: element.id, data },
        {
          onSuccess: () => {
            handleOpen();
            reset();
          },
        }
      );
    } else {
      createCategory(
        {
          ...data,
          title: data.title.trim(),
          path: data.path.trim(),
        },
        {
          onSuccess: () => {
            handleOpen();
            reset();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: element?.title || "",
        path: element?.path || "",
        subCatalogId: element?.subCatalogId || "",
      });

      if (element?.subCatalogId) {
        setSelectedSubCatalogId(element.subCatalogId);
        const relatedCatalog = subCatalogs.find(
          (sc) => sc.id === element.subCatalogId
        )?.catalogId;
        if (relatedCatalog) {
          setSelectedCatalogId(relatedCatalog);
        }
      } else {
        setSelectedCatalogId(catalogs.length > 0 ? catalogs[0].id : null);
      }
    }
  }, [isOpen, element, catalogs, subCatalogs, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {element?.id ? "Update Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <button onClick={() => handleOpen()}>
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
                setSelectedSubCatalogId(null);
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

          {/* Subcatalog  */}
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
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedSubCatalogId(value);
                  }}
                  value={selectedSubCatalogId || ""}
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
                    {filteredSubCatalogs.map((subcatalog) => (
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

          {/* Title */}
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

          {/* Path */}
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
              placeholder="Path"
            />
            {errors.path && (
              <span className="text-red-500">{errors.path.message}</span>
            )}
          </div>

          {/* Tugmalar */}
          <div className="flex justify-end gap-4 mt-4">
            <CreateButton type="button" onClick={() => handleOpen()}>
              Cancel
            </CreateButton>
            <CreateButton type="submit">
              {element?.id ? "Update" : "Create"}
            </CreateButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesModal;
