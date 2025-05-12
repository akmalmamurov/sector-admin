import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse } from "@/types";
import { toast } from "react-toastify";

const deleteRequestApi = async (id: string): Promise<void> => {
  await request.delete(`/request/${id}`);
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: deleteRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Request muvaffaqiyatli o'chirildi! 🗑️");
    },
    onError: (error) => {
      toast.error(`Xatolik: ${error.message}`);
    },
  });
};
