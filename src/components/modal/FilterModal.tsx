/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { X } from "lucide-react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useFieldArray, useForm,  } from "react-hook-form";

import { CreateButton } from "../create-button";
import { Catalog, FilterFormData, UpdateFilterProps } from "@/types";
import { FilterForm, FilterTopSelect } from "../filter";
import {
  useCreateFilter,
  useCurrentColor,
  useGetCategories,
  useGetSubCatalogs,
  useUpdateFilter,
} from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";


const generateNameFromTitle = (title: string): string => {
  const cyrillicToLatinMap: Record<string, string> = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
    'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  title = title.replace(/гбит\s*\/?\s*с/gi, "gbit-s").replace(/мбит\s*\/?\s*с/gi, "mbit-s");

  let transliterated = title
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char)
    .join("");
  transliterated = transliterated.toLowerCase();
  transliterated = transliterated.replace(/[^a-z0-9\s-]/g, "");
  transliterated = transliterated.trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  return transliterated;
};

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  element?: any;
  catalog: Catalog[];
  catalogApi?: string | null;
}

export const FilterModal = ({
  isOpen,
  handleOpen,
  element,
  catalogApi,
  catalog,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FilterFormData>({
    defaultValues: {
      subcatalogId: "",
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
  const [catalogId, setCatalogId] = useState<string | null>(null);
  const [subCatalogId, setSubCatalogId] = useState<string | null>(null);
  const [_categoryId, setCategoryId] = useState<string | null>(null);
  const { data: subCatalogData = [] } = useGetSubCatalogs(catalogId);
  const { data: categoriesData = [] } = useGetCategories(subCatalogId);
  const watchedFields = watch("data") || [];
  const watchedSubCatalogId = watch("subcatalogId");
  const watchedCategoryId = watch("categoryId");
  console.log(element);

  const isDirtyArray = watchedFields.map((item, index) =>
    element.data && element.data[index]
      ? JSON.stringify(item) !== JSON.stringify(element.data[index])
      : false
  );

  const isSubCatalogDirty = element.subcatalog
    ? watchedSubCatalogId !== element.subcatalog
    : Boolean(watchedSubCatalogId);

  const isCategoryDirty = element.category
    ? watchedCategoryId !== element.category
    : Boolean(watchedCategoryId);

  const isDirty =
    isDirtyArray.some(Boolean) || isSubCatalogDirty || isCategoryDirty;

  const {
    fields: data,
    append,
    remove,
  } = useFieldArray({ control, name: "data" });
  const { mutate: createFilter } = useCreateFilter();
  const { mutate: updateFilter } = useUpdateFilter();

  // onSubmit: formData dagi har bir filter uchun title asosida "name" maydoni generatsiya qilinadi
  const onSubmit = (formData: FilterFormData) => {
    const transformedData = {
      subcatalogId: formData.subcatalogId,
      ...(formData.categoryId && { categoryId: formData.categoryId }),
      data: formData.data.map((filter) => ({
        name: generateNameFromTitle(filter.title),
        title: filter.title,
        icon: filter.icon,
        withSearch: filter.withSearch,
        type: filter.type,
        options: filter.options
          ? filter.options.map((option) => ({
              name: generateNameFromTitle(option.title),
              title: option.title,
            }))
          : [],
      })),
    };

    createFilter(transformedData, {
      onSuccess: () => {
        handleOpen();
        reset();
      },
    });
  };

  // handleSave: update jarayonida yangilangan filter uchun title asosida "name" va option name lar generatsiya qilinadi
  const handleSave = (index: number) => {
    if (!element?.id) {
      return;
    }

    const updatedFilter = getValues(`data.${index}`);

    if (!updatedFilter) {
      console.error("Error: Updated data is missing!");
      return;
    }

    const payload: UpdateFilterProps = {
      name: generateNameFromTitle(updatedFilter.title),
      data: {
        name: generateNameFromTitle(updatedFilter.title),
        title: updatedFilter.title,
        icon: updatedFilter.icon,
        withSearch: updatedFilter.withSearch,
        type: updatedFilter.type,
        options: updatedFilter.options
          ? updatedFilter.options.map((option: { title: string }) => ({
              name: generateNameFromTitle(option.title),
              title: option.title,
            }))
          : [],
      },
    };

    updateFilter({ id: element.id, data: payload });
  };

  useEffect(() => {
    if (isOpen) {
      if (element && Object.keys(element).length > 0) {
        setCatalogId(catalogApi ?? null);
        setCategoryId(element.category);
        reset({
          subcatalogId: element.subcatalog || "",
          categoryId: element.category || "",
          data: element.data || [
            {
              name: "",
              title: "",
              icon: "",
              withSearch: false,
              type: "",
              options: [],
            },
          ],
        });
      } else {
        reset({
          subcatalogId: "",
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
        });
        setCatalogId(null);
        setSubCatalogId(null);
        setCategoryId(null);
      }
    }
  }, [isOpen, element]);

  const filterTopProps = {
    catalog,
    subCatalogData,
    categoriesData,
    catalogId,
    setCatalogId,
    subCatalogId,
    setSubCatalogId,
    setCategoryId,
    control,
    errors,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} max-w-6xl h-[800px] overflow-y-auto flex flex-col px-5 pt-6`}
      >
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0 ? "Create Filter" : "Update Filter"}
          </DialogTitle>
          <button onClick={() => handleOpen()}>
            <X className={classNames(theme.text, "w-6 h-6 absolute top-4 right-4")} />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden" />

        <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pb-10 h-full">
          <FilterTopSelect {...filterTopProps} />
          <FilterForm
            data={data}
            register={register}
            control={control}
            errors={errors}
            remove={remove}
            element={element}
            handleSave={handleSave}
            isDirtyArray={isDirtyArray}
            setValue={setValue}
          />
          {Object.keys(element).length === 0 && (
            <Button
              className="mt-3"
              type="button"
              onClick={() =>
                append({
                  name: "",
                  title: "",
                  icon: "",
                  withSearch: false,
                  type: "",
                  options: [{ name: "", title: "" }],
                })
              }
            >
              Add Filter Field
            </Button>
          )}
          <div className="flex items-end justify-end mt-10 gap-4 pb-5">
            <CreateButton type="button" onClick={() => handleOpen()}>
              Close
            </CreateButton>
            {Object.keys(element).length === 0 && (
              <CreateButton type="submit">Create</CreateButton>
            )}
            {isDirty && Object.keys(element).length > 0 && (
              <CreateButton type="button" onClick={() => handleSave(0)}>
                Update Filter
              </CreateButton>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
