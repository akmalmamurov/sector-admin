import { useEffect, useState } from "react";
import { useCurrentColor, useUpdateProduct } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  LinkProduct,
  ProductData,
  ProductLinkProp,
  ProductRequest,
} from "@/types";
import { X } from "lucide-react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Block } from "./PromotionModal";
import {
  ProductBrandConditionLink,
  ProductCatalogsLink,
  ProductCharacterLink,
  ProductFullDescriptionLink,
  ProductStepTwoLink,
} from "../product-link-steps";
import ProductLink from "../product-link-steps/ProductLink";
import { useProductLink } from "@/hooks/fetch-data/get-fetch";
import { useCreateFunctional } from "@/hooks/product/create-functional";
import { ProductImageFunctional } from "../product-functional";

interface Props {
  isOpenFunctional: boolean;
  handleOpenFunctional: () => void;
  element?: Partial<ProductData>;
}
interface StoredImage {
  base64: string;
  name: string;
}
export const ProductModalFunctional = ({
  isOpenFunctional,
  handleOpenFunctional,
  element,
}: Props) => {
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
  const {
    register: register2,
    reset: linkReset,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<ProductLinkProp>({
    defaultValues: {
      url: "",
    },
  });
  const [linkData, setLinkData] = useState<LinkProduct | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { mutate: productLink } = useProductLink();
  const { mutate: createFunctional } = useCreateFunctional();
  const { mutate: updateProduct } = useUpdateProduct();
  const allSteps = [
    "Url Link",
    "Title, Articul, Code, Description, Price, InStock",
    "Catalogs",
    "Full Description",
    "Brand, Condition, Relavance, Garantee",
    " Characteristics",
    "Images",
  ];

  const handleNext = () => {
    if (activeStep < allSteps.length - 1) {
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
    if (data.images) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    Object.entries(data).forEach(([key, value]) => {
      if (
        value === undefined ||
        key === "id" ||
        key === "slug" ||
        key === "images" ||
        key === "fullDescriptionImages" ||
        key === "recommended"
      )
        return;

      if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

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
      // console.log("Updating product", data);
      updateProduct(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpenFunctional();
            reset();
            localStorage.removeItem("editorImages");
            localStorage.removeItem("fullDescriptionImages");
            // console.log("Product updated successfully", formData);
          },
        }
      );
    } else {
      // console.log("Creating product", data);
      createFunctional(formData, {
        onSuccess: () => {
          handleOpenFunctional();
          reset();
          localStorage.removeItem("editorImages");
          localStorage.removeItem("fullDescriptionImages");
        },
      });
    }
  };
  const onSubmit2 = async (data: ProductLinkProp) => {
    productLink(
      {
        url: data.url,
      },
      {
        onSuccess: (data) => {
          setLinkData(data.data);
          handleNext();
          linkReset();
          reset();
        },
      }
    );
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

    const imageUrls = element.fullDescriptionImages.map((img: string) => img);
    const api = "https://api.sectortechnology.uz/";
    let imageIndex = 0;

    blocks.blocks.forEach((block: Block) => {
      if (block.type === "image" && block.data.file.url.startsWith("blob:")) {
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
    handleBack,
    watch,
  };
  useEffect(() => {
    setActiveStep(0);
    if (isOpenFunctional) {
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
  }, [isOpenFunctional, element, reset]);

  return (
    <Dialog open={isOpenFunctional} onOpenChange={handleOpenFunctional}>
      <DialogContent
        className={`${theme.bg} flex flex-col py-5 px-7 max-w-6xl h-[calc(100vh-100px)] overflow-y-auto`}
      >
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            <div className="flex gap-2">
              {allSteps.map((step, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-2 py-2 rounded-md text-sm font-normal border",
                    theme.tabBg,
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
          <button onClick={handleOpenFunctional}>
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
          <form noValidate onSubmit={handleSubmit2(onSubmit2)}>
            {activeStep === 0 && (
              <ProductLink register={register2} errors={errors2} />
            )}
          </form>

          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 1 && (
              <ProductStepTwoLink
                setValue={setValue}
                handleBack={handleBack}
                register={register}
                errors={errors}
                handleNext={handleNext}
                watch={watch}
                linkData={linkData}
              />
            )}
            {activeStep === 2 && <ProductCatalogsLink {...catalogsProps} />}
            {activeStep === 3 && (
              <ProductFullDescriptionLink
                setValue={setValue}
                getValues={getValues}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            )}
            {activeStep === 4 && (
              <ProductBrandConditionLink
                control={control}
                setValue={setValue}
                linkData={linkData}
                handleNext={handleNext}
                handleBack={handleBack}
                watch={watch}
              />
            )}
            {activeStep === 5 && (
              <ProductCharacterLink
                linkData={linkData}
                setValue={setValue}
                control={control}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 6 && (
              <ProductImageFunctional
                setValue={setValue}
                handleNext={handleNext}
                linkData={linkData}
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

export default ProductModalFunctional;
