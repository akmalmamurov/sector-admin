import { useEffect, useState } from "react";
import { CreateButton } from "../create-button";
import { LoadingData } from "../loading";
import { TableTitle } from "../title";
import { Section } from "../section";
import { PopularProduct } from "@/types";
import { PopularProductTable } from "../table/PopularProductTable";
import { PopularProductModal } from "../modal/PopularProductModal";
import { useGetPopularProducts } from "@/hooks/product/get-popular-products";
import { IpopularProduct } from "@/hooks/product/get-products-popular";

interface PopularProductListProps {
  popularProductData: IpopularProduct[];
  isLoading: boolean;
  error: Error;
}

export const PopularProductList = ({popularProductData, isLoading, error}: PopularProductListProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { data: productData , refetch } = useGetPopularProducts({popular: false});

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Popular Product Table</TableTitle>
        <CreateButton onClick={() => setIsOpen(true)}>
          Create Popular Product
        </CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {popularProductData?.length > 0 || !popularProductData ? (
            <PopularProductTable productData={popularProductData} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Product found </p>
              <CreateButton onClick={() => setIsOpen(true)} className="mt-3">
                Create Popular Product
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <PopularProductModal
        popularProductData={productData as PopularProduct[]}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
    </Section>
  );
};

export default PopularProductList;
