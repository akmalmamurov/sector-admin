import { CreateButton } from "@/components/create-button";
import { ProductModal } from "@/components/modal";
import ProductModalFunctional from "@/components/modal/ProductModalFunctional";
import ProductModalLink from "@/components/modal/ProductModalLink";
import { Section } from "@/components/section";
import { ProductTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { Input } from "@/components/ui/input";
import { IProductResponse, useGetProductByFilter } from "@/hooks/product/get-product-by-filter";
import { ProductData } from "@/types";
import { memo, useState } from "react";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenLink, setIsOpenLink] = useState<boolean>(false);
  const [isOpenFunctional, setIsOpenFunctional] = useState<boolean>(false);
  const [tableElement, setTableElement] = useState({});
  const [tableElementLink, setTableElementLink] = useState({});
  const [tableElementFunctional, setTableElementFunctional] = useState({});
  const [isSearch, setIsSearch] = useState<string>("");
  const [isCode, setIsCode] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: productData } = useGetProductByFilter({page: page, limit: limit, title: isSearch || undefined, productCode: isCode || undefined});
  
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
    if (value.length > 0) {
      setIsSearch(value);
    } else {
      setIsSearch("");
    }
  };
  const handleCode = (value: string) => {
    if (value.length > 0) {
      setIsCode(value);
    } else {
      setIsCode("");
    }
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Product Table</TableTitle>
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">
            {productData?.data.totalPages} {" / "} {productData?.data.pageNumber}
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
        {productData?.data.products.length ?? 0 > 0 ? (
          <ProductTable productData={productData as IProductResponse} handleOpen={handleOpen} setPage={setPage} page={page} limit={limit} setLimit={setLimit} />
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
