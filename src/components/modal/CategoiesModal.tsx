import { ModalProps } from "@/types";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export const CategoiesModal = ({ isOpen, toggleOpen }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogHeader>Категория добавлена</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CategoiesModal;
