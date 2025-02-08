import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { CategoryResponse, Category } from "@/types";

export const useGetCategories = (subCatalogId: string | null) => {
  return useQuery<Category[], Error>({
    queryKey: ["category", subCatalogId], 
    queryFn: async () => {
      if (!subCatalogId) return []; 
      const res = await request.get<CategoryResponse>(
        `/catalog/category/by-subcatalog/${subCatalogId}`
      );
      return res.data.data ?? []; 
    },
    enabled: !!subCatalogId, 
  });
};
