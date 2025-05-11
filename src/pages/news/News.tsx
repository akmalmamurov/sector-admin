import { CreateButton } from "@/components/create-button";
import { LoadingData } from "@/components/loading";
import { Section } from "@/components/section";
import { TableTitle } from "@/components/title";
import { useState } from "react";
import { NewsData } from "@/types";
import { useGetNews } from "@/hooks/news/get-news";
import NewsTable from "@/components/table/NewsTable";
import NewsModal from "@/components/modal/NewsModal";

const News = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: newsData = [], isLoading, error } = useGetNews();
  const [tableElement, setTableElement] = useState<Partial<NewsData>>({});
    
  const handleOpen = (element?: NewsData) => {
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
          {newsData?.length > 0 ? (
            <NewsTable 
              newsData={newsData as NewsData[]}
              handleOpen={handleOpen}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No news found or created yet </p>
              <CreateButton onClick={() => handleOpen()} className="mt-3">
                Create News
              </CreateButton>
            </div>
          )}
        </div>
      )}
      <NewsModal
        isOpen={isOpen}
        handleOpen={() => setIsOpen(false)}
        element={tableElement}
      />
    </Section>
  );
};

export default News;
