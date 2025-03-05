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
import { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import UpDelete from "../menu/UpDelete";
interface Props {
  commentData: IComment[];
}

export const CommentTable = ({ commentData }: Props) => {
  const theme = useCurrentColor();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);    
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <Table>
      <TableHeader className={`${theme.header} `}>
        <TableRow>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            ID
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Product Image
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Product title
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Star
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Comment
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Created At
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5 text-right",
              theme.text
            )}
          >
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commentData?.map((comment: IComment) => (
          <TableRow key={comment?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {comment?.id}
            </TableCell>
            <TableCell
              className={classNames(
                "text-sm px-6 py-1 cursor-pointer",
                theme.text
              )}
              onClick={() => handleImage(comment?.products?.mainImage)}
            >
              <img
                src={`${DOMAIN}/${comment?.products?.mainImage}`}
                alt={comment?.products?.title}
                className="w-10 h-10"
              />
            </TableCell>
            <TableCell
              className={classNames(
                "text-sm px-6 py-1 max-w-[200px] truncate line-clamp-1",
                theme.text
              )}
            >
              {comment?.products?.title}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {comment?.star}
            </TableCell>

            <TableCell
              className={classNames(
                "text-sm px-6 py-1 cursor-pointer hover:text-header",
                theme.text
              )}
            >
              {comment?.commentBody}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {comment?.createdAt}
            </TableCell>

            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
              <UpDelete
                item={comment as IComment}
                handleOpen={() => setIsOpen(true)}
                handleDelete={handleDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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
          <DialogDescription className="hidden"></DialogDescription>
          <div className="w-full h-full px-14 rounded-md overflow-hidden flex justify-center items-center">
            <img
              src={`${DOMAIN}/${image}`}
              alt="commentImage"
              className="w-[300px] h-[240px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Table>
  );
};

export default memo(CommentTable);
