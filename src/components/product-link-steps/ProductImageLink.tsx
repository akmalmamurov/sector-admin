/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { X } from "lucide-react";
import { CreateButton } from "../create-button";
import { ProductData } from "@/types";
import { DOMAIN } from "@/constants";
import { Button } from "../ui/button";

interface ProductImageProps {
  setValue: (data: { productMainImage?: File; productImages?: File[] }) => void;
  handleNext: () => void;
  element?: Partial<ProductData>;
  handleBack?: () => void;
}

export const ProductImageLink = ({
  setValue,
  handleNext,
  element,
  handleBack,
}: ProductImageProps) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const [updatedImages, setUpdatedImages] = useState<{ [key: number]: File }>(
    {}
  );
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const existingImages = [
    ...(element?.mainImage ? [element.mainImage] : []),
    ...(Array.isArray(element?.images) ? element.images : []),
  ];

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      alert("Fayl hajmi 1 MB dan oshmasligi kerak.");
      return false;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(
        "Faqat image/jpeg, image/png, image/gif, image/webp formatdagi fayllarni yuklash mumkin."
      );
      return false;
    }
    return true;
  };
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFile(file)) return;
      setMainImageFile(file);
      setValue({ productMainImage: file, productImages: additionalFiles });
    }
  };
  const handleImageUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFile(file)) return;

      setUpdatedImages((prev) => ({ ...prev, [index]: file }));

      const updatedFiles = { ...updatedImages, [index]: file };
      setValue({
        productMainImage: updatedFiles[0],
        productImages: Object.entries(updatedFiles)
          .filter(([idx]) => idx !== "0")
          .map(([_, file]) => file),
      });
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const maxAllowed = 10 - additionalFiles.length;
      const selectedFiles = filesArray.slice(0, maxAllowed);
      const validFiles = selectedFiles.filter((file) => validateFile(file));
      const newFiles = [...additionalFiles, ...validFiles];
      setAdditionalFiles(newFiles);
      setValue({
        productMainImage: updatedImages[0] ?? undefined,
        productImages: newFiles,
      });
    }
  };

  const removeMainImage = () => {
    setUpdatedImages({});
    setAdditionalFiles([]);
    setValue({ productMainImage: undefined, productImages: [] });
  };

  const removeAdditionalImage = (index: number) => {
    const updatedFiles = additionalFiles.filter((_, i) => i !== index);
    setAdditionalFiles(updatedFiles);
    setValue({
      productMainImage: updatedImages[0] ?? undefined,
      productImages: updatedFiles,
    });
  };

  if (element?.id) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Product Images</h2>

        <div className="grid grid-cols-5 gap-4 mb-20">
          {existingImages.map((image, index) => {
            const labelText =
              index === 0 && element?.mainImage
                ? "Update Main Image"
                : "Update Image";
            return (
              <div key={index} className="relative">
                <img
                  src={
                    updatedImages[index]
                      ? URL.createObjectURL(updatedImages[index])
                      : `${DOMAIN}/${image}`
                  }
                  alt={`Product Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpdate(e, index)}
                    className="hidden"
                    id={`update-image-${index}`}
                  />
                  <label
                    htmlFor={`update-image-${index}`}
                    className="cursor-pointer bg-green-500 text-white px-2 py-1 rounded-md text-xs"
                  >
                    {labelText}
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-5 mt-40">
          {handleBack && (
            <Button type="button" onClick={handleBack} className="h-[42px]">
              Back
            </Button>
          )}
          <CreateButton type="submit" onClick={handleNext}>
            Update Product
          </CreateButton>
        </div>
      </div>
      // <div className="p-4">
      //   <h2 className="text-lg font-semibold mb-3">Product Images</h2>

      //   <div className="grid grid-cols-5 gap-4 mb-10">
      //     {existingImages.map((image, index) => {
      //       const isUploaded = typeof image === "string";
      //       const labelText =
      //         index === 0 && element?.mainImage
      //           ? "Update Main Image"
      //           : "Update Image";

      //       return (
      //         <div key={index} className="relative">
      //           <img
      //             src={
      //               isUploaded
      //                 ? `${DOMAIN}/${image}`
      //                 : URL.createObjectURL(image)
      //             }
      //             alt={`Product Image ${index + 1}`}
      //             className="w-24 h-24 object-cover rounded-md"
      //           />
      //           <button
      //             onClick={() => removeAdditionalImage(index)}
      //             className="absolute top-1 right-20 bg-red-500 text-white rounded-full p-1"
      //           >
      //             <X className="w-4 h-4" />
      //           </button>
      //           <div className="mt-2">
      //             <input
      //               type="file"
      //               accept="image/*"
      //               onChange={(e) => handleImageUpdate(e, index)}
      //               className="hidden"
      //               id={`update-image-${index}`}
      //             />
      //             <label
      //               htmlFor={`update-image-${index}`}
      //               className="cursor-pointer bg-green-500 text-white px-2 py-1 rounded-md text-xs"
      //             >
      //               {labelText}
      //             </label>
      //           </div>
      //         </div>
      //       );
      //     })}
      //   </div>

      //   {/* Yangi rasmlar qo‘shish */}
      //   <div className="mt-6">
      //     <h3 className="text-md font-semibold mb-2">Add Additional Images</h3>

      //     <div className="flex flex-wrap gap-5 mb-4">
      //       {additionalFiles.map((file, index) => (
      //         <div key={index} className="relative">
      //           <img
      //             src={URL.createObjectURL(file)}
      //             alt={`Additional Image ${index + 1}`}
      //             className="w-24 h-24 object-cover rounded-md"
      //           />
      //           <button
      //             onClick={() => removeAdditionalImage(index)}
      //             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
      //           >
      //             <X className="w-4 h-4" />
      //           </button>
      //         </div>
      //       ))}
      //     </div>

      //     <input
      //       type="file"
      //       accept="image/*"
      //       multiple
      //       onChange={handleAdditionalImagesChange}
      //       className="hidden"
      //       id="update-additional-images-upload"
      //     />
      //     <label
      //       htmlFor="update-additional-images-upload"
      //       className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
      //     >
      //       Upload Additional Images
      //     </label>
      //   </div>

      //   {/* Tugmalar */}
      //   <div className="flex justify-end gap-5 mt-6">
      //     {handleBack && <Button onClick={handleBack}>Back</Button>}
      //     <CreateButton type="submit" onClick={handleNext}>
      //       Update Product
      //     </CreateButton>
      //   </div>
      // </div>
    );
  }

  // CREATE mode
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold mb-3 text-center">Product Images</h2>
      <div className="flex gap-4">
        <div className="border-r-2 pr-4 border-header">
          {mainImageFile ? (
            <div className="relative inline-block">
              <img
                src={URL.createObjectURL(mainImageFile)}
                alt="Main Product Image"
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                onClick={removeMainImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
                id="main-image-upload"
              />
              <label
                htmlFor="main-image-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload Main Image
              </label>
            </div>
          )}
        </div>
        <div>
          {additionalFiles.length > 0 && (
            <div className="flex flex-wrap gap-5 mb-4">
              {additionalFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Additional Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {additionalFiles.length < 10 && (
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="hidden"
                id="additional-images-upload"
              />
              <label
                htmlFor="additional-images-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload Additional Images
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-6">
        {handleBack && (
          <Button type="button" onClick={handleBack} className="h-[42px]">
            Back
          </Button>
        )}
        <CreateButton type="submit" onClick={handleNext}>
          Create Product
        </CreateButton>
      </div>
    </div>
  );
};

export default ProductImageLink;
