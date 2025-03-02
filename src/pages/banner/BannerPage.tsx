import { CreateButton } from "@/components/create-button";
import { LoadingData } from "@/components/loading";
import { BannerModal } from "@/components/modal";
import { Section } from "@/components/section";
import BannerTable from "@/components/table/BannerTable";
import { TableTitle } from "@/components/title";
import { useGetBanner } from "@/hooks/banner/get-banner";
import { BannerData } from "@/types";
import { useState } from "react";

const BannerPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState<Partial<BannerData>>({});
  const { data: bannerData = [], isLoading, error } = useGetBanner();

  const handleOpen = (element?: BannerData) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Banner Table</TableTitle>
        <CreateButton onClick={() => handleOpen()}>Create Banner</CreateButton>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {bannerData?.length > 0 ? (
            <BannerTable bannerData={bannerData} handleOpen={handleOpen} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No catalog found </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create Banner
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <BannerModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </Section>
  );
};

export default BannerPage;
