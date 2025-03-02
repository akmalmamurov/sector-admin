import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { BannerData } from "@/types";

const fetchData = async (): Promise<BannerData[]> => {
  const res = await request.get<{ data: BannerData[] }>("banner/all");
  return res.data.data;
};

export const useGetBanner = () => {
  return useQuery<BannerData[], Error>({
    queryKey: ["banner"],
    queryFn: fetchData,
  });
};
