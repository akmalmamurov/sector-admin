import { CreateButton } from "@/components/create-button";
import { ProductModal } from "@/components/modal";
import ProductModalLink from "@/components/modal/ProductModalLink";
import { Section } from "@/components/section";
import { ProductTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetProduct } from "@/hooks";
import { ProductData } from "@/types";
import { memo, useState } from "react";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);
  const [tableElement, setTableElement] = useState({});
  const [tableElementLink, setTableElementLink] = useState({});
  const handleOpen = (element?: ProductData) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };
  const handleOpenLink = (element?: ProductData) => {
    setTableElementLink(element || {});
    setIsOpenLink(!isOpenLink);
  };
  const { data: productData = [] } = useGetProduct();

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Product Table</TableTitle>
        <div className="flex gap-4 items-center">
          <CreateButton onClick={() => handleOpenLink()}>Create Product Link</CreateButton>
          <CreateButton onClick={() => handleOpen()}>Create Product</CreateButton>
        </div>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {productData?.length > 0 ? (
          <ProductTable productData={productData} handleOpen={handleOpen} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No Product available</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Product
            </CreateButton>
          </div>
        )}
      </div>
      <ProductModal isOpen={isOpen} handleOpen={handleOpen} element={tableElement} />
      <ProductModalLink isOpenLink={isOpenLink} handleOpenLink={handleOpenLink} element={tableElementLink} />
    </Section>
  );
};

export default memo(ProductsPage);
