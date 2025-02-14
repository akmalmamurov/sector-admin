import { useState } from "react";
import { X, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { FilterResponse } from "@/types";
import { useCurrentColor, useDeleteFilterItem } from "@/hooks";
import classNames from "classnames";

interface DeleteFilterModalProps {
  isOpen: boolean;
  handleClose: () => void;
  filterData: FilterResponse[];
}

const DeleteFilterModal = ({ isOpen, handleClose, filterData }: DeleteFilterModalProps) => {
  const theme = useCurrentColor();
  const [selectedItem, setSelectedItem] = useState<{ name: string; id: string } | null>(null);
const {mutate: deleteItem} = useDeleteFilterItem();
  const handleDeleteClick = (name: string, id: string) => {
    setSelectedItem({ name, id });
  };

  const confirmDelete = () => {
    if (selectedItem) {
        deleteItem(
        { id: selectedItem.id, name: selectedItem.name },
        {
          onSuccess: () => {
            setSelectedItem(null);
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${theme.bg} max-w-4xl h-[500px] overflow-y-auto flex flex-col px-5 pt-6`}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>Delete Filters</DialogTitle>
          <button onClick={handleClose}>
            <X className={classNames(theme.text, "w-6 h-6 absolute top-4 right-4")} />
          </button>
        </DialogHeader>

        <p className="text-gray-600">Select a filter element to delete.</p>

        {/* 📌 Filter Items Table */}
        <div className="mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData.flatMap((filter) =>
                filter.data.map((item, index) => (
                  <tr key={`${filter.id}-${index}`} className="border">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.type}</td>
                    <td className="border p-2 text-center">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteClick(item.name, filter.id)}
                      >
                        <Trash2Icon className="mr-2 w-4 h-4" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>

      {selectedItem && (
        <Dialog open={true} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-md text-center">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">Are you sure you want to delete <strong>{selectedItem.name}</strong>?</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="secondary" onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash2Icon className="mr-2 w-4 h-4" />
                Confirm Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default DeleteFilterModal;
