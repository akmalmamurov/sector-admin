import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Brand,  PageInterface } from "@/types";



export const useGetBrand = () => {
  return useQuery<Brand[], Error>({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await request.get<PageInterface<Brand[]>>(
        "/brand/all"
      );
      return res.data.data;
    },
  });
};
