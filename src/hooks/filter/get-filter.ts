import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { FilterResponse } from "@/types";

export const useGetFilter = (filterId: string | null) => {
  return useQuery<FilterResponse[], Error>({
    queryKey: ["filter", filterId],
    queryFn: async () => {
      if (!filterId) return [];

      const res = await request.get<{ data: FilterResponse[] }>(
        `/catalog-filter/by/${filterId}`
      );

      return res.data ?? [];
    },
    enabled: !!filterId,
  });
};
