import { CreateButton } from "@/components/create-button";
import { ProductModal } from "@/components/modal";
import { Section } from "@/components/section";
import { ProductTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetProduct } from "@/hooks";
import { useState } from "react";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const {data: productData = []}  = useGetProduct();
  
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Product Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create Product</CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {productData?.length > 0 ? (
          <ProductTable productData={productData} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No Product available</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Product
            </CreateButton>
          </div>
        )}
      </div>
      <ProductModal
        isOpen={isOpen}
        handleOpen={handleOpen}
      />
    </Section>
  );
};

export default ProductsPage;
