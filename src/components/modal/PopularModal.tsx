import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { useCurrentColor } from "../../hooks";
import classNames from "classnames";
import { X } from "lucide-react";
import { Catalog, SubCatalog } from "../../types";
import { FC, memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IPopularData {
  isOpen: boolean;
  handleOpen: () => void;
  catalogData: Catalog[];
  setSelectedCatalogId: (value: string) => void;
  setSelectedSubCatalogId: (value: string) => void;
  subCatalogData: SubCatalog[];
  selectedCatalogId: string;
  selectedSubCatalogId:string
}
const PopularModal: FC<IPopularData> = ({
  catalogData,
  handleOpen,
  isOpen,
  selectedCatalogId,
  setSelectedCatalogId,
  setSelectedSubCatalogId,
  selectedSubCatalogId,
  subCatalogData,
}) => {
  const theme = useCurrentColor();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle>Create Popular Category</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogClose>
        <Select
          onValueChange={(value) => {
            setSelectedCatalogId(value);
          }}
          value={selectedCatalogId || ""}
        >
          <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
            <SelectValue placeholder="Select Catalog" />
          </SelectTrigger>
          <SelectContent className={theme.bg}>
            {catalogData.map((catalog) => (
              <SelectItem
                key={catalog.id}
                value={catalog.id}
                className="text-header cursor-pointer"
              >
                {catalog.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setSelectedSubCatalogId(value)}
          value={selectedSubCatalogId || ""}
          disabled={!selectedCatalogId}
        >
          <SelectTrigger className="border border-header rounded-md px-3 text-header ring-header focus:ring-header min-w-[280px] text-sm font-semibold">
            <SelectValue placeholder="Select Subcatalog" />
          </SelectTrigger>
          <SelectContent className={theme.bg}>
            {subCatalogData.map((subcatalog) => (
              <SelectItem
                key={subcatalog.id}
                value={subcatalog.id}
                className="text-header cursor-pointer"
              >
                {subcatalog.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogDescription className="hidden">
          Description text goes here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default memo(PopularModal);
