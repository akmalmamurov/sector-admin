import {
  useCreateReleavance,
  useCurrentColor,
  useUpdateRelevance,
} from "@/hooks";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {  Relevance, RelevanceRequest, } from "@/types";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  element?: Partial<Relevance>;
}

export const RelevanceModal = ({ isOpen, handleOpen, element }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Relevance>();

  const theme = useCurrentColor();
  const { mutate: updateData } = useUpdateRelevance();
  const { mutate: createData } = useCreateReleavance();
  const watchedValues = watch();
  const createDisabled =
    !watchedValues.title?.trim();

  const onSubmit = (data: RelevanceRequest) => {
    const trimmedData = {
      title: data.title.trim()
    };

    if (element?.id) {
      updateData(
        {
          id: element.id,
          data: trimmedData,
        },
        {
          onSuccess: () => {
            handleOpen();
            reset();
          },
          onError: (error) => console.error("Update failed:", error),
        }
      );
    } else {
      createData(trimmedData, {
        onSuccess: () => {
          handleOpen();
          reset();
        },
        onError: (error) => console.error("Creation failed:", error),
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        title: element?.title || ""
      });
    }
  }, [isOpen, element, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {!element?.id ? "Create Relevance" : "Update Relevance"}
          </DialogTitle>
          <button onClick={handleOpen}>
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
          <div className="mb-5">
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.title
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Relevance Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          {/* <div>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`
              )}
              placeholder="Relevance Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div> */}

          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="w-full"
              type="submit"
              disabled={!isDirty || createDisabled}
            >
              {!element?.id ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RelevanceModal;
