import { CreateButton } from "@/components/create-button";
import { BrandModal } from "@/components/modal";
import { Section } from "@/components/section";
import { TableTitle } from "@/components/title";
import { Brand } from "@/types";
import { useState } from "react";

const BrandPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Brand>>({});
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
      <BrandModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
    </Section>
  );
};

export default BrandPage;
