import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteFilter = async ({ id, name }: { id: string; name: string }): Promise<void> => {
  await request.delete(`/catalog-filter/delete/${id}`, {
    data: { name, deleteFilter: false },
  });
};

export const useDeleteFilterItem = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string; name: string }>({
    mutationFn: ({ id, name }) => deleteFilter({ id, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter"] });
      toast.success("Filter deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
