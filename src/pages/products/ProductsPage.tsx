import { CreateButton } from "@/components/create-button";
import { ProductModal } from "@/components/modal";
import ProductModalFunctional from "@/components/modal/ProductModalFunctional";
import ProductModalLink from "@/components/modal/ProductModalLink";
import { Section } from "@/components/section";
import { ProductTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { Input } from "@/components/ui/input";
import { useGetProduct } from "@/hooks";
import { ProductData } from "@/types";
import { memo, useState } from "react";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);
  const [isOpenFunctional, setIsOpenFunctional] = useState<boolean>(false);
  const [tableElement, setTableElement] = useState({});
  const [tableElementLink, setTableElementLink] = useState({});
  const [tableElementFunctional, setTableElementFunctional] = useState({});
  const [searchArr, setSearchArr] = useState<ProductData[]>([]);
  const [isSearch, setIsSearch] = useState<string>("");
  const { data: productData = [] } = useGetProduct();
  const handleOpen = (element?: ProductData) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };
  const handleOpenLink = (element?: ProductData) => {
    setTableElementLink(element || {});
    setIsOpenLink(!isOpenLink);
  };
  const handleOpenFunctional = (element?: ProductData) => {
    setTableElementFunctional(element || {});
    setIsOpenFunctional(!isOpenFunctional);
  };

  const handleSearch = (value: string) => {
    setIsSearch(value);
    const searchArr = productData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    if (value.length > 0) {
      setSearchArr(searchArr);
    } else {
      setSearchArr(productData);
    }
  };
  const handleCode = (value: string) => {
    setIsSearch(value);
    const searchArr = productData.filter((item) => item.productCode == value);
    if (value.length > 0) {
      setSearchArr(searchArr);
    } else {
      setSearchArr(productData);
    }
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Product Table</TableTitle>
        <div className="flex gap-4 items-center">
          <p>
            {productData.length}/
            {productData.filter((item) => item.fullDescription).length}
          </p>
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <Input
            onChange={(e) => handleCode(e.target.value)}
            type="text"
            placeholder="Code"
          />
          <CreateButton onClick={() => handleOpenFunctional()}>
            Create Product Functional
          </CreateButton>
          <CreateButton onClick={() => handleOpenLink()}>
            Create Product Link
          </CreateButton>
          <CreateButton onClick={() => handleOpen()}>
            Create Product
          </CreateButton>
        </div>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {isSearch ? (
          <ProductTable productData={searchArr} handleOpen={handleOpen} />
        ) : productData.length > 0 ? (
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
      <ProductModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
      <ProductModalLink
        isOpenLink={isOpenLink}
        handleOpenLink={handleOpenLink}
        element={tableElementLink}
      />
      <ProductModalFunctional
        isOpenFunctional={isOpenFunctional}
        handleOpenFunctional={handleOpenFunctional}
        element={tableElementFunctional}
      />
    </Section>
  );
};

export default memo(ProductsPage);
