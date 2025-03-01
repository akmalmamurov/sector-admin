import {
  Controller,
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  FieldError,
  UseFormSetValue,
} from "react-hook-form";
import { FilterFormData } from "@/types";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  data: FilterFormData["data"];
  register: UseFormRegister<FilterFormData>;
  control: Control<FilterFormData>;
  errors: FieldErrors<FilterFormData>;
  remove: UseFieldArrayRemove;
  element: FilterFormData;
  handleSave: (index: number) => void;
  isDirtyArray: boolean[];
  setValue: UseFormSetValue<FilterFormData>;
}

const images = [
  "/brand.svg",
  "/filter.svg",
  "/money.svg",
  "/star.svg",
  "subcategories.svg",
];

export const FilterForm = ({
  data,
  register,
  control,
  errors,
  remove,
  element,
  isDirtyArray,
  handleSave,
}: Props) => {
  return (
    <div className="space-y-5 mt-5">
      {data.map((_filter, filterIndex) => (
        <div
          key={`filter-${filterIndex}`}
          className="border pt-1 pb-3 px-2 rounded-lg bg-gray-100 relative"
        >
          <button
            type="button"
            onClick={() => remove(filterIndex)}
            className="absolute top-0 right-2 text-red-500"
          >
            ✖
          </button>

          <div className="grid grid-cols-3 gap-4">
            {/* Filter Title */}
            <div className="flex flex-col">
              <label className="text-textColor text-sm">Filter Title</label>
              <input
                placeholder="Filter Title"
                {...register(`data.${filterIndex}.title`, {
                  required: "Filter title is required",
                })}
                className="inputs py-2"
              />

              {errors.data?.[filterIndex]?.title && (
                <p className="text-red-500 text-xs">
                  {errors.data[filterIndex]?.title?.message}
                </p>
              )}
            </div>

            {/* Select Icon */}
            <div className="flex gap-5 items-center">
              <div className="flex flex-col w-1/2">
                <label className="text-textColor text-sm">Select Icon</label>
                <Controller
                  name={`data.${filterIndex}.icon`}
                  control={control}
                  rules={{ required: "Icon is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border border-header rounded-md h-[36px] px-3 text-header ring-header focus:ring-header text-sm font-semibold">
                        {field.value ? (
                          <img
                            src={field.value}
                            alt="Selected Icon"
                            className="w-5 h-5"
                          />
                        ) : (
                          <span className="text-gray-500">Select Icon</span>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {images.map((iconPath) => (
                          <SelectItem
                            key={iconPath}
                            value={iconPath}
                            className="flex justify-center"
                          >
                            <img
                              src={iconPath}
                              alt={iconPath}
                              className="w-5 h-5"
                            />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.data?.[filterIndex]?.icon && (
                  <p className="text-red-500 text-xs">
                    {errors.data[filterIndex]?.icon?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label>With Search</label>
                <input
                  type="checkbox"
                  {...register(`data.${filterIndex}.withSearch`)}
                />
              </div>
            </div>

            {/* Filter Type */}
            <div>
              <label htmlFor="filterType" className="text-textColor text-sm">
                Filter Type
              </label>
              <Controller
                name={`data.${filterIndex}.type`}
                control={control}
                rules={{ required: "Filter type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="filterType"
                      className="border border-header rounded-md h-[36px] px-3 text-header ring-header focus:ring-header text-sm font-semibold"
                    >
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="import-checkbox">
                        Import Checkbox
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.data?.[filterIndex]?.name &&
                (errors.data?.[filterIndex]?.name as FieldError)?.message && (
                  <p className="text-red-500 text-xs">
                    {(errors.data?.[filterIndex]?.name as FieldError).message}
                  </p>
                )}
            </div>

            <div>
              <label htmlFor="" className="flex justify-start text-sm mb-1">
                Options
              </label>
              {/* Options */}
              <Controller
                name={`data.${filterIndex}.options`}
                control={control}
                render={({ field }) => (
                  <div>
                    {Object.keys(element).length === 0 && (
                      <Button
                        type="button"
                        onClick={() =>
                          field.onChange([
                            ...field.value,
                            { name: "", title: "" },
                          ])
                        }
                        className="mb-2"
                      >
                        + Options
                      </Button>
                    )}

                    {field.value.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-3 mb-2">
                        <input
                          placeholder="Option Title"
                          value={option.title}
                          onChange={(e) => {
                            const updated = [...field.value];
                            updated[optionIndex].title = e.target.value.trim();
                            field.onChange(updated);
                          }}
                          className="inputs py-2 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...field.value];
                            updated.splice(optionIndex, 1);
                            field.onChange(updated);
                          }}
                          className="text-red-500"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            {Object.keys(element).length > 0 && (
              <div className="flex justify-end items-end ml-14">
                <Button
                  type="button"
                  disabled={!isDirtyArray[filterIndex]}
                  className={` px-7 `}
                  onClick={() => handleSave(filterIndex)}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
