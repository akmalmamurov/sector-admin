import React, { useRef, useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { ProductRequest } from "@/types";
import { Button } from "../ui/button";
import { EDITOR_JS_TOOLS } from "../editor/Tools";

interface EditorProps {
  setValue: UseFormSetValue<ProductRequest>;
  getValues: UseFormGetValues<ProductRequest>;
  handleNext: () => void;
  handleBack: () => void;
}

const Editor: React.FC<EditorProps> = ({
  getValues,
  handleNext,
  handleBack,
  setValue,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData | null>(null);

  useEffect(() => {
    if (!editorData) {
      const fullDescription = getValues("fullDescription");
      try {
        setEditorData(fullDescription ? JSON.parse(fullDescription) : { blocks: [] });
      } catch (error) {
        console.error("Invalid JSON format in fullDescription", error);
        setEditorData({ blocks: [] });
      }
    }
  }, [getValues]);

  useEffect(() => {
    if (!editorRef.current && editorData) {
      const editor = new EditorJS({
        holder: "editor-container",
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
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
            setEditorData(content);
          }
        },
      });

      editorRef.current = editor;
    }
  }, [getValues, editorData]);

  const handleSave = async () => {
    if (editorRef.current) {
      const content: OutputData = await editorRef.current.save();
      setValue("fullDescription", JSON.stringify(content));
      handleNext();
    }
  };

  return (
    <div className="editor-container">
      <div id="editor-container" className="min-h-[200px]"></div>

      <div className="flex justify-end gap-5 mt-4">
        <Button type="button" onClick={handleBack}>Back</Button>
        <Button type="button" onClick={handleSave} >Next</Button>
      </div>
    </div>
  );
};

export default Editor;
