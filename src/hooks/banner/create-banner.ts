import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { BannerData } from "@/types";
import { toast } from "react-toastify";

const createBanner = async (data: FormData): Promise<BannerData> => {
  const res = await request.post<BannerData>("/banner/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation<BannerData, AxiosError, FormData>({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
