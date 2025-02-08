import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { SubCatalog, SubCatalogRequest } from "@/types";
import { UPDATE_SUBCATALOG } from "@/constants";

const updateSubCatalog = async ({
  id,
  data,
}: {
  id: string;
  data: SubCatalogRequest;
}): Promise<SubCatalog> => {
  const res = await request.put<SubCatalog>(`${UPDATE_SUBCATALOG}/${id}`, data);
  return res.data;
};

export const useUpdateSubCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SubCatalog,
    AxiosError,
    { id: string; data: SubCatalogRequest }
  >({
    mutationFn: updateSubCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcatalog"] });
    },
  });
};
