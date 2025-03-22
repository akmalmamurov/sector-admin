import { CreateButton } from "../create-button";
import { LinkProduct, ProductData, ProductRequest } from "@/types";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { DOMAIN } from "@/constants";

interface ProductImageProps {
  setValue: UseFormSetValue<ProductRequest>;
  handleNext: () => void;
  element?: Partial<ProductData>;
  handleBack?: () => void;
  linkData: LinkProduct | null;
}

export const ProductImageFunctional = ({
  handleNext,
  handleBack,
  linkData,
  setValue
}: ProductImageProps) => {

  useEffect(() => {
    if (linkData) {
      setValue("images", linkData.images);
    }
  }, [setValue, linkData])
  
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold mb-3 text-center">Product Images</h2>
      <div className="flex gap-4">
        <div className="border-r-2 pr-4 border-header">
          <div className="relative inline-block">
            <img
              src={`${DOMAIN}/${linkData?.images[0]}`}
              alt="Main Product Image"
              className="w-24 h-24 object-cover rounded-md"
            />
          </div>
        </div>
        <div>
          {linkData && linkData.images.length > 1 && (
            <div className="flex flex-wrap gap-5 mb-4">
              {linkData.images.slice(1).map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={`${DOMAIN}/${file}`}
                    alt={`Additional Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-6">
        {handleBack && (
          <Button type="button" onClick={handleBack} className="h-[42px]">
            Back
          </Button>
        )}
        <CreateButton type="submit" onClick={handleNext}>
          Create Product
        </CreateButton>
      </div>
    </div>
  );
};

export default ProductImageFunctional;
