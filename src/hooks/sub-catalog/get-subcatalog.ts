import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { SubCatalogResponse, SubCatalog } from "@/types";

export const useGetSubCatalogs = (catalogId: string | null) => {
  return useQuery<SubCatalog[], Error>({
    queryKey: ["subcatalog", catalogId], 
    queryFn: async () => {
      if (!catalogId) return []; 
      const res = await request.get<SubCatalogResponse>(
        `/catalog/subcatalog/with-categories/${catalogId}`
      );
      return res.data.data ?? []; 
    },
    enabled: !!catalogId, 
  });
};
