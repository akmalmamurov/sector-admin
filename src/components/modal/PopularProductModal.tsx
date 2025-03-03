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
import { PopularProduct } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import ReactSelect from "react-select";
import { useCreateToggleProduct } from "@/hooks/product/create-popular-product";
interface PopularProductModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  popularProductData: PopularProduct[];
}

export const PopularProductModal = (props: PopularProductModalProps) => {
  const { isOpen, setOpen, popularProductData } = props;
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const theme = useCurrentColor();

  const { mutate: createPopularProduct } = useCreateToggleProduct();

  const handleOpen = () => {
    setSelectedProductIds([]);
    setOpen(!isOpen);
  };
  const handleCreatePopular = () => {
    createPopularProduct(selectedProductIds);
    handleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>Create Popular Product</DialogTitle>
          <button onClick={() => handleOpen()}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        {!popularProductData?.length ? (
          <div>No products available</div>
        ) : (
          <>
            <ReactSelect
              options={popularProductData.map((product) => ({
                label: product.title,
                value: product.id,
              }))}
              isMulti
              onChange={(selectedOptions) =>
                setSelectedProductIds(
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : []
                )
              }
              placeholder="Select Products"
              className={classNames(theme.text, theme.bg)}
            />
            <Button
              onClick={handleCreatePopular}
              disabled={selectedProductIds.length === 0}
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

export default PopularProductModal;
