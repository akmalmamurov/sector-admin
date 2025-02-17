import React, { useRef, useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import { UseFormSetValue } from "react-hook-form";
import { ProductRequest } from "@/types";
import { CreateButton } from "../create-button";

interface EditorProps {
  setValue: UseFormSetValue<ProductRequest>;
}

const Editor: React.FC<EditorProps> = ({  setValue }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
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
                  setImageFiles((prev) => [...prev, file]);

                  return {
                    success: 1,
                    file: {
                      url: localURL,
                    },
                  };
                },
              },
            },
          },
        },
        data: { blocks: [] },
      });
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

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
      console.log(content);
    }
  };

  return (
    <div className="editor-container">
      <div
        id="editor-container"
        style={{
          minHeight: "300px",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      ></div>

      <div className="image-preview mt-4">
        {imageFiles.length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Image Previews:</h3>
            <div className="flex gap-2 mt-2">
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <CreateButton
          type="submit"
          className="save-button mt-4"
          onClick={handleSave}
        >
          CreateProduct
        </CreateButton>
      </div>
    </div>
  );
};

export default Editor;
