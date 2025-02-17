import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Relevance, RelevanceResponse } from "@/types";

const fetchData = async (): Promise<Relevance[]> => {
  const res = await request.get<RelevanceResponse>(
    "/product-detail/relavance/all"
  );
  return res.data.data;
};

export const useGetRelevance = () => {
  return useQuery<Relevance[], Error>({
    queryKey: ["relevance"],
    queryFn: fetchData,
  });
};
