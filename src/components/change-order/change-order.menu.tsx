import  { memo } from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Edit, Trash2Icon, ArrowUpDown } from 'lucide-react';
import { Catalog, SubCatalog } from '@/types';
import classNames from 'classnames';
import { useCurrentColor } from '@/hooks';
import { SelectValue } from '../ui/select';
import { SelectTrigger } from '../ui/select';
import { SelectContent } from '../ui/select';
import { Select } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { X } from 'lucide-react';
import { orderSelect } from './change-order';

interface ChangeOrderMenuProps {
  handleOpen: (value: Catalog | SubCatalog) => void;
  handleDeleteClick: (id: string) => void;
  setOrderData: (orderData: { id: string; index: number }) => void;
  setIsOpen: (isOpen: boolean) => void;
  value: Catalog | SubCatalog;
}

const ChangeOrderMenu = ({ handleOpen, handleDeleteClick, setOrderData, setIsOpen, value }: ChangeOrderMenuProps) => {

  const theme = useCurrentColor();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <MoreHorizontal className={classNames("w-4 h-4 text-header")} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={classNames(theme.bg)}>
          <DropdownMenuItem>
            <button
              onClick={() => handleOpen(value)}
              className="w-full flex justify-center items-center"
            >
              <Edit className="mr-2 w-4 h-4 text-blue-600" />
              <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => handleDeleteClick(value.id)}
              className={classNames(
                "w-full flex justify-center items-center",
                theme.text
              )}
            >
              <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
              Delete
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                setOrderData({ id: value.id, index: 0 });
                setIsOpen(true);
              }}
              className={classNames(
                "w-full flex justify-center items-center",
                theme.text
              )}
            >
              <ArrowUpDown className="mr-2 w-4 h-4 text-blue-600" />
              Change order
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default memo(ChangeOrderMenu);



interface ChangeOrderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setOrderData: (orderData: { id: string; index: number }) => void;
  orderData: { id: string; index: number };
  length: number;
  handleChangeOrder: (id: string, index: number) => void;
  name: string;
}

export const ChangeOrderDialog = memo(({ isOpen, setIsOpen, setOrderData, orderData, length, handleChangeOrder, name }: ChangeOrderDialogProps  ) => {

  const theme = useCurrentColor();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={classNames(
          "bg-white dark:bg-background rounded-2xl shadow-xl p-6 max-w-md w-full"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center text-header">
            {`Change ${name} order`}
          </DialogTitle>
          <button
            onClick={() => {
              setOrderData({ id: "", index: 0 });
              setIsOpen(false);
            }}
          >
            <X
              className={classNames(
                theme.text,
                "w-5 h-5 absolute top-4 right-4 hover:text-red-500 transition-colors"
              )}
            />
          </button>
        </DialogHeader>

        <DialogDescription className="text-sm text-muted-foreground text-center mb-4">
          {`Select a new order index for the ${name}`}
        </DialogDescription>

        <div className="flex flex-col gap-4 items-center justify-center">
          <Select
            onValueChange={(value) => {
              setOrderData({
                id: orderData.id,
                index: Number(value),
              });
            }}
          >
            <SelectTrigger className=" border-header rounded-lg px-4 py-2 text-sm font-medium min-w-[220px] ">
              <SelectValue className={`text-header`} placeholder={`Select ${name} order index`} />
            </SelectTrigger>
            <SelectContent>{orderSelect(length)}</SelectContent>
          </Select>

          <Button
            onClick={() => handleChangeOrder(orderData.id, orderData.index)}
            className="w-full mt-2"
          >
            Confirm Change
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
