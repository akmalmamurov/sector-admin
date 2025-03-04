import { Brand, BrandRequest } from "@/types";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import classNames from "classnames";
import { useCreateBrand, useCurrentColor, useUpdateBrand } from "@/hooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";
import { useGetBrandSelectedImages } from "@/hooks/brand/get-select-images";  
import { useUpdateBrandWithPath } from "@/hooks/brand/update-brand-with-path";
interface Props {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
  element: Partial<Brand>;
}

export const BrandModal = ({ isOpen, handleOpen, element }: Props) => {
  const theme = useCurrentColor();
  const { mutate: createBrand } = useCreateBrand();
  const { mutate: updateBrand } = useUpdateBrand();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [isConfirmingUpdate, setIsConfirmingUpdate] = useState<string | null>(null);
  const [isConfirmingUpdateOpen, setIsConfirmingUpdateOpen] = useState(false);
  
  const handleConfirmUpdate = (path:string) => {
    setIsConfirmingUpdate(path);
    setIsConfirmingUpdateOpen(true);
  };
    const { data: images } = useGetBrandSelectedImages(); 
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const { mutate: updateBrandWithPath } = useUpdateBrandWithPath();

  useEffect(() => {
    if (selectedImagePath && element.id) {
      updateBrandWithPath(
        { id: element.id, path: selectedImagePath },
        {
          onSuccess: () => {
            setIsImageModalOpen(false);
            setSelectedImagePath(null);
            setPreview(null);
            setFile(null);
            setIsImageUpdated(false);
            handleOpen(false);
            setIsConfirmingUpdateOpen(false);
            setIsConfirmingUpdate(null);
            setSelectedImagePath(null)
          },
        }
      );
    }
  }, [selectedImagePath, element.id, updateBrandWithPath, handleOpen]);


  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, isDirty },
  } = useForm<BrandRequest>();

  const watchedValues = watch();

  const isCreateDisabled = !watchedValues.title || !watchedValues.title.trim();

  const isUpdateDisabled = !isDirty && !isImageUpdated;
  const onSubmit = async (data: BrandRequest) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description || ""); 


    if (file) {
      formData.append("logo", file);
    } else if (element?.path) {
      formData.append("logo", element.path);
    } else {
      setError("logo", { type: "manual", message: "Image is required" });
      return;
    }

    if (element?.id) {
      updateBrand(
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
      createBrand(formData, {
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
        title: element?.title || "",
        description: element?.description || "",
      });

      if (element?.path) {
        setPreview(`${DOMAIN}/${element.path}`);
      } else {
        setPreview(null);
      }
      setIsImageUpdated(false);
      setFile(null);
    }
  }, [isOpen, element, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setIsImageUpdated(true);
      clearErrors("logo");
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length === 0
              ? "Create Brand"
              : "Update Brand"}
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
          <div>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                errors.title
                  ? "ring-red-500 focus:ring-red-500"
                  : "focus:ring-activeInput"
              )}
              placeholder="Brand Title"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("description")}
              className={classNames(
                `inputs ${theme.sidebar} ${theme.text} placeholder:${theme.text}`,
                "focus:ring-activeInput mt-2"
              )}  
              placeholder="Brand Description"
            />
          </div>

          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="path-upload"
            />
            <div className="flex gap-4">
              <label
                htmlFor="path-upload"
                className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
              >
                Upload path
              </label>
              {element.id && (
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="block w-full text-center cursor-pointer border-2 border-dashed p-2 rounded-md hover:border-gray-400"
                >
                  Select Image
                </button>
              )}
            </div>
            {preview && (
              <img
                src={preview}
                alt="path Preview"
                className="mt-2 max-h-32 mx-auto"
              />
            )}
            {errors.logo && (
              <span className="text-red-500">{errors.logo.message}</span>
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

      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-[80vw] max-h-[80vh] w-full h-full">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <DialogDescription className="hidden">a</DialogDescription>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full h-full overflow-y-auto">
            {images?.data?.map((image, inx) => (
              <div key={inx} className="flex flex-col gap-2">
                <img
                  onClick={() => handleConfirmUpdate(image?.name)}
                  src={`${DOMAIN}/${image?.name}`}
                  alt={image?.name}
                  className="w-full h-40 object-contain cursor-pointer bg-gray-100 p-2 rounded-lg shadow-md hover:opacity-75 transition"
                />
                <span className="text-sm text-center">{image?.name}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isConfirmingUpdateOpen} onOpenChange={setIsConfirmingUpdateOpen}>
        <DialogContent>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogDescription>Are you sure you want to update the image path?</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setSelectedImagePath(isConfirmingUpdate || "")}>Confirm</Button>
            <Button onClick={() => setIsConfirmingUpdateOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default BrandModal;
