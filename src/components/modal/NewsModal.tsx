import { NewsData, NewsRequest } from "@/types";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import classNames from "classnames";
import { useCurrentColor } from "@/hooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Editor from "../news-steps/Editor";
import { useCreateNews } from "@/hooks/news/create-news";
import { useUpdateNews } from "@/hooks/news/update-news";
import { replaceImageUrls } from "@/utils/replace-image-urls";

interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<NewsData>;
}

interface StoredImage {
  base64: string;
  name: string;
}

const steps = [
  "Title, Description, Created At",
  "Full Description",
];

export const NewsModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const { mutate: createNews } = useCreateNews();
  const { mutate: updateNews } = useUpdateNews();
  const [activeStep, setActiveStep] = useState(0);

  const { register, handleSubmit, reset, formState: { errors }, watch, setValue, getValues } = useForm<NewsRequest>({
    defaultValues: {
      title: "",
      description: "",
      createdAt: "",
      fullDescription: "",
      fullDescriptionImages: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      if (element && element.id) {
        if (element.fullDescription && element.fullDescriptionImages) {
          replaceImageUrls(element as NewsData);
        }
        reset({
          title: element?.title || "",
          description: element?.description || "",
          createdAt: element.createdAt ? new Date(element.createdAt).toISOString().split("T")[0] : "",
          fullDescription: element.fullDescription || "",
          fullDescriptionImages: [],
        });
      } else {
        reset({
          title: "",
          description: "",
          createdAt: "",
          fullDescription: "",
          fullDescriptionImages: [],
        });
      }
    }
  }, [isOpen, element, reset]);

  const watchedValues = watch();
  const isCreateDisabled = !watchedValues.title?.trim() || !watchedValues.description?.trim() || !watchedValues.createdAt?.trim();
  const isNextDisabled = activeStep === 0 ? isCreateDisabled : false;

  const onSubmit = async (data: NewsRequest) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    formData.append("createdAt", new Date(data.createdAt).toISOString());
    formData.append("fullDescription", data.fullDescription || "");

    const hasUrlInFullDescription = data.fullDescription?.includes("http");
    if (hasUrlInFullDescription) {
      const storedImages = JSON.parse(localStorage.getItem("newsfullDescriptionImages") || "[]");
      storedImages.forEach((img: StoredImage) => {
        const byteString = atob(img.base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const file = new Blob([uint8Array], { type: "image/png" });
        formData.append("newsFullDescriptionImages", file, img.name);
      });
    } else {
      localStorage.removeItem("newsfullDescriptionImages");
    }

    if (element?.id) {
        updateNews(
        { id: element.id, data: formData },
        {
          onSuccess: () => {
            handleOpen(false);
            reset();
            setActiveStep(0);
            localStorage.removeItem("newsfullDescriptionImages");
          },
          onError: (error) => console.error("Yangilash xatosi:", error),
        }
      );
    } else {
        createNews(formData, {
        onSuccess: () => {
          handleOpen(false);
          reset();
          setActiveStep(0);
          localStorage.removeItem("newsfullDescriptionImages");
        },
        onError: (error) => console.error("Yaratish xatosi:", error),
      });
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
        className={`${theme.bg} flex flex-col py-5 px-7 max-w-5xl h-[calc(100vh-100px)] overflow-y-auto`}
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
          <DialogDescription className="hidden">News Modal</DialogDescription>
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
            <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                <label className={classNames(theme.text, "text-sm font-medium")}>
                    Sarlavha
                </label>
                <input
                    type="text"
                    {...register("title", { required: "Sarlavha kiritilishi shart" })}
                    className={classNames(
                    theme.sidebar,
                    theme.text,
                    "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm",
                    errors.title ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                    )}
                    placeholder="Yangilik sarlavhasi"
                />
                {errors.title && (
                    <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>
                )}
                </div>

                <div className="flex flex-col space-y-2">
                <label className={classNames(theme.text, "text-sm font-medium")}>
                    Qisqacha tavsif
                </label>
                <textarea
                    {...register("description", { required: "Tavsif kiritilishi shart" })}
                    className={classNames(
                    theme.sidebar,
                    theme.text,
                    "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm resize-y",
                    errors.description ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                    )}
                    placeholder="Qisqacha tavsif"
                    rows={4}
                />
                {errors.description && (
                    <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
                )}
                </div>

                <div className="flex flex-col space-y-2">
                <label className={classNames(theme.text, "text-sm font-medium")}>
                    Yaratilgan sana
                </label>
                <input
                    type="date"
                    {...register("createdAt", { required: "Yaratilgan sana kiritilishi shart" })}
                    className={classNames(
                    theme.sidebar,
                    theme.text,
                    "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm",
                    errors.createdAt ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                    )}
                />
                {errors.createdAt && (
                    <span className="text-red-500 text-xs mt-1">{errors.createdAt.message}</span>
                )}
                </div>

                <div className="flex justify-end mt-8">
                <Button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={classNames(
                    "px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 shadow-md",
                    isNextDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    )}
                >
                    Keyingi
                </Button>
                </div>
            </div>
            )}
          {activeStep === 1 && (
            <Editor
              element={element as NewsData}
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

export default NewsModal;