/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useCreateFilter,
  useCurrentColor,
  useGetCategories,
  useGetSubCatalogs,
} from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X } from "lucide-react";
import classNames from "classnames";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Catalog, Category, FilterFormData, SubCatalog } from "@/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateButton } from "../create-button";
import { Button } from "../ui/button";
const images = [
  "/brand.svg",
  "/filter.svg",
  "/money.svg",
  "/star.svg",
  "subcategories.svg",
];
interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: any;
  catalog: Catalog[];
}

export const FilterModal = ({
  isOpen,
  handleOpen,
  element,
  catalog,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    defaultValues: {
      subCatalogId: "",
      categoryId: "",
      data: [
        {
          name: "",
          title: "",
          icon: "",
          withSearch: false,
          type: "",
          options: [],
        },
      ],
    },
  });

  const theme = useCurrentColor();
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    null
  );
  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<
    string | null
  >(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const { data: subCatalogData = [] } = useGetSubCatalogs(selectedCatalogId);
  const { data: categoriesData = [] } = useGetCategories(selectedSubCatalogId);

  const {
    fields: data,
    append,
    remove,
  } = useFieldArray({ control, name: "data" });
  const { mutate: createFilter } = useCreateFilter();

  const onSubmit = (formData: FilterFormData) => {
    const transformedData = {
      subCatalogId: formData.subCatalogId,
      ...(formData.categoryId && { categoryId: formData.categoryId }),
      data: formData.data,
    };

    console.log("Final Data:", transformedData);

    createFilter(transformedData, {
      onSuccess: () => {
        handleOpen();
        reset();
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (element && Object.keys(element).length > 0) {
        reset(element);
      } else {
        reset();
      }
    }
  }, [isOpen, element, reset]);
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} max-w-5xl h-[550px] overflow-y-auto flex flex-col px-5 pt-6`}
      >
        <DialogHeader className="font-bold ">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Filter"
              : "Update Filter"}
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

        <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pb-10 h-full">
          <div className="grid grid-cols-3 gap-5 border-b pb-2  border-header">
            {/* catalog select */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="catalog"
                className="text-textColor font-medium w-fit text-sm"
              >
                Catalog
              </label>
              <Select
                onValueChange={(value) => {
                  setSelectedCatalogId(value);
                }}
              >
                <SelectTrigger
                  id="catalog"
                  className="border border-header rounded-md px-3 text-header ring-header focus:ring-header text-sm font-semibold h-11"
                >
                  <SelectValue placeholder="Select Catalog" />
                </SelectTrigger>
                <SelectContent>
                  {catalog.map(({ id, title }) => (
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
            </div>
            {/* subcatalog select */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="subcatalog"
                className="text-textColor font-medium w-fit text-sm"
              >
                Subcatalog
              </label>
              <Controller
                name="subCatalogId"
                control={control}
                rules={{ required: "Subcatalog is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      setSelectedSubCatalogId(value);
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!selectedCatalogId}
                  >
                    <SelectTrigger
                      id="subcatalog"
                      className="border border-header rounded-md px-3 h-11 text-header ring-header focus:ring-header  text-sm font-semibold"
                    >
                      <SelectValue placeholder="Select SubCatalog" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCatalogData.map(({ id, title }: SubCatalog) => (
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
              {errors.subCatalogId && (
                <p className="text-red-500 text-xs ">
                  {errors.subCatalogId.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-textColor font-medium w-fit text-sm"
              >
                Category
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      setSelectedCategoryId(value);
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!selectedSubCatalogId}
                  >
                    <SelectTrigger
                      id="category"
                      className="border border-header rounded-md h-11 px-3 text-header ring-header focus:ring-header 
                      text-sm font-semibold"
                    >
                      <SelectValue placeholder="Select Category (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.map(({ id, title }: Category) => (
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
          </div>
          <div className="space-y-5 mt-5">
            {data.map((filter, filterIndex) => (
              <div
                key={filter.id}
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
                  {/* Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="filterName"
                      className="text-textColor text-sm"
                    >
                      Filter Name
                    </label>
                    <input
                      id="filterName"
                      placeholder="Filter Name"
                      {...register(`data.${filterIndex}.name`, {
                        required: "Filter name is required",
                      })}
                      className="inputs py-2"
                    />
                    {errors.data?.[filterIndex]?.name && (
                      <p className="text-red-500 text-xs">
                        {errors.data[filterIndex]?.name?.message}
                      </p>
                    )}
                  </div>
                  {/* Title */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="filterTitle"
                      className="text-textColor text-sm"
                    >
                      Filter Title
                    </label>
                    <input
                      id="filterTitle"
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
                  {/* icon select */}
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor={`data.${filterIndex}.icon`}
                        className="text-textColor text-sm"
                      >
                        Select Icon
                      </label>
                      <Controller
                        name={`data.${filterIndex}.icon`}
                        control={control}
                        rules={{ required: "Icon is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className="border border-header rounded-md h-[36px] px-3 text-header ring-header focus:ring-header 
                      text-sm font-semibold"
                            >
                              {field.value ? (
                                <img
                                  src={field.value}
                                  alt="Selected Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <span className="text-gray-500">
                                  Select Icon
                                </span>
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
                      <label htmlFor="search">With Search</label>
                      <input
                        id="search"
                        type="checkbox"
                        {...register(`data.${filterIndex}.withSearch`)}
                      />
                    </div>
                  </div>
                  <div>
                    <Controller
                      name={`data.${filterIndex}.type`}
                      control={control}
                      rules={{ required: "Filter type is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className="border border-header rounded-md h-[36px] px-3 text-header ring-header focus:ring-header 
                      text-sm font-semibold"
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
                      (errors.data?.[filterIndex]?.name as FieldError)
                        ?.message && (
                        <p className="text-red-500 text-xs">
                          {
                            (errors.data?.[filterIndex]?.name as FieldError)
                              .message
                          }
                        </p>
                      )}
                  </div>
                  <Controller
                    name={`data.${filterIndex}.options`}
                    control={control}
                    render={({ field }) => (
                      <div className="">
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
                        {field.value.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-3 mb-2">
                            <input
                              placeholder="Option Name"
                              value={option.name}
                              onChange={(e) => {
                                const updated = [...field.value];
                                updated[optionIndex].name = e.target.value;
                                field.onChange(updated);
                              }}
                              className="inputs py-2 w-fit"
                            />
                            <input
                              placeholder="Option Title"
                              value={option.title}
                              onChange={(e) => {
                                const updated = [...field.value];
                                updated[optionIndex].title = e.target.value;
                                field.onChange(updated);
                              }}
                              className="inputs py-2 w-fit"
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
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  title: "",
                  icon: "",
                  withSearch: false,
                  type: "",
                  options: [],
                })
              }
            >
              + Add Filter
            </Button>
          </div>

          <div className="flex items-end  justify-end mt-10 gap-4 pb-5">
            <CreateButton type="button" onClick={() => handleOpen()}>
              Close
            </CreateButton>
            <CreateButton type="submit">Create</CreateButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
