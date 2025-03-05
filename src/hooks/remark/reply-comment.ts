
import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IReplyResponse {
    commentId: string;
    message: string;
}
const replyComment = async (data: IReplyResponse) => {
    const res = await request.post<IReplyResponse>("/product-detail/comment/reply", data);
    return res.data;
};

export const useReplyComment = () => {
    const queryClient = useQueryClient();
    return useMutation<IReplyResponse, AxiosError, IReplyResponse>({
        mutationFn: replyComment,               
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
            toast.success("Reply successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
