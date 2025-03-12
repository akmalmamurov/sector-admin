import Editor from "./Editor";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { PromotionData, PromotionRequest } from "@/types";

interface Props {
  setValue: UseFormSetValue<PromotionRequest>;
  getValues: UseFormGetValues<PromotionRequest>;
  handleNext: () => void;
  handleBack: () => void;
  element: PromotionData;
}

export const FullDescription = ({
  setValue,
  getValues,
  handleNext,
  handleBack,
  element,
}: Props) => {
  return (
    <div>
      <Editor
        element={element}
        setValue={setValue}
        getValues={getValues}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default FullDescription;
