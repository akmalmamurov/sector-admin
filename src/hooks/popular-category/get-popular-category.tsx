import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { GET_POPULAR_CATEGORY } from "../../constants";
import { IPopularCategory } from "../../types";

const fetchData = async (popular?: boolean): Promise<IPopularCategory[]> => {
  const res = await request.get<{ data: IPopularCategory[] }>(
    popular !== undefined
      ? `${GET_POPULAR_CATEGORY}/?popular=${popular}`
      : GET_POPULAR_CATEGORY
  );
  return res.data.data;
};

export const useGetPopularCategory = (popular?: boolean) => {
  return useQuery<IPopularCategory[], Error>({
    queryKey: ["popularCategory", popular],
    queryFn: () => fetchData(popular),
  });
};



