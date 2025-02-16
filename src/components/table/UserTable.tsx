import { userTableHeader } from "@/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useConfirmModal, useCurrentColor, useDeleteUser } from "@/hooks";
import classNames from "classnames";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { ConfirmModal } from "../modal";
interface Props {
  userData: User[];
  handleOpen: (element: User) => void;
}
export const UserTable = ({ userData, handleOpen }: Props) => {
  const theme = useCurrentColor();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();
  const {mutate: deleteUser} = useDeleteUser();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this user?", () => {
      deleteUser({ id });
    });
  };
  return (
    <Table>
      <TableHeader  className={`${theme.header}`}>
        <TableRow>
          {userTableHeader.map((el) => (
            <TableHead
              key={el}
              className={classNames(
                "font-bold text-sm uppercase px-5 last:text-right",
                theme.text
              )}
            >
              {el}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item.username}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item.role}
            </TableCell>
            <TableCell className={classNames("text-sm px-6 py-1", theme.text)}>
              {item.status}
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
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </Table>
  );
};

export default UserTable;
