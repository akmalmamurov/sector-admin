import { Button } from "../ui/button";
import { useCurrentColor } from "@/hooks";
import { ProductLinkProp } from "@/types";
import classNames from "classnames";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<ProductLinkProp>;
  errors: FieldErrors<ProductLinkProp>;
}

export const ProductLink = ({ register, errors }: Props) => {
  const theme = useCurrentColor();

  return (
    <div className="space-y-5">
      <div className="w-1/4">
        <input
          type="text"
          {...register("url", { required: "Title is required" })}
          className={classNames(
            `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
            errors.url
              ? "ring-red-500 focus:ring-red-500"
              : "focus:ring-activeInput"
          )}
          placeholder="Product Link"
        />
        {errors.url && (
          <span className="text-red-500">{errors.url.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-4 w-1/4">
        <Button className="w-full" type="submit">
          Check
        </Button>
      </div>
    </div>
  );
};

export default ProductLink;
