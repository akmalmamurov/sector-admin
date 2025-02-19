import Editor from "./Editor";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { ProductRequest } from "@/types";

interface Props {
  setValue: UseFormSetValue<ProductRequest>;
  getValues: UseFormGetValues<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
}

export const ProductFullDescription = ({
  setValue,
  getValues,
  handleNext,
  handleBack,
}: Props) => {
  return (
    <div>
      <Editor
        setValue={setValue}
        getValues={getValues}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default ProductFullDescription;
