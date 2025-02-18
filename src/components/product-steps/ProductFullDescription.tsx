import Editor from "./Editor";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { ProductRequest } from "@/types";

interface Props {
  setValue: UseFormSetValue<ProductRequest>;
  getValues: UseFormGetValues<ProductRequest>;
  images: File[];
  setImageFiles: (files: File[]) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export const ProductFullDescription = ({ setValue, getValues, handleNext, handleBack, images, setImageFiles }: Props) => {
  return (
    <div>
      <Editor 
        setValue={setValue} 
        getValues={getValues} 
        handleNext={handleNext} 
        handleBack={handleBack} 
        images={images}
        setImageFiles={setImageFiles}
      />
    </div>
  );
};

export default ProductFullDescription;
