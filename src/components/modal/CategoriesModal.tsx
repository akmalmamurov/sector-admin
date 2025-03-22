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
import { Category, CategoryRequest } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateCategory,
  useCurrentColor,
  useGetCatalog,
  useGetSubCatalogs,
  useUpdateCategory,
} from "@/hooks";
import { useSubCatalogById } from "@/hooks/sub-catalog/get-subcatalogby-id";
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";
interface CategoriesModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  element?: Category;
}

export const CategoriesModal = ({
  isOpen,
  handleOpen,
  element,
}: CategoriesModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CategoryRequest>({
    defaultValues: {
      title: "",
      subCatalogId: "",
    },
  });

  const theme = useCurrentColor();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { data: catalogs = [] } = useGetCatalog();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    null
  );
  const { data: subCatalogs = [] } = useGetSubCatalogs(selectedCatalogId);
  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<
    string | null
  >(null);
  const { data: subCatalogData } = useSubCatalogById(
    element?.subCatalogId || ""
  );
  const firstSubCatalog = subCatalogData || null;
  console.log(selectedSubCatalogId);
  
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

      if (element?.subCatalogId && firstSubCatalog) {
        setSelectedSubCatalogId(element.subCatalogId);
        if (firstSubCatalog.catalog) {
          setSelectedCatalogId(firstSubCatalog.catalog.id || null);
        }
      } else {
        setSelectedSubCatalogId(null);
        setSelectedCatalogId(catalogs[0]?.id || null);
      }
    }
  }, [isOpen, element, firstSubCatalog, catalogs, reset]);

  useEffect(() => {
    if (firstSubCatalog?.catalog) {
      setSelectedCatalogId(firstSubCatalog.catalog.id || null);
    }
  }, [firstSubCatalog]);

  const onSubmit = async (data: CategoryRequest) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("subCatalogId", data.subCatalogId);

    if (file) {
      formData.append("categoryImage", file);
    } else if (element?.path) {
      formData.append("categoryImage", element.path);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      clearErrors("categoryImage");
      setValue("categoryImage", file, { shouldDirty: true });
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
                setValue("subCatalogId", "", { shouldDirty: true });
              }}
              value={selectedCatalogId || ""}
              disabled={catalogs.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header">
                <SelectValue placeholder="Select Catalog">
                  {/* Update holatida catalog.title ni ko'rsatish */}
                  {selectedCatalogId
                    ? catalogs.find(
                        (catalog) => catalog.id === selectedCatalogId
                      )?.title
                    : "Select Catalog"}
                </SelectValue>
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
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedSubCatalogId(value);
                  }}
                  value={field.value || ""}
                  disabled={!selectedCatalogId || subCatalogs.length === 0}
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
                    {subCatalogs.length > 0 ? (
                      subCatalogs.map((subcatalog) => (
                        <SelectItem key={subcatalog.id} value={subcatalog.id}>
                          {subcatalog.title || "Create Subcatalog"}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No subcatalogs available
                      </div>
                    )}
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
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <CreateButton type="button" onClick={() => handleOpen()}>
              Cancel
            </CreateButton>
            {!element?.id ? (
              <Button
                type="submit"
                className="h-[42px] px-10"
                disabled={!isDirty}
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-[42px] px-10"
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