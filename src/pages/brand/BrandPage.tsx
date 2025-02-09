import { CreateButton } from "@/components/create-button";
import { BrandModal } from "@/components/modal";
import { Section } from "@/components/section";
import { BrandTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetBrand } from "@/hooks";
import { Brand } from "@/types";
import { useState } from "react";

const BrandPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Brand>>({});
  const { data: brandData = [] } = useGetBrand();
  const handleOpen = (elementOrIsOpen?: boolean | Brand) => {
    if (typeof elementOrIsOpen === "boolean") {
      setIsOpen(elementOrIsOpen);
    } else {
      setTableElement(elementOrIsOpen || {});
      setIsOpen(true);
    }
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Brand Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create Brand</CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {brandData?.length > 0 ? (
          <BrandTable brandData={brandData} handleOpen={handleOpen} />
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
