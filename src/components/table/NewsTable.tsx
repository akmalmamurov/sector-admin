import classNames from "classnames";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useConfirmModal, useCurrentColor } from "@/hooks";
import { DropdownMenu,  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { NewsData } from "@/types";
import { ConfirmModal } from "../modal";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/formatedDate";
import { useDeleteNews } from "@/hooks/news/delete-news";

export interface Props {
  handleOpen: (item: NewsData) => void;
  newsData: NewsData[];
}
export const NewsTable = ({ handleOpen, newsData }: Props) => {
  const { mutate: deletePromotion } = useDeleteNews();
  const theme = useCurrentColor();
  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this promotion?", () => {
      deletePromotion({ id });
    });
  };

  return (
    <Table>
      <TableHeader className={`${theme.header}`}>
        <TableRow>
          <TableHead className={classNames("font-bold text-sm uppercase px-5", theme.text)}>
            Id
          </TableHead>
          <TableHead className={classNames("font-bold text-sm uppercase px-5", theme.text )}  >
            Title
          </TableHead>
          <TableHead className={classNames( "font-bold text-sm uppercase px-5",theme.text )} >
            Description
          </TableHead>
          <TableHead className={classNames("font-bold text-sm uppercase px-5",theme.text  )} >
            Created at
          </TableHead>
          <TableHead className={classNames( "font-bold text-sm uppercase px-5 text-right", theme.text )}>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {newsData?.map((item, index) => (
          <TableRow key={item?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {index + 1}
            </TableCell>
            <TableCell
            title={item.title}
              className={classNames(
                "text-sm px-5 py-1 truncate max-w-[200px]",
                theme.text
              )}
            >
              {item.title}
            </TableCell>
            <TableCell title={item.description} className={classNames("text-sm px-5 py-1 truncate max-w-[250px]", theme.text)}>
              {item?.description}
            </TableCell>
            <TableCell className={classNames("text-sm px-5 py-1", theme.text)}>
              {formatDate(item?.createdAt, 'true')}
            </TableCell>
          
            <TableCell
              className={classNames("text-sm px-5 py-1 text-end", theme.text)} >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal
                      className={classNames("w-4 h-4 text-header")}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={classNames(theme.bg)}
                >
                  <DropdownMenuItem>
                    <button
                      onClick={() => handleOpen(item)}
                      className="w-full flex justify-center items-center"
                    >
                      <Edit className="mr-2 w-4 h-4 text-blue-600" />
                      <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className={classNames("w-full flex justify-center items-center", theme.text )}>
                      <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                      Delete
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
   
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default NewsTable;
