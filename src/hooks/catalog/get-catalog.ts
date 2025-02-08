import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Catalog, PageInterface } from "@/types";



export const useGetCatalog = () => {
  return useQuery<Catalog[], Error>({
    queryKey: ["catalog"],
    queryFn: async () => {
      const res = await request.get<PageInterface<Catalog[]>>(
        "/catalog/with-subcatalogs"
      );
      return res.data.data;
    },
  });
};
