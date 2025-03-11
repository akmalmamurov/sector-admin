import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks/useCurrentColor";
import { IComment } from "@/types";
import classNames from "classnames";
import { DOMAIN } from "@/constants";
import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,  
  DialogDescription,  
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import UpDeleteAndReply from "../menu/UpDeleteAndReply";
import { useDeleteComment } from "@/hooks/remark/delete-comment";
import { useReplyComment } from "@/hooks/remark/reply-comment"; 
import { formatDate } from "@/utils/formatedDate";
interface Props {
  commentData: IComment[];
}

export const CommentTable = ({ commentData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const { mutate: replyComment } = useReplyComment()
  const [isOpen, setIsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [comment, setComment] = useState<IComment | null>(null);


  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  const handleComment = (comment: IComment) => {
    setComment(comment);
    setIsReplyOpen(true);
  }

  const [deleteCommentId, setDeteleteCommentId] = useState<string>("")
  const { mutate: deleteComment} = useDeleteComment()
  const [replyData, setReplyData] = useState<{ id: string; message: string; } | null>(null);

  console.log(commentData);
  
  useEffect(() => {
       if (replyData) {
         replyComment(
           { commentId: replyData.id, message: replyData.message }
         );
         setReplyData(null);  
       }
  }, [replyData, replyComment]);


  useEffect(() => {
    if (deleteCommentId) {
      deleteComment({ id: deleteCommentId });
      setDeteleteCommentId("");
    }
  }, [deleteCommentId, deleteComment]);

  return (
    <>
      <Table>
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            {[
              "ID",
              "Product Image",
              "Product Title",
              "Star",
              "Comment",
              "Created At",
              "Action",
            ].map((title) => (
              <TableHead
                key={title}
                className={classNames(
                  `font-bold text-sm uppercase px-5 ${
                    title === "Action" ? "text-end" : ""
                  }`,
                  theme.text
                )}
              >
                {title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {commentData?.map((comment, inx) => (
            <TableRow key={comment.id}>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {inx + 1}
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleImage(comment.products.mainImage)}
              >
                <img
                  src={`${DOMAIN}/${comment.products.mainImage}`}
                  alt={comment.products.title}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 max-w-[200px] truncate line-clamp-1",
                  theme.text
                )}
              >
                {comment.products.title}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {comment.star}
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleComment(comment)}
              >
                {comment.body}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {formatDate(comment.createdAt || new Date().toISOString())}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <UpDeleteAndReply
                  item={comment}
                  setMarkId={setDeteleteCommentId}
                  setReplyData={setReplyData}
                  title="Reply to comment"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          <div className="w-full h-full px-14 rounded-md overflow-hidden flex justify-center items-center">
            <img
              src={`${DOMAIN}/${image}`}
              alt="commentImage"
              className="w-[300px] h-[240px]"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent
          className={`max-w-3xl h-[500px] ${theme.bg} px-5 pt-6 flex flex-col rounded-lg shadow-lg`}
        >
          <DialogHeader className="relative flex justify-between items-center border-b pb-2">
            <p className="text-lg font-bold text-gray-800">Conversation</p>
            <button
              onClick={() => setIsReplyOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <X className="w-6 h-6 absolute top-4 right-4" />
            </button>
          </DialogHeader>
          <DialogDescription className="hidden">a</DialogDescription>
          <div className="flex flex-col gap-4 p-4 overflow-y-auto h-[400px]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-3 border-b w-3/4">
                <p className="font-semibold text-gray-800">
                  {comment?.user.name
                    ? comment?.user.name
                    : comment?.user.email}
                </p>
                <p className="text-gray-700 text-sm">{comment?.body}</p>
                <p className="text-gray-500 text-xs text-left">
                  {formatDate(comment?.createdAt || new Date().toISOString())}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-blue-500 font-semibold text-right my-2 ">Admin</p>
                 {comment?.reply.map((reply) => (
                <div
                  key={reply.id}
                  className="self-end p-3 rounded-lg border-b w-3/4 text-right"
                >
                  <p className="text-gray-700 text-sm">{reply.message}</p>
                  <p className="text-gray-500 text-xs text-right">
                    {formatDate(reply.createdAt || new Date().toISOString())}
                  </p>
                </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(CommentTable);
