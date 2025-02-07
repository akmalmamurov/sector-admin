import CategoiesModal from "@/components/modal/CategoiesModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CatalogPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button className="bg-white text-navMenu px-5" onClick={toggleModal}>
        Создать
      </Button>
      <CategoiesModal isOpen={isOpen} toggleOpen={toggleModal} />
    </div>
  );
};

export default CatalogPage;
