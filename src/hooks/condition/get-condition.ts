import request from "@/services";
import { ConditionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchCondition = async (): Promise<ConditionResponse> => {
  const res = await request("product-detail/condition/all");
  return res.data;
};

export const useGetCondition = () => {
  return useQuery<ConditionResponse, Error>({
    queryKey: ["condition"],
    queryFn: fetchCondition,
  });
};
