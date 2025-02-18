import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { ProductRequest } from "@/types";

interface Props {
  control: Control<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
}

export const ProductCharacter = ({ control, handleNext, handleBack }: Props) => {
  const { fields: titleFields, append: appendTitle, remove: removeTitle } = useFieldArray({
    control,
    name: "characteristics",
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Product Characteristics</h2>
      <div className="space-y-3">
        {titleFields.map((titleField, titleIndex) => (
          <div key={titleField.id} className="border p-3 rounded-md space-y-3">
            {/* Title Input */}
            <Controller
              name={`characteristics.${titleIndex}.title`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Title"
                  className="border px-3 py-2 rounded-md w-full"
                />
              )}
            />

            <div className="space-y-2">
              {/* Nested Field Array for Characteristics */}
              <ProductCharacteristics control={control} titleIndex={titleIndex} />
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeTitle(titleIndex)}
              className="px-3 py-2"
            >
              <X className="w-4 h-4" /> Remove Title
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={() => appendTitle({ title: "", characteristics: [] })}
        className="mt-3"
      >
        + Add Title
      </Button>

      <div className="flex justify-end gap-5 mt-6">
        <Button type="button" onClick={handleBack}>Back</Button>
        <Button type="button" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

const ProductCharacteristics = ({ control, titleIndex }: { control: Control<ProductRequest>; titleIndex: number }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `characteristics.${titleIndex}.characteristics`,
  });

  return (
    <div className="space-y-2">
      {fields.map((charField, charIndex) => (
        <div key={charField.id} className="flex items-center gap-3">
          <Controller
            name={`characteristics.${titleIndex}.characteristics.${charIndex}.name`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Characteristic Name"
                className="border px-3 py-2 rounded-md w-1/2"
              />
            )}
          />

          <Controller
            name={`characteristics.${titleIndex}.characteristics.${charIndex}.value`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Characteristic Value"
                className="border px-3 py-2 rounded-md w-1/2"
              />
            )}
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(charIndex)}
            className="px-3 py-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ name: "", value: "" })}
        className="mt-2"
      >
        + Add Characteristic
      </Button>
    </div>
  );
};

export default ProductCharacter;
