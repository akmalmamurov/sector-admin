/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { PromotionRequest, PromotionData } from "@/types";
import { Button } from "../ui/button";
import { EDITOR_JS_PROMOTION_TOOLS } from "../editor/ToolsPromotion";

interface EditorProps {
  setValue: UseFormSetValue<PromotionRequest>;
  getValues: UseFormGetValues<PromotionRequest>;
  handleNext: () => void;
  handleBack: () => void;
  element: PromotionData;
}

const Editor: React.FC<EditorProps> = ({
  getValues,
  handleNext,
  handleBack,
  setValue,
  element,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData | null>(null);

  useEffect(() => {
    if (!editorData) {
      const promotionFullDescription = getValues("promotionFullDescription");
      try {
        setEditorData(
          promotionFullDescription
            ? JSON.parse(promotionFullDescription)
            : { blocks: [] }
        );
      } catch (error) {
        console.error("Invalid JSON format in promotionFullDescription", error);
        setEditorData({ blocks: [] });
      }
    }
  }, [getValues]);

  useEffect(() => {
    if (!editorRef.current && editorData) {
      const editor = new EditorJS({
        holder: "editor-container-promotion",
        autofocus: true,
        tools: EDITOR_JS_PROMOTION_TOOLS,
        data: (() => {
          const promotionFullDescription = getValues(
            "promotionFullDescription"
          );
          try {
            return promotionFullDescription
              ? JSON.parse(promotionFullDescription)
              : { blocks: [] };
          } catch (error) {
            console.error(
              "Invalid JSON format in promotionFullDescription",
              error
            );
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
      setValue("promotionFullDescription", JSON.stringify(content));
      handleNext(); // Bu yerda submit ishga tushadi
    }
  };

  return (
    <div className="editor-container-promotion">
      <div id="editor-container-promotion" className="min-h-[200px]"></div>
      <div className="flex justify-end gap-5 mt-4">
        <Button type="button" onClick={handleBack}>
          Back
        </Button>
        <Button type="button" onClick={handleSave}>
          {element?.id ? "Update Promotion" : "Create Promotion"}
        </Button>
      </div>
    </div>
  );
};

export default Editor;