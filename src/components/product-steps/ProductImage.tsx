import { useState } from "react";
import { X } from "lucide-react";
import { CreateButton } from "../create-button";

interface ProductImageProps {
  setValue: (files: File[]) => void;
  handleNext: () => void;
}

export const ProductImage = ({ setValue, handleNext }: ProductImageProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 5); 
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5)); 
      setValue([...files, ...selectedFiles].slice(0, 5)); 
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue(updatedFiles); 
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Product Images</h2>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-5">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Product Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {files.length < 5 && (
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Upload Images
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-5 mt-6">
        <CreateButton type="submit" onClick={handleNext}>Create Product</CreateButton>
      </div>
    </div>
  );
};

export default ProductImage;