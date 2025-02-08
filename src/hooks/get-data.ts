import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request from "@/services";

// Umumiy GET so‘rov funksiyasi
const getData = async <TResponse>(url: string): Promise<TResponse> => {
  const response = await request.get<TResponse>(url);
  return response.data;
};

// Umumiy hook
export const useGetData = <TResponse>(
  url: string, // Faqat URL kerak
  options?: UseQueryOptions<TResponse, Error>
) => {
  return useQuery<TResponse, Error>({
    queryKey: [url], // queryKey avtomatik ravishda url bo‘ladi
    queryFn: () => getData<TResponse>(url),
    ...options, // React Query uchun qo‘shimcha opsiyalar
  });
};
