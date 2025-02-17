import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Condition, ConditionResponse } from "@/types";

const fetchData = async (): Promise<Condition[]> => {
  const res = await request.get<ConditionResponse>(
    "/product-detail/condition/all"
  );
  return res.data.data;
};

export const useGetCondition = () => {
  return useQuery<Condition[], Error>({
    queryKey: ["condition"],
    queryFn: fetchData,
  });
};
