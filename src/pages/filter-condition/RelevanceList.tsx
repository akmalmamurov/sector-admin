import { CreateButton } from "@/components/create-button";
import { ConditionModal } from "@/components/modal";
import { Section } from "@/components/section";
import {  RelevanceTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { RelevanceResponse } from "@/types";
import { useState } from "react";
const relevanceData = [
  {
    id: "1",
    title: "Relevance 1",
  },
  {
    id: "2",
    title: "Relevance 2",
  },
  {
    id: "3",
    title: "Relevance 3",
  },
];
const RelevanceList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const handleOpen = (element?: RelevanceResponse) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Relevance Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>
          Create Relevance
        </CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {relevanceData?.length > 0 ? (
            <RelevanceTable
            relevanceData={relevanceData}
              handleOpen={handleOpen}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Condition available </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Condition
              </CreateButton>
            </div>
          )}
        </div>
      </div>

      <ConditionModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        element={tableElement}
      />
    </Section>
  );
};

export default RelevanceList;
