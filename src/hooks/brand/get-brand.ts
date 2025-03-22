import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Brand, IPopularBrand, PageInterface } from "@/types";

export const useGetBrand = (popular?: boolean) => {
  return useQuery<Brand[] | IPopularBrand[], Error>({
    queryKey: ["brand", popular],
    queryFn: async () => {
      let url = "/brand/all";

      if (popular !== undefined) {
        url += `?popular=${popular}`;
      }

      const res = await request.get<PageInterface<Brand[] | IPopularBrand[]>>(url);
      return res.data.data;
    },
  });
};
