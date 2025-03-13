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
import { IComment } from "@/types";
interface CommentModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  commentData?: IComment[];
}

export const CommentModal = (props: CommentModalProps) => {
  const { isOpen, setOpen } = props;
  const theme = useCurrentColor();

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>Create Comment</DialogTitle>
          <button onClick={() => handleOpen()}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden">a</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
