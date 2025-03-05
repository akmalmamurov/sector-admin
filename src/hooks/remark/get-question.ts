import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { IQuestion } from "@/types";
import { GET_QUESTION } from "@/constants";

interface IQuestionResponse {
    data: IQuestion[];
    error: string | null;
    status: number;
}

export const useGetQuestion = () => {
    return useQuery<IQuestion[], Error>({
        queryKey: ["question"],
        queryFn: async () => {
            const res = await request.get<IQuestionResponse>(
                GET_QUESTION
            );
            return res.data.data;
        },
    });
};
