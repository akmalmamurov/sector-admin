import { X } from "lucide-react";
import classNames from "classnames";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentColor, useGetBrand } from "@/hooks";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { useCreateToggleBrand } from "@/hooks/brand/create-popular-brand";

interface PopularBrandModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export const PopularBrandModal = (props: PopularBrandModalProps) => {
  const { isOpen, setOpen } = props;
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const theme = useCurrentColor();

  const { data: brandsData = {data: {brands: [], total: 0, limitNumber: 0, pageNumber: 0}, error: null, status: 200}, refetch } = useGetBrand({popular: false});
  const { mutate: addBrand } = useCreateToggleBrand();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

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
          <DialogTitle className={theme.text}>Create Popular Brand</DialogTitle>
          <button onClick={handleOpen}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>

        <ReactSelect
          options={brandsData.data.brands.map((brand) => ({
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
