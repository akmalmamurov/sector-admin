import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import request from "@/services";

const deleteSubCatalog = async (id: string): Promise<void> => {
  await request.delete(`/catalog/subcatalog/delete/${id}`);
};

export const useDeleteSubCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteSubCatalog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcatalog"] });
      toast.success("Catalog deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
