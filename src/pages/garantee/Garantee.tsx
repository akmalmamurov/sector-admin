import { CreateButton } from "@/components/create-button";
import { LoadingData } from "@/components/loading";
import { GaranteeModal } from "@/components/modal/GaranteeModal";
import { Section } from "@/components/section";
import GaranteeTable from "@/components/table/GaranteeTable";
import { TableTitle } from "@/components/title";
import { useGetGarantee } from "@/hooks/garantee/get-garantee";
import { useState } from "react";
import { GaranteeData } from "@/types";

const Garantee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: garanteeData = [], isLoading, error } = useGetGarantee();
  const [tableElement, setTableElement] = useState<Partial<GaranteeData>>({});

  const handleOpen = (element?: GaranteeData) => {
    setIsOpen(!isOpen);
    setTableElement(element || {});
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Garantee Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create Garantee</CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {garanteeData?.length > 0 ? (
            <GaranteeTable garanteeData={garanteeData} handleOpen={handleOpen} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No garantee found </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Garantee
              </CreateButton>
            </div>
          )}
        </div>
      )}
        <GaranteeModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </Section>
  );
};

export default Garantee;
