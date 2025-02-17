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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "characteristics", // ✅ Treating as an object
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Product Characteristics</h2>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3">
            <Controller
              name={`characteristics.${index}.name`} 
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Characteristic Name"
                  className="border px-3 py-2 rounded-md w-1/2"
                />
              )}
            />

            {/* Characteristic Value */}
            <Controller
              name={`characteristics.${index}.value` } // ✅ Storing as an object value
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Characteristic Value"
                  className="border px-3 py-2 rounded-md w-1/2"
                />
              )}
            />

            {/* Remove Characteristic */}
            <Button
            type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="px-3 py-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add New Characteristic */}
      <Button
        type="button"
        onClick={() => append({ name: "", value: "" })}
        className="mt-3"
      >
        + Add Characteristic
      </Button>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-5 mt-6">
        <Button type="button" onClick={handleBack}>Back</Button>
        <Button type="button" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default ProductCharacter;
