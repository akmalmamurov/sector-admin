import request from "@/services";
import { RelevanceResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (): Promise<RelevanceResponse> => {
  const res = await request("product-detail/relavance/all");
  return res.data;
};

export const useGetRelevance = () => {
  return useQuery<RelevanceResponse, Error>({
    queryKey: ["relevance"],
    queryFn: fetchData,
  });
};
