import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { GaranteeData } from "@/types";

const fetchData = async (): Promise<GaranteeData[]> => {
    const res = await request.get<{ data: GaranteeData[] }>("garantee/all");
    return res.data.data;
};

export const useGetGarantee = () => {
    return useQuery<GaranteeData[], Error>({
        queryKey: ["garantee"],
        queryFn: fetchData,
    });
};
