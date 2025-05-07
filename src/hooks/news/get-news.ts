import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, NewsResponse, NewsData } from "@/types";

const getNews = async (): Promise<NewsData[]> => {
    const res = await request.get<NewsResponse>("/news/get-all");
    return res.data.data;
};

export const useGetNews = () => {
    return useQuery<NewsData[], AxiosError<ErrorResponse>>({
        queryKey: ["news"],
        queryFn: getNews,
    });
};
