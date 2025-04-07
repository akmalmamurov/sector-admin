import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { ProductData } from "@/types";

export interface IProductCatalogResponse {
  data: ProductData[],
  error: null;
  status: number;
}

interface ProductFilterParams {
  subcatalogId?: string;
  catalogId?: string;
}

const fetchData = async (
  params: ProductFilterParams
): Promise<IProductCatalogResponse> => {
  const res = await request.get<IProductCatalogResponse>("/product/by-catalog-id", {
    params,
  });
  return res.data;
};

export const useGetProductByCatalogId = (params: ProductFilterParams) => {
  return useQuery<IProductCatalogResponse, Error>({
    queryKey: ["product-by-catalog-id", params],
    queryFn: () => fetchData(params),
  });
};
