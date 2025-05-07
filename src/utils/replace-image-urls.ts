import { Block } from "@/components/modal";
import { NewsData, PromotionData } from "@/types";

export function replaceImageUrls(element: PromotionData | NewsData) {
    if (!element.fullDescription || !element.fullDescriptionImages) return;

    let blocks;
    try {
      blocks = JSON.parse(element.fullDescription);
    } catch (error) {
      console.error("Invalid JSON in fullDescription", error);
      return;
    }

    if (!blocks.blocks || !Array.isArray(blocks.blocks)) return;

    const imageUrls = element.fullDescriptionImages.map((img: string) => img);
    const api = "http://localhost:4000/";
    let imageIndex = 0; 

    blocks.blocks.forEach((block: Block) => {
      if (block.type === "image" && block.data.file.url.startsWith("blob:")) {
        if (imageUrls[imageIndex]) {
          block.data.file.url = `${api}${imageUrls[imageIndex]}`;
          imageIndex++;
        }
      }
    });
    return element.fullDescription = JSON.stringify(blocks);
  }