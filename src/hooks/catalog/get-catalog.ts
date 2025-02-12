import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Catalog, CatalogResponse } from "@/types";

export const useGetCatalog = () => {
  return useQuery<Catalog[], Error>({
    queryKey: ["catalog"],
    queryFn: async () => {
      const res = await request.get<CatalogResponse>(
        "/catalog/with-subcatalogs"
      );
      return res.data.data;
    },
  });
};
