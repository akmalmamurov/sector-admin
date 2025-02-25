import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { GET_POPULAR_CATEGORY } from "../../constants";
import { IPopularCategory } from "../../types";

const fetchData = async (isPopular?: boolean): Promise<IPopularCategory[]> => {
  const res = await request.get<{ data: IPopularCategory[] }>(
    isPopular !== undefined
      ? `${GET_POPULAR_CATEGORY}/?isPopular=${isPopular}`
      : GET_POPULAR_CATEGORY
  );
  return res.data.data;
};

export const useGetPopularCategory = (isPopular?: boolean) => {
  return useQuery<IPopularCategory[], Error>({
    queryKey: ["popular_category", isPopular],
    queryFn: () => fetchData(isPopular),
  });
};



