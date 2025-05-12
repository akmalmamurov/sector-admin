import { FC, useState } from "react";
import { RequestData } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formatDate } from "@/utils/formatedDate";
import { Paperclip } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { useReplyRequest } from "@/hooks/requests/reply-request";

interface IProps {
  requestData: RequestData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReplyRequestModal: FC<IProps> = ({ requestData, open, setOpen }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { mutate: replyRequest } = useReplyRequest()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      replyRequest({
        id: requestData.id,
        message: description,
        file: file,
      });
      setDescription("");
      setFile(null);
    //   setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            Заявка #{requestData.requestNumber} {requestData.topic}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Последний ответ: {requestData?.messages?.length ? formatDate(requestData.messages[requestData.messages.length - 1].createdAt) : ''}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-md">
          {requestData?.messages?.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${
                message.adminId ? "bg-blue-50 border-l-4 border-blue-500" : "bg-gray-100 border-l-4 border-gray-400"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">
                  {message.adminId ? "Администратор" : requestData.fullName}
                </p>
                <span className="text-xs text-gray-500">{formatDate(message.createdAt, "dd.MM.yyyy HH:mm")}</span>
              </div>
              <p className="text-gray-800 text-sm">{message.message}</p>
              {/* {message.filePath && (
                <a
                  href={`/${message.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                >
                  📎 Прикрепленный файл
                </a>
              )} */}
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
              Описание *
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Введите ответ..."
              rows={4}
              className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="file">
              Прикрепите файл
            </label>
            <div className="flex items-center gap-3">
              <Input
                id="file"
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="w-full cursor-pointer border-gray-300 rounded-md"
              />
              <Paperclip className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Допустимые форматы: PNG, JPG, JPEG</p>
            {file && <p className="text-sm text-gray-600 mt-1">{file.name}</p>}
          </div>

          <DialogFooter className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
                onClick={() => {
                  setDescription("");
                  setFile(null);
                  setOpen(false);
                }}
              >
                Закрыть заявку
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
              disabled={!description.trim()}
            >
              Ответить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyRequestModal;
