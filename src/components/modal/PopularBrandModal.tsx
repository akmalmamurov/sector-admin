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
import { IPopularBrand } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import ReactSelect from "react-select";
import { useCreateToggleBrand } from "@/hooks/brand/create-popular-brand";

interface PopularBrandModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  brandsData: IPopularBrand[];
}

export const PopularBrandModal = (props: PopularBrandModalProps) => {
  const { isOpen, setOpen, brandsData } = props;
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const theme = useCurrentColor();

  const { mutate: addBrand } = useCreateToggleBrand();
  
  const handleOpen = () => {
    setSelectedBrandIds([]);
    setOpen(!isOpen);
  };
  const handleCreatePopular = () => {
    addBrand(selectedBrandIds);
    handleOpen(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            Create Popular Brand
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
        <ReactSelect
          options={brandsData.map((brand) => ({
            label: brand.title,
            value: brand.id,
          }))}
          isMulti
          onChange={(selectedOptions) =>
            setSelectedBrandIds(
              selectedOptions
                ? selectedOptions.map((option) => option.value)
                : []
            )
          }
          placeholder="Select Brands"
          className={classNames(theme.text, theme.bg)}
        />

        <Button
          onClick={handleCreatePopular}
          disabled={selectedBrandIds.length === 0}
          className={classNames("w-full disabled:opacity-50")}
        >
          Create
        </Button>

        <DialogDescription className="hidden">a</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PopularBrandModal;
