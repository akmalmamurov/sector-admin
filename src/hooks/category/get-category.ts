import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { CategoryResponse, Category } from "@/types";

export const useGetCategories = (
  subCatalogId: string | null, 
  isPopular?: boolean
) => {
  return useQuery<Category[], Error>({
    queryKey: ["category", subCatalogId, isPopular],
    queryFn: async () => {
      if (!subCatalogId) return [];
      
      const url = isPopular !== undefined 
        ? `/catalog/category/by-subcatalog/${subCatalogId}?isPopular=${isPopular}`
        : `/catalog/category/by-subcatalog/${subCatalogId}`;

      const res = await request.get<CategoryResponse>(url);
      return res.data.data ?? [];
    },
    enabled: !!subCatalogId,
  });
};
