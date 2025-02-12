import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { CreateButton } from "../create-button";
import { useEffect } from "react";
import { Catalog, SubCatalog } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSubCatalog,
  useCurrentColor,
  useUpdateSubCatalog,
} from "@/hooks";
import { X } from "lucide-react";

interface SubCatalogRequest {
  title: string;
  catalogId: string;
}

interface SubCatalogModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  element: Partial<SubCatalog>;
  catalogs: Catalog[];
}

export const SubCatalogModal = ({
  isOpen,
  handleOpen,
  element,
  catalogs,
}: SubCatalogModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SubCatalogRequest>();

  const { mutate: createSubCatalog } = useCreateSubCatalog();
  const { mutate: updateSubCatalog } = useUpdateSubCatalog();
  const theme = useCurrentColor();
  const onSubmit = (data: SubCatalogRequest) => {
    if (element?.id) {
      updateSubCatalog(
        { id: element.id, data },
        {
          onSuccess: () => {
            handleOpen();
            reset();
          },
        }
      );
    } else {
      createSubCatalog(
        {
          ...data,
          title: data.title.trim(),
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
      if (Object.keys(element).length > 0) {
        reset({
          title: element.title || "",
          catalogId: element.catalogId || "",
        });
      } else {
        reset({ title: "", catalogId: "" });
      }
    }
  }, [isOpen, element, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Subcatalog"
              : "Update Subcatalog"}
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
        <DialogDescription className="hidden">s</DialogDescription>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className={classNames("block  mb-1", theme.text)}>
              Select Catalog
            </label>
            <Select
              onValueChange={(value) => setValue("catalogId", value)}
              defaultValue={element.catalogId}
            >
              <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header">
                <SelectValue placeholder="Select Catalog" />
              </SelectTrigger>
              <SelectContent className={theme.bg}>
                {catalogs.map((catalog) => (
                  <SelectItem
                    key={catalog.id}
                    value={catalog.id}
                    className={`${theme.text} cursor-pointer`}
                  >
                    {catalog.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              placeholder="Subcatalog Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <CreateButton type="button" onClick={() => handleOpen()}>
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

export default SubCatalogModal;
