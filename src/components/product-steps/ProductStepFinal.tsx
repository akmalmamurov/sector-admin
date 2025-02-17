import Editor from "./Editor";
import { UseFormSetValue } from "react-hook-form";
import { ProductRequest } from "@/types";
interface ProductStepFinalProps {
  setValue: UseFormSetValue<ProductRequest>;
}
const ProductStepFinal = ({ setValue }: ProductStepFinalProps) => {
  return (
    <div>
      <Editor setValue={setValue} />
    </div>
  );
};

export default ProductStepFinal;
