import classNames from "classnames";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCurrentColor } from "@/hooks";
import { Button } from "../ui/button";
import { FilterResponse } from "@/types";

interface Props {
  filterData: FilterResponse[];
  handleOpen: (element?: FilterResponse) => void;
}

export const FilterTable = ({ filterData, handleOpen }: Props) => {
  const theme = useCurrentColor();

  const handleDelete = (id: string) => {
    console.log("Deleting filter ID:", id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2">Name</TableHead>
          <TableHead className="px-4 py-2">Type</TableHead>
          <TableHead className="px-4 py-2 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterData?.map((item, index) => (
          <TableRow key={item.id || index}>
            <TableCell className="flex gap-1 ">
              {item.data.map((filterItem, idx) => (
                <div key={`${item.id}-data-${idx}`} className="flex gap-1 ">
                 <span className="text-header font-bold"> {idx + 1}.{" "}</span>
                  <p className={theme.text}>{filterItem.name}</p>
                </div>
              ))}
            </TableCell>

            <TableCell>
              {item.data.map((filterItem, idx) => (
                <div key={`${item.id}-data-${idx}`} className="mb-2">
                  <span className={theme.text}>{filterItem.type}</span>
                </div>
              ))}
            </TableCell>

            {/* 🔹 Actions (Edit, Delete) */}
            <TableCell className="px-4 py-2 text-right flex items-start justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal
                      className={classNames("w-4 h-4", theme.text)}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={theme.bg}>
                  <DropdownMenuItem>
                    <button
                      onClick={() => handleOpen(item)}
                      className="flex items-center justify-center"
                    >
                      <Edit className="mr-2 w-4 h-4 text-blue-600" />
                      <span className={`min-w-[47px] ${theme.text}`}>Edit</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={`flex items-center justify-center ${theme.text}`}
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
    </Table>
  );
};

export default FilterTable;
