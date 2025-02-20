import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import {  ProductData, ProductResponse } from "@/types";

const fetchData = async (): Promise<ProductData[]> => {
  const res = await request.get<ProductResponse>("/product");
  return res.data.data;
};

export const useGetProduct = () => {
  return useQuery<ProductData[], Error>({
    queryKey: ["product"],
    queryFn: fetchData,
  });
};
