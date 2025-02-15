import request from "@/services";
import { UsersProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (): Promise<UsersProps> => {
  const res = await request("/admin/all");
  return res.data;
};

export const useGetUsers = () => {
  return useQuery<UsersProps, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
