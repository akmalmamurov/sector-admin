import { ArrowRightIcon } from "@/assets/icons/arrowRighticon";
import { createPagination } from "@/utils/create-pagination";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  setPage,
  page,
  limit,
}) => {
  const totalPages = Math.ceil(total / limit);

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 50, behavior: "smooth" });
    }
  };

  const pages = createPagination(totalPages, page);

  return (
    <div className="flex justify-center gap-2 px-2 py-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-[23px]  border border-blue-500 text-blue-500 disabled:opacity-50 flex items-center hover:bg-blue-500 hover:text-white duration-200 ease-in-out disabled:hover:bg-transparent disabled:hover:text-blue-500 text-sm h-[42px]"
      >
        <span className="mr-2">
          <ArrowRightIcon className="rotate-180" />
        </span>
        Назад
      </button>

      {pages.map((p, index) => {
        if (p === "...") {
          return (
            <span
              key={index}
                className="w-[42px] h-[42px] flex items-center justify-center border border-blue-500"
            >
              ...
            </span>
          );
        }

        const pageNumber = p as number;
        return (
          <button
            key={index}
            onClick={() => onPageChange(pageNumber)}
            className={` w-[42px] h-[42px] flex justify-center items-center  border border-blue-500  transition-colors text-sm hover:bg-blue-500 hover:text-white duration-200 ease-in-out
              ${
                pageNumber === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-textColor"
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-[23px]  border border-blue-500 text-blue-500 disabled:opacity-50 flex items-center hover:bg-blue-500 hover:text-white duration-200 ease-in-out disabled:hover:bg-transparent disabled:hover:text-blue-500 text-sm h-[42px]"
      >
        Дальше
        <span className="ml-2 ">    
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
