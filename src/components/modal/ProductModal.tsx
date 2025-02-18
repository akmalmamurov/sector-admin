import { useEffect, useState } from "react";
import { useCreateProduct, useCurrentColor } from "@/hooks";
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
import {
  ProductCatalogs,
  ProductCharacter,
  ProductImage,
  ProductStepTwo,
  ProductBrandCondition,
  ProductFullDescription,
} from "../product-steps";

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
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductRequest>();
  const [activeStep, setActiveStep] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { mutate: createProduct } = useCreateProduct();
  const steps = [
    "Catalogs",
    "Title, Articul, Code, Description, Price, InStock",
    "Full Description",
    "Brand, Condition, Relavance",
    " Characteristics",
    "Images",
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
    const formData = new FormData();

    imageFiles.forEach((file) => {
      formData.append(`descriptionImages`, file, file.name);
    });

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || key === "productImages") return;

      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    if (data.productImages?.length) {
      data.productImages.forEach((file) => {
        formData.append("productImages", file, file.name);
      });
    }

    createProduct(formData, {
      onSuccess: () => {
        handleOpen();
        reset();
      },
      onError: (error) => {
        console.error("Creation failed:", error);
      },
    });
  };

  const catalogsProps = {
    control,
    handleNext,
    setValue,
    watch,
  };
  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      reset();
    }
  }, [isOpen, reset]);

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
              <ProductFullDescription
                setValue={setValue}
                getValues={getValues}
                handleNext={handleNext}
                handleBack={handleBack}
                images={imageFiles}
                setImageFiles={setImageFiles}
              />
            )}
            {activeStep === 3 && (
              <ProductBrandCondition
                control={control}
                handleNext={handleNext}
                handleBack={handleBack}
                watch={watch}
              />
            )}
            {activeStep === 4 && (
              <ProductCharacter
                control={control}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 5 && (
              <ProductImage
                setValue={(files) => setValue("productImages", files)}
                handleNext={handleNext}
              />
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
