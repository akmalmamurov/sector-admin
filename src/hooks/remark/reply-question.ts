
import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IReplyResponse {
    questionId: string;
    message: string;
}
const replyQuestion = async (data: IReplyResponse) => {
    const res = await request.post<IReplyResponse>("/product-detail/question/reply", data);
    return res.data;
};

export const useReplyQuestion    = () => {
    const queryClient = useQueryClient();
    return useMutation<IReplyResponse, AxiosError, IReplyResponse>({
        mutationFn: replyQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["question"] });
            toast.success("Reply successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
