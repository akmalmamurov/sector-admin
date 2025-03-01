import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { CategoryResponse, Category } from "@/types";

export const useGetCategories = (
  subCatalogId: string | null, 
  popular?: boolean
) => {
  return useQuery<Category[], Error>({
    queryKey: ["category", subCatalogId, popular],
    queryFn: async () => {
      if (!subCatalogId) return [];
      
      const url = popular !== undefined 
        ? `/catalog/category/by-subcatalog/${subCatalogId}?popular=${popular}`
        : `/catalog/category/by-subcatalog/${subCatalogId}`;

      const res = await request.get<CategoryResponse>(url);
      return res.data.data ?? [];
    },
    enabled: !!subCatalogId,
  });
};
