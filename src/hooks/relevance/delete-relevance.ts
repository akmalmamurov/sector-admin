import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteRelevance = async (id: string): Promise<void> => {
  await request.delete(`/product-detail/relavance/delete/${id}`);
};

export const useDeleteRelevance = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteRelevance(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relevance"] });
      toast.success("Deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
