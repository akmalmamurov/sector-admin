import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2Icon, ArrowUpDown, AlertTriangle, X } from "lucide-react";
import classNames from "classnames";
import { useCurrentColor } from "@/hooks";
import { DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "../ui/dialog";
import { Dialog } from "../ui/dialog";
import { motion } from "framer-motion";
import { DOMAIN } from "@/constants";

interface ChangeOrderMenuProps {
  handleDelete: (id: string) => void;
  setOrderData: (orderData: { id: string; index: number }) => void;
  setIsOrderOpen: (isOpen: boolean) => void;
  id: string;
  valueId: string;
}

export const ChangePopularOrderMenu = memo( ({handleDelete,setOrderData,setIsOrderOpen,id,valueId}: ChangeOrderMenuProps) => {
  const theme = useCurrentColor();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className={classNames("w-4 h-4 text-header")} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={classNames(theme.bg)}>
          <DropdownMenuItem>
            <button
              onClick={() => handleDelete(id)}
              className={classNames(
                "w-full flex justify-center items-center",
                theme.text
              )}
            >
              <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
              Delete
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                setOrderData({ id: valueId, index: 0 });
                setIsOrderOpen(true);
              }}
              className={classNames(
                "w-full flex justify-center items-center",
                theme.text
              )}
            >
              <ArrowUpDown className="mr-2 w-4 h-4 text-blue-600" />
              Change order
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
});


interface IDeleletePopularProps {
    deleteIsOpen: boolean;
    setDeleteIsOpen: (isOpen: boolean) => void;
    handleDeletePopular: () => void;
    handleCancel: () => void;
    title: string;
}
export const DeleltePopular = memo( ({ deleteIsOpen, setDeleteIsOpen, handleDeletePopular, handleCancel, title }: IDeleletePopularProps) => {
  const theme = useCurrentColor();
  return (
    <Dialog open={deleteIsOpen} onOpenChange={setDeleteIsOpen}>
      <DialogContent
        className={`max-w-md p-6 rounded-xl shadow-lg ${theme.bg}`}
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" /> Delete {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <p className="text-lg font-medium mb-4 text-gray-700">
            Are you sure you want to delete this {title}?
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleDeletePopular}
              className={classNames(
                "bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md shadow-md",
                theme.text
              )}
            >
              Delete
            </Button>
            <Button
              onClick={handleCancel}
              className={classNames(
                "bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md shadow-md",
                theme.text
              )}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
});

interface IHandleImageProps{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    image: string;
}

export const HandleImage = memo(({ isOpen, setIsOpen, image }: IHandleImageProps) => {
    const theme = useCurrentColor();
    
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`max-w-3xl h-[500px] ${theme.bg} px-5 pt-6 flex flex-col`}
      >
        <DialogHeader>
          <DialogTitle className="hidden">Image</DialogTitle>
          <button onClick={() => setIsOpen(false)}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="w-full h-full px-14 rounded-md overflow-hidden flex justify-center items-center">
          <img
            src={`${DOMAIN}/${image}`}
            alt="brandImage"
            className="w-[300px] h-[240px]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
