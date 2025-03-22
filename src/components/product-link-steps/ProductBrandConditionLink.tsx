import { GaranteeData, LinkProduct, ProductRequest } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { useGetBrand, useGetCondition, useGetRelevance, useGetGarantee, useCurrentColor } from "@/hooks";
import ReactSelect from "react-select"
import classNames from "classnames";
import { useEffect } from "react";
interface Props {
  control: Control<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
  watch: UseFormWatch<ProductRequest>;
  setValue: UseFormSetValue<ProductRequest>;
  linkData: LinkProduct | null;
}

export const ProductBrandConditionLink = ({
  control,
  handleNext,
  handleBack,
  watch,
  setValue,
  linkData
}: Props) => {
  const { data: brandData = [] } = useGetBrand();
  const { data: conditionData = [] } = useGetCondition();
  const { data: relevanceData = [] } = useGetRelevance();
  const { data: garanteeData = [] } = useGetGarantee();

  const conditionId = watch("conditionId");
  const relevanceId = watch("relevanceId");
  const brandId = watch("brandId");
  console.log(brandData);

  const theme = useCurrentColor();
  useEffect(() => {
    if (brandData.length > 1 && linkData !== null && 'brand' in linkData) {
      const selectedBrand = brandData.find(
        (brand) => brand.title === linkData.brand
      );

      setValue("brandId", selectedBrand?.id);
    }
  }, [brandData, setValue, linkData]);
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
          render={({ field }) => {
            // Foydalanuvchi tanlagan yoki mavjud brandni olish
            const selectedBrand = brandData.find(
              (brand) => brand.id === field.value
            );

            return (
              <ReactSelect
                options={brandData.map((brand) => ({
                  label: brand.title,
                  value: brand.id,
                }))}
                value={
                  selectedBrand
                    ? { label: selectedBrand.title, value: selectedBrand.id }
                    : null
                }
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                placeholder="Select Brand"
                className={classNames(theme.text, theme.bg)}
              />
            );
          }}
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
      {/* Garantee Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-textColor font-medium w-fit text-sm">
          Garantee
        </label>
        <Controller
          name="garanteeIds"
          control={control}
          render={({ field }) => (
            <ReactSelect
              options={garanteeData.map((garantee: GaranteeData) => ({
                label: garantee.title,
                value: garantee.id,
              }))}
              isMulti
              value={garanteeData
                .filter((g) => field.value?.includes(g.id))
                .map((g) => ({ label: g.title, value: g.id }))}
              onChange={(selectedOptions) =>
                field.onChange(selectedOptions.map((option) => option.value))
              }
              placeholder="Select Garantee"
              className={classNames(theme.text, theme.bg)}
            />
          )}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="col-span-3 flex justify-end mt-4 gap-5">
        <Button type="button" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductBrandConditionLink;
