import { LoadingData } from "../loading";
import { TableTitle } from "../title";
import { Section } from "../section";
import { IQuestion } from "@/types";
import { QuestionTable } from "@/components/table/QuestionTable";

interface QuestionListProps {
  questionData: IQuestion[];
  isLoading: boolean;
  error: Error;
}

export const QuestionList = ({
  questionData,
  isLoading,
  error,
}: QuestionListProps) => {
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Question Table</TableTitle>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {questionData?.length > 0 ? (
            <QuestionTable questionData={questionData} />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Question found </p>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

export default QuestionList;
