import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, RequestData, RequestResponse } from "@/types";

interface IRequestParams {
  topicCategory?: string;
}

const getRequests = async (params?: IRequestParams): Promise<RequestData[]> => {
  const res = await request.get<RequestResponse>("/request/all", { params });
  return res.data.data.requests;
};

export const useGetRequests = (params?: IRequestParams) => {
  return useQuery<RequestData[], AxiosError<ErrorResponse>>({
    queryKey: ["requests", params],
    queryFn: () => getRequests(params),
  });
};
