import { FC, useEffect, useState } from "react";
import { RequestData } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formatDate } from "@/utils/formatedDate";
import { Paperclip, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { useReplyRequest } from "@/hooks/requests/reply-request";
import classNames from "classnames";
import { useCurrentColor } from "@/hooks";
import { DOMAIN } from "@/constants";

interface IProps {
  requestData: RequestData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReplyRequestModal: FC<IProps> = ({ requestData, open, setOpen }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | undefined>(undefined); // Status uchun yangi state
  const [updateInput, setUpdateInput] = useState<boolean>(false);

  const { mutate: replyRequest, isPending } = useReplyRequest();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      replyRequest( { id: requestData.id, message: description, file, status },{
          onSuccess: () => {
            setDescription("");
            setFile(null);
            setStatus(undefined);
            setUpdateInput(true);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (!open) {
      setDescription("");
      setFile(null);
      setStatus(undefined);
      setUpdateInput(false);
    }
  }, [open, updateInput]);

  const theme = useCurrentColor();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl bg-white p-6 rounded-xl shadow-lg min-h-[60vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex justify-between items-center">
            Заявка #{requestData.requestNumber} {requestData.topic}
            <button onClick={() => setOpen(false)}>
              <X
                className={classNames(
                  theme.text,
                  "w-6 h-6 hover:text-red-500 transition-colors"
                )}
              />
            </button>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Последний ответ:{" "}
            {requestData?.messages?.length
              ? formatDate(
                  requestData.messages[requestData.messages.length - 1].createdAt
                )
              : "Ответов пока нет"}
          </DialogDescription>
        </DialogHeader>

        {/* Chat oynasi */}
        <div className="space-y-4 max-h-[40vh] overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
          {requestData?.messages?.length ? (
            requestData.messages.map((message, index) => (
              <div
                key={index}
                className={classNames(
                  "p-4 rounded-lg max-w-[80%]",
                  message.adminId
                    ? "bg-blue-100 border-l-4 border-blue-500 ml-auto"
                    : "bg-gray-100 border-l-4 border-gray-400 mr-auto"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-700">
                    {message.adminId ? "Администратор" : requestData.fullName}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatDate(message.createdAt, "")}
                  </span>
                </div>
                <p className="text-gray-800 text-sm">{message.message}</p>
                {message.filePath && (
                  <a
                    href={`${DOMAIN}/${message.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                  >
                    📎 Прикрепленный файл
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Сообщений пока нет</p>
          )}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="description"
            >
              Ответ *
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Введите ваш ответ..."
              rows={5}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Status tanlash */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="status"
            >
              Статус (необязательно)
            </label>
            <select
              id="status"
              value={status || ""}
              onChange={(e) => setStatus(e.target.value || undefined)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите статус</option>
              <option value="new">Открыт</option>
              <option value="closed">Закрыт</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="file"
            >
              Прикрепите файл
            </label>
            <div className="flex items-center gap-3">
              <Input
                id="file"
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="w-full cursor-pointer border-gray-300 rounded-lg"
              />
              <Paperclip className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Допустимые форматы: PNG, JPG, JPEG
            </p>
            {file && (
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                {file.name}
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg"
                onClick={() => {
                  setDescription("");
                  setFile(null);
                  setStatus(undefined);
                  setOpen(false);
                }}
              >
                Закрыть
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
              disabled={!description.trim() || isPending}
            >
              {isPending ? "Отправка..." : "Ответить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyRequestModal;