import { useState } from "react";
import classNames from "classnames";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Reply, Trash2Icon } from "lucide-react";
import { useCurrentColor } from "@/hooks";
import ReplyModal from "../modal/ReplyModal";
import DeleteModal from "../modal/DeleteModal";
import { IComment, IQuestion } from "@/types";
interface Props {
  item: IComment | IQuestion;
  setMarkId:(value:string) => void,
  setReplyData:(value:{id:string, message:string}) => void,
  title: string;
  }

export const UpDeleteAndReply = ({ item, setMarkId, setReplyData, title }: Props) => {
  const theme = useCurrentColor();
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleReply = (id: string, replyText: string) => {
    setIsReplyOpen(false);
    setReplyData({ id, message: replyText });
  };

  const handleDelete = (id: string) => {
    setIsDeleteOpen(false);
    setMarkId(id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-4 h-4 text-header" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={classNames(theme.bg)}>
          <DropdownMenuItem>
            <button
              onClick={() => setIsReplyOpen(true)}
              className="w-full flex justify-center items-center"
            >
              <Reply className="mr-2 w-4 h-4 text-blue-600" />
              Reply
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="w-full flex justify-center items-center"
            >
              <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReplyModal
        isOpen={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        item={item}
        title={title}
        onReply={handleReply}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        markId={item.id}
        title={title}
        onDelete={handleDelete}
      />
    </>
  );
};

export default UpDeleteAndReply;
