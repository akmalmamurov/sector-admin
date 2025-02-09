import { BrandRequest } from "@/types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import classNames from "classnames";
import { CreateButton } from "../create-button";
import { useCurrentColor } from "@/hooks";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<BrandRequest>;
}
export const BrandModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandRequest>();
  const onSubmit = (data: BrandRequest) => {
    console.log(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Catalog"
              : "Update Catalog"}
          </DialogTitle>
          <button onClick={() => handleOpen(false)}>
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
              placeholder="Brand Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              {...register("url", { required: "Url is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.url
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Url"
            />
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
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

export default BrandModal;
