import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteCondition = async (id: string): Promise<void> => {
  await request.delete(`/product-detail/condition/delete/${id}`);
};

export const useDeleteCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteCondition(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["condition"] });
      toast.success("Deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
