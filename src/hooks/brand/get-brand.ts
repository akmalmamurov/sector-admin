import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { BrandResponse } from "@/types";

interface Params {
  popular?: boolean;
  limit?: number;
  page?: number;
  title?: string;
}

export const useGetBrand = (params: Params) => {
  return useQuery<BrandResponse, Error>({
    queryKey: ["brand", params],
    queryFn: async () => {
      const res = await request.get<BrandResponse>(`/brand/all`, {
        params
      });
      return res.data;
    },
    enabled: !!params.popular || !!params.limit || !!params.page || !!params.title,
  });
};
