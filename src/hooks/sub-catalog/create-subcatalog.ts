import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_SUBCATALOG } from "@/constants";
import { Catalog, CatalogRequest } from "@/types";

const createSubCatalog = async (data: CatalogRequest): Promise<Catalog> => {
  const res = await request.post<Catalog>(CREATE_SUBCATALOG, data);
  return res.data;
};

export const useCreateSubCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<Catalog, AxiosError, CatalogRequest>({
    mutationFn: createSubCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcatalog"] });
    },
  });
};
