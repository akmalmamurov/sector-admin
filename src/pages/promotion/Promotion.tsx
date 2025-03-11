import { CreateButton } from "@/components/create-button";
import { LoadingData } from "@/components/loading";
import { PromotionModal } from "@/components/modal";
import { Section } from "@/components/section";
import { TableTitle } from "@/components/title";
import { useGetPromotions } from "@/hooks";
import { useState } from "react";
import { PromotionData } from "@/types";
import PromotionTable from "@/components/table/PromotionTable";

const Promotion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: promotionData = [], isLoading, error } = useGetPromotions();
  const [tableElement, setTableElement] = useState<Partial<PromotionData>>({});

  const handleOpen = (element?: PromotionData) => {
    setIsOpen(!isOpen);
    setTableElement(element || {});
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Promotion Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>
          Create Promotion
        </CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {promotionData?.length > 0 ? (
            <PromotionTable 
              promotionData={promotionData}
              handleOpen={handleOpen}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No promotion found or created yet </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Promotion
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <PromotionModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </Section>
  );
};

export default Promotion;
