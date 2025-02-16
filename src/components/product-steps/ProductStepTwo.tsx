import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProductRequest } from "@/types";

interface Props {
  register: UseFormRegister<ProductRequest>;
  errors: FieldErrors<ProductRequest>;
  watch: UseFormWatch<ProductRequest>;
  handleNext: () => void;
}

export const ProductStepTwo = ({ register, errors, watch, handleNext }: Props) => {
  // ✅ Hamma maydonlarning qiymatini kuzatish
  const title = watch("title");
  const articul = watch("articul");
  const productCode = watch("productCode");
  const inStock = watch("inStock");
  const price = watch("price");
  const description = watch("description");

  // ✅ Agar hamma maydonlar to‘ldirilmagan bo‘lsa, Next disabled bo‘ladi
  const isNextDisabled = !title || !articul || !productCode || !inStock || !price || !description;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter Product Title"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        {/* Articul */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Articul</label>
          <Input
            {...register("articul", { required: "Articul is required" })}
            placeholder="Enter Articul"
          />
          {errors.articul && <p className="text-red-500 text-xs">{errors.articul.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Product Code */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Product Code</label>
          <Input
            {...register("productCode", { required: "Product Code is required" })}
            placeholder="Enter Product Code"
          />
          {errors.productCode && <p className="text-red-500 text-xs">{errors.productCode.message}</p>}
        </div>

        {/* In Stock */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">In Stock</label>
          <Input
            {...register("inStock", { required: "Stock quantity is required" })}
            type="number"
            placeholder="Enter Stock Quantity"
          />
          {errors.inStock && <p className="text-red-500 text-xs">{errors.inStock.message}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Price</label>
        <Input
          {...register("price", { required: "Price is required" })}
          type="number"
          placeholder="Enter Price"
        />
        {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter Product Description"
          className="border rounded-md p-2 h-24"
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductStepTwo;
