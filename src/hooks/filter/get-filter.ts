import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { FilterResponse } from "@/types";
import { AxiosError } from "axios";

const fetchFilters = async (filterId: string | null): Promise<FilterResponse[]> => {
  if (!filterId) return [];

  try {
    const res = await request.get<FilterResponse[]>(`/catalog-filter/by/${filterId}`);
    return res.data ?? [];
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return [];
    }
    throw error; 
  }
};

export const useGetFilter = (filterId: string | null) => {
  return useQuery({
    queryKey: ["filter", filterId],
    queryFn: () => fetchFilters(filterId),
    enabled: !!filterId, 
    staleTime: 0,
  });
};
