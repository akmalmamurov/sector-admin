/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { ProductRequest } from "@/types";
import { Button } from "../ui/button";

interface EditorProps {
  setValue: UseFormSetValue<ProductRequest>;
  getValues: UseFormGetValues<ProductRequest>;
  images: File[];
  setImageFiles: (files: File[]) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const Editor: React.FC<EditorProps> = ({
  setValue,
  getValues,
  handleNext,
  handleBack,
  images,
  setImageFiles,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [_blocks, setBlocks] = useState<OutputData["blocks"]>([]);

  useEffect(() => {
    if (!editorRef.current) {
      const initializeEditor = async () => {
        const editor = new EditorJS({
          holder: "editor-container",
          autofocus: true,
          tools: {
            paragraph: Paragraph,
            header: Header,
            list: List,
            underline: Underline,
          },
          data: (() => {
            const fullDescription = getValues("fullDescription");
            try {
              return fullDescription
                ? JSON.parse(fullDescription)
                : { blocks: [] };
            } catch (error) {
              console.error("Invalid JSON format in fullDescription", error);
              return { blocks: [] };
            }
          })(),
          onChange: async () => {
            if (editorRef.current) {
              const content = await editorRef.current.save();
              setBlocks(content.blocks);
            }
          },
        });

        editorRef.current = editor;
      };
      initializeEditor();
    }
  }, [getValues]);

  const handleSave = async () => {
    if (editorRef.current) {
      const content: OutputData = await editorRef.current.save();
      setValue("fullDescription", JSON.stringify(content));
      handleNext();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles([...images, ...newFiles]);
    }
  };
  

  const handleRemoveImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
  };
  
  return (
    <div className="editor-container">
      <div id="editor-container"></div>

      <div className="mt-4 flex gap-2 items-center">
        <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded">
          Image Upload
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <div className="flex flex-wrap mt-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="uploaded"
                className="w-20 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-4">
        <Button type="button" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" onClick={handleSave}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Editor;
