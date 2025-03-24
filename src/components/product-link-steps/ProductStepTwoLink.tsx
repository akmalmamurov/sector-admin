import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Button } from "../ui/button";
import { LinkProduct, ProductRequest } from "@/types";
import { useEffect } from "react";

interface Props {
  register: UseFormRegister<ProductRequest>;
  errors: FieldErrors<ProductRequest>;
  watch: UseFormWatch<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
  linkData: LinkProduct | null;
  setValue: UseFormSetValue<ProductRequest>;
}

export const ProductStepTwoLink = ({
  register,
  errors,
  watch,
  handleNext,
  handleBack,
  linkData,
  setValue
}: Props) => {
  const title = watch("title");
  const articul = watch("articul");
  const productCode = watch("productCode");
  const inStock = watch("inStock");
  // const price = watch("price");
  const description = watch("description");

  useEffect(() => {
    if (linkData) {
      setValue("title", linkData.title);
      setValue("articul", linkData.article);
      setValue("productCode", linkData.code);
      setValue("description", linkData.description);
    }
    if (linkData?.stock) {
      setValue("inStock", linkData.stock);
    }
    setValue("price", linkData?.price ? +linkData.price : +"0");
  }, [setValue, linkData]);

  const isNextDisabled =
    !title || !articul || !productCode || !inStock || !description;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter Product Title"
            className="inputs py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        {/* Articul */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Articul</label>
          <input
            {...register("articul", { required: "Articul is required" })}
            placeholder="Enter Articul"
            className="inputs py-2"
          />
          {errors.articul && (
            <p className="text-red-500 text-xs">{errors.articul.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Product Code */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Product Code</label>
          <input
            {...register("productCode", {
              required: "Product Code is required",
            })}
            placeholder="Enter Product Code"
            className="inputs py-2"
          />
          {errors.productCode && (
            <p className="text-red-500 text-xs">{errors.productCode.message}</p>
          )}
        </div>
        {/* Price */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Price</label>
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            placeholder="Enter Price"
            className="inputs py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price.message}</p>
          )}
        </div>
        {/* In Stock */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">In Stock</label>
          <input
            {...register("inStock", { required: "Stock quantity is required" })}
            type="text"
            placeholder="Enter Stock Quantity"
            className="inputs py-2"
          />
          {errors.inStock && (
            <p className="text-red-500 text-xs">{errors.inStock.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 mb-10">
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter Product Description"
          className="border rounded-md p-2 h-52 resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>



      {/* Next Button */}
      <div className="flex justify-end gap-5 ">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductStepTwoLink;
