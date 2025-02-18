import React, { useRef, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
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

  useEffect(() => {
    const initializeEditor = async () => {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editor-container",
          autofocus: true,
          tools: {
            paragraph: Paragraph,
            header: Header,
            list: List,
            underline: Underline,
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  uploadByFile: async (file: File) => {
                    const localURL = URL.createObjectURL(file);
                    setImageFiles([...images, file]);

                    return {
                      success: 1,
                      file: { url: localURL },
                    };
                  },
                },
              },
            },
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
        });

        editorRef.current = editor;
      }
    };

    initializeEditor();

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [getValues, setImageFiles, images]);

  const handleSave = async () => {
    if (editorRef.current) {
      const content: OutputData = await editorRef.current.save();

      content.blocks = content.blocks.map((block) => {
        if (
          block.type === "image" &&
          block.data.file?.url?.startsWith("blob:")
        ) {
          block.data.file.url =
            block.data.file.url.split("/").pop() || block.data.file.url;
        }
        return block;
      });

      setValue("fullDescription", JSON.stringify(content));
      handleNext();
    }
  };

  return (
    <div className="editor-container">
      <div
        id="editor-container"
        style={{
          minHeight: "200px",
          border: "1px solid #ddd",
          padding: "1px",
        }}
      ></div>

      <div className="image-preview mt-4">
        <>
          <h3 className="text-lg font-semibold">Image Previews:</h3>
          {images.length > 0 && (
            <div className="flex gap-2 mt-2">
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </>
      </div>

      <div className="flex justify-end gap-5">
        <Button type="button" className="save-button mt-4" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" className="save-button mt-4" onClick={handleSave}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Editor;
