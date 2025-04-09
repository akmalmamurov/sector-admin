import { CreateButton } from "@/components/create-button";
import { BrandModal } from "@/components/modal";
import { Section } from "@/components/section";
import { BrandTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { Input } from "@/components/ui/input";
import { useGetBrand } from "@/hooks";
import { Brand } from "@/types";
import { useState } from "react";

const BrandPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Brand>>({});
  const [isSearch, setIsSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: brandData = {data: {brands: [], total: 0, limitNumber: 0, pageNumber: 0}, error: null, status: 200} } = useGetBrand({
    page: page,
    limit: limit,
    title: isSearch || undefined,
  });
  
  const handleOpen = (elementOrIsOpen?: boolean | Brand) => {
    if (typeof elementOrIsOpen === "boolean") {
      setIsOpen(elementOrIsOpen);
    } else {
      setTableElement(elementOrIsOpen || {});
      setIsOpen(true);
    }
  };
  const handleSearch = (value: string) => {
    setIsSearch(value.length > 0 ? value : "");
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Brand Table</TableTitle>
        <Input
        className="w-1/4"
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <CreateButton onClick={() => handleOpen()}>Create Brand</CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {brandData.data.brands.length ?? 0 > 0 ? (
          <BrandTable brandData={brandData} handleOpen={handleOpen} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No Brand found for</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Brand
            </CreateButton>
          </div>
        )}
      </div>
      <BrandModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
    </Section>
  );
};

export default BrandPage;
