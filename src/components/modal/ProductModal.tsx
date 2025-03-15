import { useEffect, useState } from "react";
import { useCreateProduct, useCurrentColor, useUpdateProduct } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProductData, ProductRequest } from "@/types";
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
import { Block } from "./PromotionModal";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  element?: Partial<ProductData>;
}
interface StoredImage {
  base64: string;
  name: string;
}
export const ProductModal = ({ isOpen, handleOpen, element }: Props) => {
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

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const steps = [
    "Catalogs",
    "Title, Articul, Code, Description, Price, InStock",
    "Full Description",
    "Brand, Condition, Relavance, Garantee",
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
  const onSubmit = async (data: ProductRequest) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (
        value === undefined ||
        key === "id" ||
        key === "slug" ||
        key === "mainImage" ||
        key === "images" ||
        key === "fullDescriptionImages" ||
        key === "recommended" ||
        key === "productImages" ||
        key === "productMainImage"
      )
        return;

      if (typeof value === "object" && value !== null ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    if (data.productMainImage) {
      formData.append("productMainImage", data.productMainImage);
    }

    if (data.productImages?.length) {
      data.productImages.forEach((file) => {
        formData.append("productImages", file);
      });
    }

    const hasUrlInFullDescription = data.fullDescription?.includes("http");

    if (hasUrlInFullDescription) {
      const storedImages = JSON.parse(
        localStorage.getItem("editorImages") || "[]"
      );

      storedImages.forEach((img: StoredImage) => {
        const byteString = atob(img.base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const file = new Blob([uint8Array], { type: "image/png" });
        formData.append("fullDescriptionImages", file, img.name);
      });
    } else {
      localStorage.removeItem("editorImages");
    }

    if (element?.id) {
      console.log("Updating product", data);
      updateProduct(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpen();
            reset();
            localStorage.removeItem("editorImages");
            console.log("Product updated successfully", formData);
          },
        }
      );
    } else {
      console.log("Creating product", data);
      createProduct(formData, {
        onSuccess: () => {
          handleOpen();
          reset();
          localStorage.removeItem("editorImages");
        },
      });
    }
  };

  function replaceImageUrls(element: ProductData) {
       if (!element.fullDescription || !element.fullDescriptionImages) return;

       let blocks;
       try {
         blocks = JSON.parse(element.fullDescription);
       } catch (error) {
         console.error("Invalid JSON in fullDescription", error);
         return;
       }

       if (!blocks.blocks || !Array.isArray(blocks.blocks)) return;

        const imageUrls = element.fullDescriptionImages.map(
         (img: string) => img
       );
       const api = "http://localhost:4000/";
       let imageIndex = 0;

       blocks.blocks.forEach((block: Block) => {
         if (
           block.type === "image" &&
           block.data.file.url.startsWith("blob:")
         ) {
           if (imageUrls[imageIndex]) {
             block.data.file.url = `${api}${imageUrls[imageIndex]}`;
             imageIndex++;
           }
         }
       });
       return (element.fullDescription = JSON.stringify(blocks));
  }

  const catalogsProps = {
    control,
    handleNext,
    setValue,
    watch,
  };
  useEffect(() => {
    setActiveStep(0);
    if (isOpen) {
      if (element && element.id) {
        replaceImageUrls(element as ProductData); 
        reset({ ...element });
      } else {
        reset({
          title: "",
          description: "",
          price: 0,
        });
      }
    } else {
      reset({});
    }
  }, [isOpen, element, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} flex flex-col py-5 px-7 max-w-6xl h-[calc(100vh-100px)] overflow-y-auto`}
      >
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            <div className="flex gap-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-2 py-2 rounded-md text-sm font-normal border", theme.tabBg,
                    index === activeStep
                      ? `${theme.tabActive} ${theme.text} `
                      : `bg-transparent text-header  shadow-2xl`
                  )}
                >
                  {element?.id ? (
                    <button onClick={() => setActiveStep(index)}>{step}</button>
                  ) : (
                    <span>{step}</span>
                  )}
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
                setValue={({ productMainImage, productImages }) => {
                  if (productMainImage)
                    setValue("productMainImage", productMainImage);
                  if (productImages) setValue("productImages", productImages);
                }}
                handleNext={handleNext}
                element={element}
                handleBack={handleBack}
              />
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
