import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Catalog, SubCatalogRequest } from "@/types";
import { UPDATE_SUBCATALOG } from "@/constants";

const updateSubCatalog = async ({
  id,
  data,
}: {
  id: string;
  data: SubCatalogRequest;
}): Promise<Catalog> => {
  const res = await request.put<Catalog>(`${UPDATE_SUBCATALOG}/${id}`, data);
  return res.data;
};

export const useUpdateSubCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Catalog,
    AxiosError,
    { id: string; data: SubCatalogRequest }
  >({
    mutationFn: updateSubCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcatalog"] });
    },
  });
};
