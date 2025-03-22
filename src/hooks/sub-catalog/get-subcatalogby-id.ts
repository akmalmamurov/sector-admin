import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { PageInterface, SubCatalog } from "@/types";

export const useSubCatalogById = (id: string) => {
    return useQuery<SubCatalog | null, Error>({
        queryKey: ["subCatalog", id],
        queryFn: async () => {
            const res = await request.get<PageInterface<SubCatalog>>(`/catalog/subcatalog/by-id/${id}`);
            console.log("Fetched subcatalog:", res.data);
            return res.data.data || null;
        },
        enabled: !!id,
    });
};
