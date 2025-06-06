import { useState } from "react";
import { CreateButton } from "../create-button";
import { LoadingData } from "../loading";
import { TableTitle } from "../title";
import { Section } from "../section";
import { IPopularBrands } from "@/types";
import { PopularBrandModal } from "../modal/PopularBrandModal";
import { PopularBrandTable } from "../table/PopularBrand";

interface PopularBrandListProps {
  popularBrandData: IPopularBrands[];
  isLoading: boolean;
  error: Error;
}

export const PopularBrandList = ({
  popularBrandData,
  isLoading,
  error,
}: PopularBrandListProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
    return (
      <Section>
        <div className="flex justify-between items-center mb-4">
          <TableTitle>Popular Brand Table</TableTitle>
          <CreateButton onClick={() => setIsOpen(true)}>
            Create Popular Brand
          </CreateButton>
        </div>
        {isLoading ? (
          <LoadingData className="w-full flex justify-center mt-2" />
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
            {popularBrandData?.length > 0 ? (
              <PopularBrandTable
                popularBrandData={popularBrandData}
                handleOpen={() => setIsOpen(true)}
              />
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No Brand found </p>
                <CreateButton onClick={() => setIsOpen(true)} className="mt-3">
                  Create Popular Brand
                </CreateButton>
              </div>
            )}
          </div>
        )}
        <PopularBrandModal
          isOpen={isOpen}
          setOpen={setIsOpen}
        />
      </Section>
    );
};

export default PopularBrandList;
