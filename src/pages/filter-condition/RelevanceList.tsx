import { CreateButton } from "@/components/create-button";
import { RelevanceModal } from "@/components/modal";
import { Section } from "@/components/section";
import { RelevanceTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetRelevance } from "@/hooks";
import { Relevance } from "@/types";
import { useState } from "react";

const RelevanceList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Relevance>>({});
  const { data: relevanceData = [] } = useGetRelevance();


  const handleOpen = (element?: Relevance) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Condition Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>
          Create Relevance
        </CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {relevanceData?.length > 0 ? (
          <RelevanceTable
            relevanceData={relevanceData as Relevance[]}
            handleOpen={handleOpen}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No Relevance available</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Relevance
            </CreateButton>
          </div>
        )}
      </div>

      <RelevanceModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
    </Section>
  );
};

export default RelevanceList;
