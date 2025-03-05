import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useCurrentColor } from "@/hooks";
import { IComment, IQuestion } from "@/types";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IComment | IQuestion;
  onReply: (id: string, replyText: string) => void;
  title: string;
}

export const ReplyModal = ({
  isOpen,
  onClose,
  item,
  onReply,
  title,
}: ReplyModalProps) => {
  const theme = useCurrentColor();
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(item.id, replyText);
      setReplyText("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg rounded-xl shadow-lg ${theme.bg} px-6 py-5 flex flex-col space-y-4`}
      >
        <DialogHeader className="relative flex justify-between items-center border-b pb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700 italic bg-gray-100 p-3 rounded-lg self-start max-w-[80%]">
          {item.body}
        </p>
        <div className="space-y-2 flex flex-col items-end">
          {item.reply.map((reply) => (
            <p
              key={reply.id}
              className={`p-2 rounded-lg shadow-sm max-w-[80%] bg-blue-100 text-blue-500 text-right self-end`}
            >
              {reply.message}
            </p>
          ))}
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your reply..."
        />
        <div className="flex justify-end gap-4 mt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
