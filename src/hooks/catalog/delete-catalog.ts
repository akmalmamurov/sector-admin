import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteCatalog = async (id: string): Promise<void> => {
  await request.delete(`catalog/delete/${id}`);
};

export const useDeleteCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteCatalog(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Catalog deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
