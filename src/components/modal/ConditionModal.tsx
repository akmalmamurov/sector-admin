import { useCurrentColor } from "@/hooks";
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
import { ConditionRequest, ConditionResponse } from "@/types";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  element?: Partial<ConditionResponse>;
}
export const ConditionModal = ({ isOpen, handleOpen, element }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ConditionRequest>();
  const theme = useCurrentColor();

  const onSubmit = (data: ConditionRequest) => {
    if (element?.id) {
      const updatedCondition: ConditionResponse = {
        id: element.id,
        title: data.title, 
      };
      console.log("update", updatedCondition);
    } else {
      console.log("create", data);
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
            {!element?.id ? "Create Condition" : "Update Condition"}
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
              placeholder="Condition Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button className="w-full" type="submit" disabled={!isDirty}>
              {!element?.id ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConditionModal;
