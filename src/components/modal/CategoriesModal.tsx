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
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";

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
    setError,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm<CategoryRequest>();

  const theme = useCurrentColor();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
  const onSubmit = async (data: CategoryRequest) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("subCatalogId", data.subCatalogId);

    if (file) {
      formData.append("categoryImage", file);
    } else if (element?.path) {
      formData.append("categoryImage", element.path);
    } else {
      setError("categoryImage", {
        type: "manual",
        message: "Image is required",
      });
      return;
    }

    if (element?.id) {
      updateCategory(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpen();
            reset();
            setPreview(null);
            setFile(null);
          },
        }
      );
    } else {
      createCategory(formData, {
        onSuccess: () => {
          handleOpen();
          reset();
          setPreview(null);
          setFile(null);
        },
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: element?.title || "",
        subCatalogId: element?.subCatalogId || "",
      });

      if (element?.path) {
        setPreview(`${DOMAIN}/${element.path}`);
      } else {
        setPreview(null);
      }

      if (element?.subCatalogId) {
        setSelectedSubCatalogId(element.subCatalogId);
        const relatedCatalog = subCatalogs.find(
          (sc) => sc.id === element.subCatalogId
        )?.catalogId;

        if (relatedCatalog) {
          setSelectedCatalogId(relatedCatalog);
        }
      } else {
        setSelectedCatalogId(null);
        setSelectedSubCatalogId(null);
      }
    }
  }, [isOpen, element, catalogs, subCatalogs, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      clearErrors("categoryImage");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
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

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="categoryImage-upload"
            />
            <label
              htmlFor="categoryImage-upload"
              className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
            >
              Upload Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="Category Preview"
                className="mt-2 max-h-32 mx-auto"
              />
            )}
            {errors.categoryImage && (
              <span className="text-red-500">
                {errors.categoryImage.message}
              </span>
            )}
          </div>

          {/* Tugmalar */}
          <div className="flex justify-end gap-4 mt-4">
            <CreateButton type="button" onClick={() => handleOpen()}>
              Cancel
            </CreateButton>
            {!element?.id ? (
              <Button
                type="submit"
                className="h-[42px] px-10 "
                disabled={!isDirty}
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-[42px] px-10 "
                disabled={!isDirty}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesModal;
