import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteBanner = async (id: string): Promise<void> => {
  await request.delete(`/banner/delete/${id}`);
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteBanner(id), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete failed:", error.message);
      toast.error(`Error: ${error.message}`);
    },
  });
};
