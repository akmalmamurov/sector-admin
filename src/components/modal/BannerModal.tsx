import { BannerData, BannerRequest,  } from "@/types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import classNames from "classnames";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";
import { useCreateBanner, useCurrentColor, useUpdateBanner } from "@/hooks";

interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<BannerData>;
}

export const BannerModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const { mutate: createBanner } = useCreateBanner();
  const { mutate: updateBanner } = useUpdateBanner();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty },
  } = useForm<BannerRequest>();

  const watchedValues = watch();
  const isCreateDisabled =
    !watchedValues.routePath || !watchedValues.redirectUrl;
  const isUpdateDisabled = !isDirty && !isImageUpdated;

  const onSubmit = async (data: BannerRequest) => {
    const formData = new FormData();
    formData.append("routePath", data.routePath.trim());
    formData.append("redirectUrl", data.redirectUrl.trim());

    if (file) {
      formData.append("bannerImage", file);
    } else if (element?.imagePath) {
      formData.append("bannerImage", element.imagePath);
    } else {
      setError("bannerImage", {
        type: "manual",
        message: "Banner image is required",
      });
      return;
    }

    if (element?.id) {
      updateBanner(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpen(false);
            reset();
            setPreview(null);
            setFile(null);
            setIsImageUpdated(false);
          },
        }
      );
    } else {
      createBanner(formData, {
        onSuccess: () => {
          handleOpen(false);
          reset();
          setPreview(null);
          setFile(null);
          setIsImageUpdated(false);
        },
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        routePath: element?.routePath || "",
        redirectUrl: element?.redirectUrl || "",
      });

      if (element?.imagePath) {
        setPreview(`${DOMAIN}/${element.imagePath}`);
      } else {
        setPreview(null);
      }
      setIsImageUpdated(false);
      setFile(null);
    }
  }, [isOpen, element, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsImageUpdated(true);
      clearErrors("bannerImage");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Banner"
              : "Update Banner"}
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
        <DialogDescription className="hidden">a</DialogDescription>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="routePath" className={theme.text}>
              Route Path
            </label>
            <input
              type="text"
              {...register("routePath", {
                required: "Route Path is required",
              })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.routePath
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Route Path"
            />
            {errors.routePath && (
              <span className="text-red-500">
                {errors.routePath.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="redirectUrl" className={theme.text}>
              Redirect URL
            </label>
            <input
              type="text"
              {...register("redirectUrl", {
                required: "Redirect URL is required",
              })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.redirectUrl
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Redirect URL"
            />
            {errors.redirectUrl && (
              <span className="text-red-500">
                {errors.redirectUrl.message}
              </span>
            )}
          </div>

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="bannerImage-upload"
            />
            <label
              htmlFor="bannerImage-upload"
              className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
            >
              Upload Banner Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="Banner Preview"
                className="mt-2 max-h-32 mx-auto"
              />
            )}
            {errors.bannerImage && (
              <span className="text-red-500">
                {errors.bannerImage.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {Object.keys(element).length === 0 ? (
              <Button
                type="submit"
                className="w-full py-5 font-bold"
                disabled={isCreateDisabled || file === null}
              >
                Create
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-5 font-bold"
                disabled={isUpdateDisabled}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BannerModal;
