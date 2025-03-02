import classNames from "classnames";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useConfirmModal, useCurrentColor, useDeleteBanner } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DOMAIN } from "@/constants";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Edit, MoreHorizontal, Trash2Icon, X } from "lucide-react";
import { BannerData } from "@/types";
import { ConfirmModal } from "../modal";
import { Button } from "../ui/button";
export interface Props {
  handleOpen: (item: BannerData) => void;
  bannerData: BannerData[];
}
export const BannerTable = ({ handleOpen, bannerData }: Props) => {
  const { mutate: deletebanner } = useDeleteBanner();
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useCurrentColor();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this user?", () => {
      deletebanner({ id });
    });
  };
  const handleImage = (path: string | null) => {
    setImage(path);
    setIsOpen(true);
  };
  return (
    <Table>
      <TableHeader className={`${theme.header}`}>
        <TableRow>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Route Path
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Image
          </TableHead>
          <TableHead
            className={classNames(
              "font-bold text-sm uppercase px-5",
              theme.text
            )}
          >
            Redirect Url
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
        {bannerData?.map((item) => (
          <TableRow key={item?.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item?.routePath}
            </TableCell>
            <TableCell
              className={classNames(
                "text-sm px-6 py-1 cursor-pointer",
                theme.text
              )}
              onClick={() => handleImage(item?.imagePath)}
            >
              <img
                src={`${DOMAIN}/${item?.imagePath}`}
                alt={"bannerImage"}
                className="w-24 h-14"
              />
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item?.routePath}
            </TableCell>
            <TableCell
              className={classNames("text-sm px-6 py-1 text-end", theme.text)}
            >
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
                      className={classNames(
                        "w-full flex justify-center items-center",
                        theme.text
                      )}
                    >
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
              alt="bannerImage"
              className="w-[300px] h-[240px]"
            />
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default BannerTable;
