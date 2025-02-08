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
import { Catalog } from "@/types";
import { useCreateCatalog } from "@/hooks/catalog/create-catalog";
import { useUpdateCatalog } from "@/hooks/catalog/update-catalog";

interface CatalogRequest {
  title: string;
}

interface CatalogModalProps {
  isOpen: boolean;
  handleOpen: (elementOrIsOpen?: Catalog | boolean) => void;
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
    formState: { errors },
  } = useForm<CatalogRequest>({
    defaultValues: {
      title: element?.title || "",
    },
  });

  const { mutate: createCatalog } = useCreateCatalog();

  const { mutate: updateCatalog } = useUpdateCatalog();

  const onSubmit = (data: CatalogRequest) => {
    if (element?.id) {
      updateCatalog(
        { id: element.id, data },
        {
          onSuccess: () => {
            handleOpen(false);
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
            handleOpen(false);
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
      <DialogContent>
        <DialogHeader className="font-bold">
          <DialogTitle>
            {Object.keys(element).length === 0
              ? "Create Catalog"
              : "Update Catalog"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden">a</DialogDescription>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                "inputs ",
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

export default CatalogModal;
