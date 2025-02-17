import { ProductRequest } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
import { Control, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { useGetBrand } from "@/hooks";
  interface Props {
    control: Control<ProductRequest>;
    handleNext: () => void;
    handleBack: () => void
  }
const ProductStepThree = ({control,handleNext,handleBack}: Props) => {
    const { data: brandData = [] } = useGetBrand();
  return (
    <div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="category"
          className="text-textColor font-medium w-fit text-sm"
        >
          Category
        </label>
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              disabled={brandData?.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    brandData?.length === 0
                      ? "No Brand found"
                      : "Select Brand"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {brandData.map(({ id, title }) => (
                  <SelectItem
                    key={id}
                    value={id}
                    className="text-header cursor-pointer"
                  >
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="col-span-3 flex justify-end mt-4 gap-5">
        <Button onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
    </div>
    </div>
  )
}

export default ProductStepThree