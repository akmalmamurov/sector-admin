/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useCurrentColor, useGetCategories, useGetSubCatalogs } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Catalog, ProductRequest } from "@/types";
import { X } from "lucide-react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { ProductCatalogs, ProductStepTwo } from "../product-steps";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  catalogData: Catalog[];
}

export const ProductModal = ({ isOpen, handleOpen, catalogData }: Props) => {
  const theme = useCurrentColor();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ProductRequest>();
  const [activeStep, setActiveStep] = useState(0);
  const [catalogId, setCatalogId] = useState<string | null>(null);
  const [subCatalogId, setSubCatalogId] = useState<string | null>(null);
  const [_categoryId, setCategoryId] = useState<string | null>(null);
  const { data: subCatalogData = [] } = useGetSubCatalogs(catalogId);
  const { data: categoriesData = [] } = useGetCategories(subCatalogId);

  const steps = [
    "Catalogs",
    "Title, Articul, Code, Description, Price, InStock",
    "Brand, Condition, Relavance",
    "Images",
    "Review",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  // const handleBack = () => {
  //   if (activeStep > 0) {
  //     setActiveStep((prev) => prev - 1);
  //   }
  // };
  const onSubmit = (data: ProductRequest) => {
    console.log(data);
  };

  const catalogsProps = {
    catalogData,
    subCatalogData,
    categoriesData,
    catalogId,
    setCatalogId,
    subCatalogId,
    setSubCatalogId,
    setCategoryId,
    control,
    errors,
    handleNext,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} flex flex-col py-5 px-10 max-w-5xl h-[700px] overflow-y-auto`}
      >
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            <div className="flex gap-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-4 py-2 rounded-md text-sm font-normal border",
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
                register={register}
                errors={errors}
                handleNext={handleNext}
                watch={watch}
              />
            )}
            {activeStep === 2 && <div>Upload Images</div>}
            {activeStep === 3 && <div>Review Product</div>}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
