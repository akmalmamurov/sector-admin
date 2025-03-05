import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useCurrentColor } from "@/hooks";
import { cn } from "@/lib/utils";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  markId: string;
  onDelete: (id: string) => void;
  title: string;
}
export const DeleteModal = ({
  isOpen,
  onClose,
  markId,
  onDelete,
  title,
}: DeleteModalProps) => {
  const theme = useCurrentColor();

  const handleDelete = () => {
    onDelete(markId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${theme.bg} px-5 pt-6 flex flex-col items-center`}
      >
        <DialogHeader>
          <DialogTitle className={cn(`${theme.text}`, "text-2xl font-bold text-left")}>Confirm Deletion</DialogTitle>
          <button onClick={onClose}>
            <X className="w-6 h-6 absolute top-4 right-4" />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden">ds</DialogDescription>
        <p className="mb-4 text-center">
          Are you sure you want to delete this {title.split(" ")[2]} ?
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
