import { X } from "lucide-react";
import classNames from "classnames";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentColor } from "@/hooks";
import { ProductData } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCreateProductRecommendationToggle } from "@/hooks/product/create-recommendation";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
interface ProductRecommendationModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  productRecommendationData: ProductData[];
}

export const ProductRecommendationModal = (props: ProductRecommendationModalProps) => {
  const { isOpen, setOpen, productRecommendationData } = props;
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const theme = useCurrentColor();

  const { mutate: createProductRecommendation } =  useCreateProductRecommendationToggle();

  const handleOpen = () => {
    setSelectedProductId("");
    setOpen(!isOpen);
  };
  const handleCreateProductRecommendation = () => {
    createProductRecommendation(selectedProductId);
    handleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            Create Product Recommendation
          </DialogTitle>
          <button onClick={() => handleOpen()}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        {!productRecommendationData?.length ? (
          <div>No products available</div>
        ) : (
          <>
            <Select
              onValueChange={(value) => {
                setSelectedProductId(value);
              }}
              value={selectedProductId || ""}
            >
              <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent className={theme.bg}>
                {productRecommendationData.map((product) => (
                  <SelectItem
                    key={product.id}
                    value={product.id}
                    className="text-header cursor-pointer"
                  >
                    {product.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCreateProductRecommendation}
              disabled={selectedProductId === ""}
              className={classNames("w-full disabled:opacity-50")}
            >
              Create
            </Button>
          </>
        )}
        <DialogDescription className="hidden">a</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ProductRecommendationModal;
