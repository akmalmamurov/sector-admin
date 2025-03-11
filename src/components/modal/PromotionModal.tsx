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

interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<PromotionData>;
}

export const PromotionModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const { mutate: createPromotion } = useCreatePromotion();
  const { mutate: updatePromotion } = useUpdatePromotion();
  const [coverFile, setCoverFile] = useState<File | null>(null); 
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [descriptionFiles, setDescriptionFiles] = useState<File[]>([]); 
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [descriptionPreviews, setDescriptionPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<PromotionRequest>({
    defaultValues: {
      title: "",
      expireDate: "",
      fullDescription: "",
      expireTime: "",
    },
  });

  const watchedValues = watch();

  const isCreateDisabled =
    !watchedValues.title?.trim() ||
    !watchedValues.expireDate?.trim() ||
    !watchedValues.expireTime?.trim() ||
    !coverFile ||
    !bannerFile;
  const isUpdateDisabled =
    !isDirty && !coverFile && !bannerFile && !descriptionFiles.length ;

  const onSubmit = async (data: PromotionRequest) => {
    
    const formData = new FormData();
    const expireDateTime = new Date(`${data.expireDate}T${data.expireTime}:00`);
    const timestamp = expireDateTime.getTime();
    formData.append("title", data.title.trim());
    formData.append("expireDate", timestamp.toString());
    formData.append("fullDescription", data.fullDescription?.trim() || "");

    if (coverFile) formData.append("coverImage", coverFile);
    if (bannerFile) formData.append("promotionBannerImage", bannerFile);
    descriptionFiles.forEach((file) =>
      formData.append("promotionDescriptionImages", file)
    );

    if (element?.id) {
      updatePromotion(
        { id: element.id, data: formData },
        {
          onSuccess: () => handleOpen(false),
          onError: (error) => console.error("Yangilash xatosi:", error),
        }
      );
    } else {
      createPromotion(formData, {
        onSuccess: () => handleOpen(false),
        onError: (error) => console.error("Yaratish xatosi:", error),
      });
    }
  };

  useEffect(() => {

    if (isOpen) {
      const dateString = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const timeString = new Date().toTimeString().slice(0, 5);
      reset({
        title: element?.title || "",
        expireDate: dateString || "",
        expireTime: timeString || "",
        fullDescription: element?.fullDescription || "",
      });
      setCoverFile(null);
      setBannerFile(null);
      setDescriptionFiles([]);
      setCoverPreview(
        element?.coverImage ? `${DOMAIN}/${element.coverImage}` : null
      );
      setBannerPreview(
        element?.bannerImage ? `${DOMAIN}/${element.bannerImage}` : null
      );
      setDescriptionPreviews(
        element?.fullDescriptionImages?.map((img) => `${DOMAIN}/${img}`) || []
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

  const handleDescriptionImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length + descriptionFiles.length <= 5) {
      const newFiles = Array.from(files);
      setDescriptionFiles((prev) => [...prev, ...newFiles]);
      setDescriptionPreviews((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveDescriptionImage = (index: number) => {
    setDescriptionFiles((prev) => prev.filter((_, i) => i !== index));
    setDescriptionPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={`${theme.bg} overflow-y-auto max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle className={theme.text}>
            {element?.id ? "Update promotion" : "Create promotion"}
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
          <div>
            <input
              type="text"
              {...register("title", { required: "Sarlavha majburiy" })}
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
                  errors.expireDate ? "ring-red-500" : "focus:ring-activeInput"
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
                  errors.expireTime ? "ring-red-500" : "focus:ring-activeInput"
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
            <textarea
              {...register("fullDescription")}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text}`,
                "focus:ring-activeInput"
              )}
              placeholder="Full description (optional)"
            />
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
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleDescriptionImagesChange}
              className="hidden"
              id="description-upload"
            />
            <label
              htmlFor="description-upload"
              className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
            >
              Upload additional images (maximum 5)
            </label>
            {descriptionPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {descriptionPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Rasm ${index + 1}`}
                      className="max-h-32 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDescriptionImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            className="w-full py-5 font-bold"
            type="submit"
            disabled={element?.id ? isUpdateDisabled : isCreateDisabled}
          >
            {element?.id ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionModal;
