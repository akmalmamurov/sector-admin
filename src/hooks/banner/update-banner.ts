import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { BannerData } from "@/types";
import { toast } from "react-toastify";
const updateBanner = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<BannerData> => {
  const res = await request.put<BannerData>(`/banner/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerData, AxiosError, { id: string; data: FormData }>({
    mutationFn: updateBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
