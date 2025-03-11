import { GaranteeData } from "@/types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import classNames from "classnames";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useCurrentColor, useCreateGarantee, useUpdateGarantee } from "@/hooks";


interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<GaranteeData>;
}

export const GaranteeModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();  
  const { mutate: createGarantee } = useCreateGarantee();
  const { mutate: updateGarantee } = useUpdateGarantee();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<GaranteeData>();

  const watchedValues = watch();
  const isCreateDisabled =
    !watchedValues.title || !watchedValues.title.trim()
    || !watchedValues.price || !watchedValues.price.toString().trim();
  const isUpdateDisabled = !isDirty;

  const onSubmit = async (data: GaranteeData) => {
    if (element?.id) { 
      updateGarantee(
        { id: element.id, data },
        {
          onSuccess: () => {
            handleOpen(false);
            reset();
          },
        }
      );
    } else {
      createGarantee(data, {
        onSuccess: () => {
          handleOpen(false);
          reset();
        },
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: element?.title || "",
        price: element?.price || "",
      });
    }
  }, [isOpen, element, reset]);

  

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Garantee"
              : "Update Garantee"}
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
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className={theme.text}>
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.title
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="price" className={theme.text}>
              Price
            </label>
            <input
              type="text"
              {...register("price", {
                required: "Price is required",
                validate: (value) => {
                  if (/^\d+$/.test(value.toString()) || /^[a-zA-Z\s]+$/.test(value.toString())) {
                    return true;
                  }
                  return "Price must be either a number or a pure string (no mix)";
                },
              })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.price
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Price"
            />

            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {Object.keys(element).length === 0 ? (
              <Button
                type="submit"
                className="w-full py-5 font-bold"
                disabled={isCreateDisabled}
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-5 font-bold"
                disabled={isUpdateDisabled}
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

export default GaranteeModal;
