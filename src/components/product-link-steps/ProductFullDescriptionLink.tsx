
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { ProductRequest } from "@/types";
import Editor from "../product-steps/Editor";

interface Props {
  setValue: UseFormSetValue<ProductRequest>;
  getValues: UseFormGetValues<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
}

export const ProductFullDescriptionLink = ({
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

export default ProductFullDescriptionLink;
