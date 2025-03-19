import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Brand, IPopularBrand, PageInterface } from "@/types";

export const useGetBrand = (popular?: boolean ) => {
  return useQuery<Brand[] | IPopularBrand[], Error>({
    queryKey: ["brand", popular],
    queryFn: async () => {
      const res = await request.get<PageInterface<Brand[] | IPopularBrand[]>>(
        popular ? `/brand/all?popular=${popular}` : "/brand/all"
      );
      return res.data.data;
    },
  });
};
