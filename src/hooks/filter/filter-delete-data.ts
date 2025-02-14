import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import request from "@/services";

const deleteFilter = async ({ id }: { id: string }): Promise<void> => {
  await request.delete(`/catalog-filter/delete/${id}`, {
    data: { deleteFilter: true },
  });
};

export const useDeleteFilterFull = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteFilter({ id }),
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
