import { ModalProps } from "@/types";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { CreateButton } from "../create-button";
import { useCreateData } from "@/hooks/create-data";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CREATE_CATALOG } from "@/constants";
interface CatalogRequest {
  title: string;
}
export const CatalogModal = ({ isOpen, toggleOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CatalogRequest>();
  const { mutate: CreateCatalog } = useCreateData({
    url: CREATE_CATALOG,
    invalidateQueryKey: "catalog",
  });
  const onSubmit = (data: CatalogRequest) => {
    CreateCatalog(data, {
      onSuccess() {
        toggleOpen(false);
        reset();
        toast.success("Catalog created successfully!");
      },
    });
  };
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogHeader>Create Catalog</DialogHeader>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                "inputs",
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
            <CreateButton type="button" onClick={() => toggleOpen(false)}>
              Cancel
            </CreateButton>
            <CreateButton type="submit">Create</CreateButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogModal;
