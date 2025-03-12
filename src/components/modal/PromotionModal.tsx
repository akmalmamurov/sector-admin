import { PromotionData, PromotionRequest } from "@/types";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import classNames from "classnames";
import {
  useCreatePromotion,
  useCurrentColor,
  useUpdatePromotion,
} from "@/hooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";
import { FullDescription } from "../promotion-step/fullDescripton";

interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<PromotionData>;
}

interface StoredImage {
  base64: string;
  name: string;
}

const steps = [
  "Title, Expire Date, Expire Time cover image, promotion banner image",
  "Full Description",
];

export const PromotionModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const { mutate: createPromotion } = useCreatePromotion();
  const { mutate: updatePromotion } = useUpdatePromotion();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<PromotionRequest>({
    defaultValues: {
      title: "",
      expireDate: "",
      expireTime: "",
    },
  });

  const watchedValues = watch();

  const isCreateDisabled =
    !watchedValues.title?.trim() ||
    !watchedValues.expireDate?.trim() ||
    !watchedValues.expireTime?.trim() ||
    (!coverFile && !element?.coverImage) ||
    (!bannerFile && !element?.bannerImage);

  const isNextDisabled = activeStep === 0 ? isCreateDisabled : false;

  const onSubmit = async (data: PromotionRequest) => {
    const formData = new FormData();

    const expireDate =
      data.expireDate || new Date().toISOString().split("T")[0];
    const expireTime = data.expireTime || "00:00";
    const expireDateTime = new Date(`${expireDate}T${expireTime}:00`);

    if (isNaN(expireDateTime.getTime())) {
      console.error(
        "Noto'g'ri sana yoki vaqt formati:",
        expireDate,
        expireTime
      );
      return;
    }

    const timestamp = expireDateTime.getTime();
    console.log("Timestamp:", timestamp);
    formData.append("title", data.title.trim());
    formData.append("expireDate", new Date(timestamp).toISOString());
    if (data.promotionFullDescription) {
      formData.append(
        "promotionFullDescription",
        data.promotionFullDescription
      );
    }

    if (coverFile) formData.append("coverImage", coverFile);
    if (bannerFile) formData.append("promotionBannerImage", bannerFile);

    const hasUrlInFullDescription =
      data.promotionFullDescription?.includes("http");

    if (hasUrlInFullDescription) {
      const storedImages = JSON.parse(
        localStorage.getItem("promotionDescriptionImages") || "[]"
      );
      storedImages.forEach((img: StoredImage) => {
        const byteString = atob(img.base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const file = new Blob([uint8Array], { type: "image/png" });
        formData.append("promotionDescriptionImages", file, img.name);
      });
    } else {
      localStorage.removeItem("promotionDescriptionImages");
    }

    if (element?.id) {
      updatePromotion(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpen(false);
            reset();
            setActiveStep(0);
            localStorage.removeItem("promotionDescriptionImages");
          },
          onError: (error) => console.error("Yangilash xatosi:", error),
        }
      );
    } else {
      createPromotion(formData, {
        onSuccess: () => {
          handleOpen(false);
          reset();
          setActiveStep(0);
          localStorage.removeItem("promotionDescriptionImages");
        },
        onError: (error) => console.error("Yaratish xatosi:", error),
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      let expireDate = new Date().toISOString().split("T")[0];
      let expireTime = "11:59";

      if (element?.expireDate) {
        const dateParts = element.expireDate.split("T");
        if (dateParts.length === 2) {
          expireDate = dateParts[0];
          expireTime = dateParts[1]?.slice(0, 5) || "11:59";
        }
      }
        reset({
        title: element?.title || "",
        expireDate,
        expireTime,
        promotionFullDescription: element?.fullDescription || "",
      });

      setCoverFile(null);
      setBannerFile(null);
      setCoverPreview(
        element?.coverImage ? `${DOMAIN}/${element.coverImage}` : null
      );
      setBannerPreview(
        element?.bannerImage ? `${DOMAIN}/${element.bannerImage}` : null
      );
    }
  }, [isOpen, element, reset]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent
        className={`${theme.bg} flex flex-col py-5 px-7 max-w-4xl h-[calc(100vh-200px)] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className={theme.text}>
            <div className="flex gap-5">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-2 py-2 rounded-md text-sm font-normal border",
                    theme.tabBg,
                    index === activeStep
                      ? `${theme.tabActive} ${theme.text}`
                      : `bg-transparent text-header shadow-2xl`
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
          <button onClick={() => handleOpen(false)}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {activeStep === 0 && (
            <>
              <div>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={classNames(
                    `inputs ${theme.sidebar} ${theme.text}`,
                    errors.title ? "ring-red-500" : "focus:ring-activeInput"
                  )}
                  placeholder="Promotion title"
                />
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    {...register("expireDate", {
                      required: "End date is required",
                    })}
                    className={classNames(
                      `inputs ${theme.sidebar} ${theme.text} w-full`,
                      errors.expireDate
                        ? "ring-red-500"
                        : "focus:ring-activeInput"
                    )}
                  />
                  {errors.expireDate && (
                    <span className="text-red-500">
                      {errors.expireDate.message}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="time"
                    {...register("expireTime", {
                      required: "End time is required",
                    })}
                    className={classNames(
                      `inputs ${theme.sidebar} ${theme.text} w-full`,
                      errors.expireTime
                        ? "ring-red-500"
                        : "focus:ring-activeInput"
                    )}
                  />
                  {errors.expireTime && (
                    <span className="text-red-500">
                      {errors.expireTime.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
                >
                  Upload cover image *
                </label>
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="mt-2 max-h-32 mx-auto rounded-md"
                  />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
                >
                  Upload banner image *
                </label>
                {bannerPreview && (
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    className="mt-2 max-h-32 mx-auto rounded-md"
                  />
                )}
              </div>
              <div className="col-span-3 flex justify-end mt-10">
                <Button onClick={handleNext} disabled={isNextDisabled}>
                  Next
                </Button>
              </div>
            </>
          )}
          {activeStep === 1 && (
            <FullDescription
              element={element as PromotionData}
              setValue={setValue}
              getValues={getValues}
              handleNext={handleSubmit(onSubmit)}
              handleBack={handleBack}
            />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionModal;
