import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { IComment, ICommentResponse } from "@/types";
import { GET_COMMENT } from "@/constants";

export const useGetComment = () => {
    return useQuery<IComment[], Error>({
        queryKey: ["comment"],
        queryFn: async () => {
            const res = await request.get<ICommentResponse>(
                GET_COMMENT
            );
            return res.data.data;
        },
    });
};
