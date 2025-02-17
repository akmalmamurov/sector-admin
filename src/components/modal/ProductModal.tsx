import { useState } from "react";
import { useCurrentColor } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProductRequest } from "@/types";
import { X } from "lucide-react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { ProductCatalogs, ProductStepTwo } from "../product-steps";
import ProductStepThree from "../product-steps/ProductStepThree";
import ProductStepFour from "../product-steps/ProductStepFinal";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
}

export const ProductModal = ({ isOpen, handleOpen }: Props) => {
  const theme = useCurrentColor();
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductRequest>();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Catalogs",
    "Title, Articul, Code, Description, Price, InStock",
    "Brand, Condition, Relavance",
    " Characteristics",
    "Images",
    "Full Description",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const onSubmit = (data: ProductRequest) => {
    console.log(data);
  };

  const catalogsProps = {
    control,
    handleNext,
    setValue,
    watch,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} flex flex-col py-5 px-7 max-w-5xl h-[600px] overflow-y-auto`}
      >
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            <div className="flex gap-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-2 py-2 rounded-md text-sm font-normal border",
                    index === activeStep
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  )}
                >
                  {step}
                </div>
              ))}
            </div>
          </DialogTitle>
          <button onClick={handleOpen}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden">a</DialogDescription>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && <ProductCatalogs {...catalogsProps} />}
            {activeStep === 1 && (
              <ProductStepTwo
                handleBack={handleBack}
                register={register}
                errors={errors}
                handleNext={handleNext}
                watch={watch}
              />
            )}
            {activeStep === 2 && (
              <ProductStepThree
                control={control}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 3 && <ProductStepFour setValue={setValue} />}
            {activeStep === 4 && <ProductStepFour setValue={setValue} />}
            {activeStep === 5 && <ProductStepFour setValue={setValue} />}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
