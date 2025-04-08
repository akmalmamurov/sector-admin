import { useQuery } from "@tanstack/react-query";
import request from "@/services";

export interface IpopularProduct {
    id: string;
    updatedAt: string;
    product: {
        id: string;
        title: string;
        slug: string;
        articul: string;
        inStock: boolean;
        price: number;
        mainImage: string;
        recommended: boolean;
        productCode: string;
    };
}

const fetchData = async (): Promise<IpopularProduct[]> => {
    const res = await request.get<{ data: IpopularProduct[] }>("/product/popular/all");
    return res.data.data;
};

export const useGetProductsPopular = () => {
    return useQuery<IpopularProduct[], Error>({
        queryKey: ["popularProduct"],
        queryFn: fetchData,
    });
};
