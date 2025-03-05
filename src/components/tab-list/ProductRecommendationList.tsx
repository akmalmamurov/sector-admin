import { useEffect, useState } from "react";
import { CreateButton } from "../create-button";
import { LoadingData } from "../loading";
import { TableTitle } from "../title";
import { Section } from "../section";
import { ProductData } from "@/types";
import { ProductRecommendationModal } from "../modal/ProductReccomendation";
import { useGetPopularProducts } from "@/hooks/product/get-popular-products";
import { ProductRecommendationTable } from "../table/ProductRecommendationTable";
interface ProductRecommendationListProps {
  productRecommendationData: ProductData[];
  isLoading: boolean;
  error: Error;
}

export const ProductRecommendationList = ({
  productRecommendationData,
  isLoading,
  error,
}: ProductRecommendationListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: productData , refetch } = useGetPopularProducts({recommended: false});
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Product Recommendation Table</TableTitle>
        <CreateButton onClick={() => setIsOpen(true)}>
          Create Product Recommendation
        </CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {productRecommendationData?.length > 0 || !productRecommendationData ? (
                <ProductRecommendationTable  productData={productRecommendationData as ProductData[] } />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Product found </p>
              <CreateButton onClick={() => setIsOpen(true)} className="mt-3">
                    Create Product Recommendation
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <ProductRecommendationModal 
        productRecommendationData={productData as ProductData[]}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
    </Section>
  );
};

export default ProductRecommendationList;
