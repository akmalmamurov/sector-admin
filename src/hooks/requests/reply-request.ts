import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, RequestData } from "@/types";
import { toast } from "react-toastify";

interface ReplyRequestParams {
  id: string;
  message: string;
  status?: string;
  file?: File | null;
}

const replyRequest = async ({ id, message, status, file }: ReplyRequestParams): Promise<RequestData> => {
  const formData = new FormData();
  console.log(id);
  

  formData.append("message", message);
  if (status) formData.append("status", status);
  if (file) formData.append("imageRequest", file);

  const response = await request.patch<{ data: RequestData }>(`/request/reply/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const useReplyRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<RequestData, AxiosError<ErrorResponse>, ReplyRequestParams>({
    mutationFn: replyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      toast.success("Request muvaffaqiyatli yangilandi! 🎉");
    },
    onError: (error) => {
      toast.error(`Xatolik: ${error.message}`);
    },
  });
};
