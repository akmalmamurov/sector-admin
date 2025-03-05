import { LoadingData } from "../loading";
import { TableTitle } from "../title";
import { Section } from "../section";
import { IComment } from "@/types";
import { CommentTable } from "@/components/table/CommentTable";

interface CommentListProps {
  commentData: IComment[];
  isLoading: boolean;
  error: Error;
}

export const CommentList = ({
  commentData,
  isLoading,
  error,
}: CommentListProps) => {

  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Comment Table</TableTitle>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {commentData?.length > 0 ? (
            <CommentTable
              commentData={commentData}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No Comment found </p>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

export default CommentList;
