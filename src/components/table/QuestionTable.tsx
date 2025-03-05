import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentColor } from "@/hooks/useCurrentColor";
import { IQuestion } from "@/types";
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
import { useReplyQuestion } from "@/hooks/remark/reply-question";
import { formatDate } from "@/utils/formatedDate";
import { useDeleteQuestion } from "@/hooks/remark/delete-question";
interface Props {
  questionData: IQuestion[];
}

export const QuestionTable = ({ questionData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const { mutate: replyQuestion } = useReplyQuestion();
  const [isOpen, setIsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [question, setQuestion] = useState<IQuestion | null>(null);

  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };

  const handleQuestion = (question: IQuestion) => {
    setQuestion(question);
    setIsReplyOpen(true);
  };

  const [deleteQuestionId, setDeteleteQuestionId] = useState<string>("");
  const { mutate: deleteQuestion } = useDeleteQuestion();    
  const [replyData, setReplyData] = useState<{
    id: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (replyData) {
      replyQuestion({ questionId: replyData.id, message: replyData.message });
      setReplyData(null);
    }
  }, [replyData, replyQuestion]);

  useEffect(() => {
    if (deleteQuestionId) {
      deleteQuestion({ id: deleteQuestionId });
      setDeteleteQuestionId("");
    }
  }, [deleteQuestionId, deleteQuestion]);

  return (
    <>
      <Table>
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            {[
              "ID",
              "Product Image",
              "Product Title",
              "Question",
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
          {questionData?.map((question, inx) => (
            <TableRow key={question.id}>
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
                onClick={() => handleImage(question.products.mainImage)}
              >
                <img
                  src={`${DOMAIN}/${question.products.mainImage}`}
                  alt={question.products.title}
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 max-w-[200px] truncate line-clamp-1",
                  theme.text
                )}
              >
                {question.products.title}
              </TableCell>
              <TableCell
                className={classNames(
                  "text-sm px-6 py-1 cursor-pointer",
                  theme.text
                )}
                onClick={() => handleQuestion(question)}
              >
                {question.body}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1", theme.text)}
              >
                {formatDate(question.createdAt || new Date().toISOString())}
              </TableCell>
              <TableCell
                className={classNames("text-sm px-6 py-1 text-end", theme.text)}
              >
                <UpDeleteAndReply
                  item={question}
                  setMarkId={setDeteleteQuestionId}
                  setReplyData={setReplyData}
                  title="Reply to question"
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
                  {question?.user.name
                    ? question?.user.name
                    : question?.user.email}
                </p>
                <p className="text-gray-700 text-sm">{question?.body}</p>
                <p className="text-gray-500 text-xs text-left">
                  {formatDate(question?.createdAt || new Date().toISOString())}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-blue-500 font-semibold text-right my-2 ">
                  Admin
                </p>
                {question?.reply.map((reply) => (
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

export default memo(QuestionTable);
