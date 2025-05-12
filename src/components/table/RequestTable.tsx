import classNames from "classnames";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useConfirmModal, useCurrentColor } from "@/hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal, Reply, Trash2Icon } from "lucide-react";
import { RequestData } from "@/types";
import { ConfirmModal } from "../modal";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/formatedDate";
import { useState } from "react";
import { usegetRequestById } from "@/hooks/requests/get-by-id";
import { useDeleteRequest } from "@/hooks/requests/delete-request";
import ReplyRequestModal from "../modal/ReplyRequestModal";

export interface Props {
  requestData: RequestData[];
}

export const RequestTable = ({ requestData }: Props) => {
//   console.log("RequestTable requestData:", requestData);

  const { mutate: deleteRequest } = useDeleteRequest();
  const theme = useCurrentColor();
  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = usegetRequestById(selectedId ?? "", {
    enabled: !!selectedId,
  });

  const handleOpen = (id?: string) => {
    setSelectedId(id ?? null);
    setIsOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this request?", () => {
      deleteRequest(id);
    });
  };

  return (
    <Table >
      <TableHeader className={`${theme.header}`}>
        <TableRow>
          {["Id", "RequestNumber", "Topic", "TopicCategory", "FullName", "Email", "OrderNumber", "Status", "CreatedAt", "Action"].map((title) => (
            <TableHead
              key={title}
              className={classNames(`font-bold text-sm uppercase px-5 ${title === "Action" ? "text-end" : ""}`, theme.text)}
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {requestData.length > 0 ? (
          requestData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
                {index + 1}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.requestNumber}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.topic}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.topicCategory}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.fullName}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.email}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.orderNumber || "N/A"}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {item.status}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
                {formatDate(item.createdAt)}
              </TableCell>
              <TableCell className={classNames("text-sm px-5 py-1 text-end", theme.text)}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className={classNames("w-4 h-4 text-header")} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={classNames(theme.bg)}>
                    {/* <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(item.id)}
                        className="w-full flex justify-center items-center"
                      >
                        <Edit className="mr-2 w-4 h-4 text-blue-600" />
                        <span className={`min-w-[47px] ${theme.text}`}>Edit status</span>
                      </button>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className={classNames("w-full flex justify-center gap-1 items-center", theme.text)}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                        Delete
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(item.id)}
                        className={classNames("w-full flex justify-center gap-1 items-center", theme.text)}
                      >
                        <Reply className="mr-2 w-4 h-4 text-green-600" />
                        Reply
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="text-center">
              No requests found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <ReplyRequestModal open={isOpen} setOpen={() => setIsOpen(!isOpen)} requestData={data as RequestData || []}/>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default RequestTable;