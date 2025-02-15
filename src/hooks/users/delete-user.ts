import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteUser = async (id: string): Promise<void> => {
  await request.delete(`/admin/delete/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteUser(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
