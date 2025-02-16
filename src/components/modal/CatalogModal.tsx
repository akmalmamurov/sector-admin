import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useEffect } from "react";
import { Catalog } from "@/types";
import { useCreateCatalog } from "@/hooks/catalog/create-catalog";
import { useUpdateCatalog } from "@/hooks/catalog/update-catalog";
import { useCurrentColor } from "@/hooks";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface CatalogRequest {
  title: string;
}

interface CatalogModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  element: Partial<Catalog>;
}

export const CatalogModal = ({
  isOpen,
  handleOpen,
  element,
}: CatalogModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CatalogRequest>({
    defaultValues: {
      title: element?.title || "",
    },
  });
  const theme = useCurrentColor();
  const { mutate: createCatalog } = useCreateCatalog();

  const { mutate: updateCatalog } = useUpdateCatalog();

  const onSubmit = (data: CatalogRequest) => {
    if (element?.id) {
      updateCatalog(
        { id: element.id, data },
        {
          onSuccess: () => {
            handleOpen();
            reset();
          },
        }
      );
    } else {
      createCatalog(
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
      reset({
        title: element?.title || "",
      });
    }
  }, [isOpen, element, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Catalog"
              : "Update Catalog"}
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
        <DialogDescription className="hidden">a</DialogDescription>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.title
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Catalog Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
       
            <Button className="w-full" type="submit" disabled={!isDirty}>
              {Object.keys(element).length === 0 ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogModal;
