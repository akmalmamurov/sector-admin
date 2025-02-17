import { CreateButton } from "@/components/create-button";
import { ConditionModal } from "@/components/modal";
import { Section } from "@/components/section";
import { ConditionTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { ConditionResponse } from "@/types";
import { useState } from "react";
const conditionData = [
  {
    id: "1",
    title: "Condition 1",
  },
  {
    id: "2",
    title: "Condition 2",
  },
  {
    id: "3",
    title: "Condition 3",
  },
];
const ConditionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const handleOpen = (element?: ConditionResponse) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Condition Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>
          Create Condition
        </CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {conditionData?.length > 0 ? (
            <ConditionTable
              conditionData={conditionData}
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

export default ConditionList;
