import { CreateButton } from "@/components/create-button";
import { ConditionModal } from "@/components/modal";
import { Section } from "@/components/section";
import { ConditionTable } from "@/components/table";
import { TableTitle } from "@/components/title";
import { useGetCondition } from "@/hooks";
import { Condition } from "@/types";
import { useState } from "react";

const ConditionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<Condition>>({});
  const { data: responseData } = useGetCondition();

  const conditionData = responseData?.data || [];

  const handleOpen = (element?: Condition) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  console.log("Fetched Condition Data:", conditionData);

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Condition Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>
          Create Condition
        </CreateButton>
      </div>
      <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
        {conditionData.length > 0 ? (
          <ConditionTable
            conditionData={conditionData}
            handleOpen={handleOpen}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No Condition available</p>
            <CreateButton onClick={() => handleOpen()} className="mt-3">
              Create Condition
            </CreateButton>
          </div>
        )}
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
