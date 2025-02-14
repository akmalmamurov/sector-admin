import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  closeModal: () => void;
}

export const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  closeModal,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (onConfirm) onConfirm();
              closeModal();
            }}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
