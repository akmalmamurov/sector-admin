import { useQuery } from "@tanstack/react-query";
import request from "@/services";

export interface IBrandImage {
    name: string;
    type: string;
}

export interface IBrandSelectedImages {
    data: IBrandImage[];
}

export const useGetBrandSelectedImages = () => {
    return useQuery<IBrandSelectedImages, Error>({
        queryKey: ["brand-selected-images"],
        queryFn: async () => {
            const res = await request.get<IBrandSelectedImages>(
                "/brand/get-paths"
            );
            return res.data;
        },
    });
};
