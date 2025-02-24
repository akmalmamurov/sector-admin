import { ProductRequest } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { useGetBrand, useGetCondition, useGetRelevance } from "@/hooks";

interface Props {
  control: Control<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
  watch: UseFormWatch<ProductRequest>;
}

export const ProductBrandCondition = ({
  control,
  handleNext,
  handleBack,
  watch,
}: Props) => {
  const { data: brandData = [] } = useGetBrand();
  const { data: conditionData = [] } = useGetCondition();
  const { data: relevanceData = [] } = useGetRelevance();
  const conditionId = watch("conditionId");
  const relevanceId = watch("relevanceId");
  const brandId = watch("brandId");

  const isNextDisabled = !relevanceId || !conditionId || !brandId;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Brand Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-textColor font-medium w-fit text-sm">
          Brand
        </label>
        <Controller
          name="brandId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
              disabled={brandData.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    brandData.length === 0 ? "No Brand found" : "Select Brand"
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

      {/* Condition Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-textColor font-medium w-fit text-sm">
          Condition
        </label>
        <Controller
          name="conditionId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
              disabled={conditionData.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    conditionData.length === 0
                      ? "No Condition found"
                      : "Select Condition"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {conditionData.map(({ id, title }) => (
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

      {/* Relevance Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-textColor font-medium w-fit text-sm">
          Relevance
        </label>
        <Controller
          name="relevanceId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
              disabled={relevanceData.length === 0}
            >
              <SelectTrigger className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                <SelectValue
                  placeholder={
                    relevanceData.length === 0
                      ? "No Relevance found"
                      : "Select Relevance"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {relevanceData.map(({ id, title }) => (
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

      {/* Navigation Buttons */}
      <div className="col-span-3 flex justify-end mt-4 gap-5">
        <Button type="button" onClick={handleBack}>Back</Button>
        <Button type="button" onClick={handleNext} disabled={isNextDisabled}>Next</Button>
      </div>
    </div>
  );
};

export default ProductBrandCondition;
