import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, RequestData } from "@/types";

const getRequestById = async (id: string): Promise<RequestData> => {
  const res = await request.get<{ data: RequestData}>(`/request/${id}`);
  return res.data?.data;
};

export const usegetRequestById = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<RequestData, AxiosError<ErrorResponse>>({
    queryKey: ["requests", id],
    queryFn: () => getRequestById(id),
    enabled: options?.enabled ?? true,
  });
};
