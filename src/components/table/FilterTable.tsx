import { useState } from "react";
import classNames from "classnames";
import { SearchIcon, X } from "lucide-react";
import { Range } from "react-range";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useConfirmModal, useCurrentColor } from "@/hooks";
import { FilterResponse, FilterOption } from "@/types";
import DeleteFilterModal from "../modal/DeleteItem";
import { ConfirmModal } from "../modal";
import { Input } from "../ui/input";
  import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from "../ui/dialog";

interface Props {
  filterData: FilterResponse[];
  handleOpen: (element?: FilterResponse) => void;
}


const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

export const FilterTable = ({ filterData, handleOpen }: Props) => {
  const theme = useCurrentColor();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const { mutate: deleteFilter } = useDeleteFilterFull();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<FilterOption[]>([]);


    
  const {
    isOpen: isConfirmOpen,
    message,
    // openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  // const handleDeleteClick = (id: string) => {
  //   openModal("Are you sure you want to delete this filter?", () => {
  //     deleteFilter({ id });
  //   });
  // };

  const groupBrandsByLetter = (brands: FilterOption[]) => {
    const grouped: { [key: string]: FilterOption[] } = {};

    brands.forEach((brand) => {
      const firstLetter = brand.title.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(brand);
    });

    const sortedGroups: { [key: string]: FilterOption[] } = {};
    Object.keys(grouped)
      .sort() 
      .forEach((letter) => {
        sortedGroups[letter] = grouped[letter].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      });

    return sortedGroups;
  };

  
    const [rangeValues, setRangeValues] = useState<{
      [key: string]: [number, number];
    }>({});

    const handleRangeChange = (title: string, values: [number, number]) => {
      setRangeValues((prev) => ({
        ...prev,
        [title]: values,
      }));
    };
   console.log(filterData);

    const [expandedFilters, setExpandedFilters] = useState<{
      [key: string]: boolean;
    }>({});

    const toggleFilter = (title: string) => {
      setExpandedFilters((prev) => ({
        ...prev,
        [title]: !prev[title],
      }));
    };
      
  return (
    <>
      <Table className="table-auto min-w-[800px] w-full">
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            <TableHead
              className={`px-4 py-2 uppercase font-bold text-sm ${theme.text}`}
            >
              Filter 
            </TableHead>
            {/* <TableHead className="px-4 py-2">Type</TableHead> */}
            <TableHead
              className={`px-4 py-2 uppercase font-bold text-sm text-right ${theme.text}`}
            >
              Products
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData?.map((item, index) => (
            <TableRow key={item.id || index} className="flex gap-5">
              <TableCell className="gap-1 text-sm w-[300px] shadow-md">
                <div
                  className={`${theme.text} text-lg mb-3 flex gap-2 items-center ml-4`}
                >
                  <img src="/filter.svg" alt="filter" className="w-5 h-5" />
                  Фильтры
                </div>
                 {item.data.map((filterItem, idx) => {
                  return (
                    <div key={`${item.id}-data-${idx}`} className="mb-4">
                      <div className="flex gap-2 bg-gray-100 w-full items-center py-3 px-5 mb-2">
                        <span className="text-header">
                          <img
                            src={filterItem.icon}
                            alt={filterItem.icon}
                            className="w-5 h-5"
                          />
                        </span>
                        <p className={`${theme.text} `}>{filterItem.title}</p>
                      </div>
                      <div className="ml-4">
                        {filterItem.type === "link" && (
                          <>
                            {filterItem.withSearch && (
                              <div className="relative mb-2">
                                <Input
                                  type="text"
                                  placeholder="Search"
                                  className="w-full outline-none"
                                />
                                <SearchIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2" />
                              </div>
                            )}

                            <div className="mb-2 overflow-y-auto max-h-[200px]">
                              {filterItem.options.map((option, idx) => (
                                <div
                                  key={`${item.id}-data-option-${idx}`}
                                  className="mb-2 "
                                >
                                  <Link
                                    to={"#"}
                                    className={`${theme.text} text-sm hover:text-blue-500`}
                                  >
                                    {option.title}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="ml-4">
                        {filterItem.type === "import-checkbox" && (
                          <div className="mb-2 space-y-2">
                            {filterItem.options
                              .slice(0, 5)
                              .map((option, idx) => (
                                <label
                                  key={`${item.id}-data-option-${idx}`}
                                  htmlFor={`import-checkbox-${idx}`}
                                  className="flex items-center space-x-2 select-none"
                                >
                                  <input type="checkbox" id={`import-checkbox-${idx}`} />
                                  <span className={`${theme.text} text-sm`}>
                                    {option.title}
                                  </span>
                                </label>
                              ))}

                            {filterItem.options.length > 5 && (
                              <button
                                onClick={() => {
                                  setSelectedBrands(filterItem.options);
                                  setModalOpen(true);
                                }}
                                className="mt-2 text-blue-500 hover:underline"
                              >
                                Ещё {filterItem.options.length - 5}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="ml-4 pr-4">
                        {filterItem.type === "radio" && (
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2 min-h-[60px] gap-2">
                              <span className="text-sm font-medium text-gray-700">
                                Диапазон
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatNumber(
                                  rangeValues[filterItem.title]?.[0] || 0
                                )}{" "}
                                сум -{" "}
                                {formatNumber(
                                  rangeValues[filterItem.title]?.[1] ||
                                    500000000
                                )}{" "}
                                сум
                              </span>
                            </div>

                            <div className="relative flex items-center">
                              <Range
                                values={
                                  rangeValues[filterItem.title] || [
                                    0, 500000000,
                                  ]
                                }
                                step={1000}
                                min={0}
                                max={500000000}
                                onChange={(values) =>
                                  handleRangeChange(
                                    filterItem.title,
                                    values as [number, number]
                                  )
                                }
                                renderTrack={({ props, children }) => (
                                  <div
                                    {...props}
                                    className="h-1 w-full bg-gray-200 rounded-full relative"
                                    style={{ ...props.style }}
                                  >
                                    <div
                                      className="absolute h-1 bg-green-500 rounded-full"
                                      style={{
                                        left: `${
                                          ((rangeValues[
                                            filterItem.title
                                          ]?.[0] || 0) /
                                            500000000) *
                                          100
                                        }%`,
                                        width: `${
                                          (((rangeValues[
                                            filterItem.title
                                          ]?.[1] || 500000000) -
                                            (rangeValues[
                                              filterItem.title
                                            ]?.[0] || 0)) /
                                            500000000) *
                                          100
                                        }%`,
                                      }}
                                    />
                                    {children}
                                  </div>
                                )}
                                renderThumb={({ props }) => (
                                  <div
                                    {...props}
                                    className="h-5 w-5 bg-white border-2 border-green-500 rounded-full flex items-center justify-center focus:outline-none"
                                    style={{ ...props.style }}
                                  />
                                )}
                              />
                            </div>

                            <div className="flex justify-between mt-2">
                              <span className="text-sm text-gray-600">
                                {formatNumber(
                                  rangeValues[filterItem.title]?.[0] || 0
                                )}
                              </span>
                              <span className="text-sm text-gray-600">
                                {formatNumber(
                                  rangeValues[filterItem.title]?.[1] ||
                                    500000000
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {filterItem.type === "checkbox" && (
                          <div className="mb-2 space-y-2">
                            {filterItem.options
                              .slice(0,expandedFilters[filterItem.title] ? filterItem.options.length : 5)
                              .map((option, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <label
                                    htmlFor={`checkbox-${idx}`}
                                    className="flex items-center gap-2 select-none"
                                  >
                                    <input type="checkbox" id={`checkbox-${idx}`} />
                                    <span className={`${theme.text} text-sm`}>
                                      {option.title}
                                    </span>
                                  </label>
                                </div>
                              ))}

                            {filterItem.options.length > 5 && (
                              <button
                                onClick={() => toggleFilter(filterItem.title)}
                                className="text-blue-500 hover:underline"
                              >
                                {expandedFilters[filterItem.title]
                                  ? "Скрыть"
                                  : `Ещё ${filterItem.options.length - 5}`}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}  
              </TableCell>
              <TableCell className="gap-1 text-sm flex-1">
                <p className={`${theme.text} text-sm`}>
                  There are products in this filter
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={modalOpen} onOpenChange={() => setModalOpen(false)}>
        <DialogContent
          className={`${theme.bg} max-w-4xl h-[500px] overflow-y-auto flex flex-col px-5 pt-6`}
        >
          <DialogHeader className="font-bold">
            <DialogTitle className={theme.text}>Поиск бренда</DialogTitle>
            <button onClick={() => setModalOpen(false)}>
              <X
                className={classNames(
                  theme.text,
                  "w-6 h-6 absolute top-4 right-4"
                )}
              />
            </button>
          </DialogHeader>

          <div className="mt-4 flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Поиск..."
              className="border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {Object.entries(groupBrandsByLetter(selectedBrands)).map(
              ([letter, brands]) => (
                <div key={letter} className="flex flex-col">
                  <h3 className={`${theme.text} font-bold text-lg mb-2`}>
                    {letter}
                  </h3>
                  {brands.map((brand, idx) => (
                    <label
                      key={`${letter}-${brand.title}-${idx}`}
                      className="flex items-center gap-2 mb-2 select-none"
                    >
                      <input type="checkbox" id={`checkbox-${idx}`} />
                      <span className={`${theme.text} text-sm font-medium`}>
                          {brand.title}
                      </span>
                    </label>  
                  ))}
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 📌 Delete Modal */}
      <DeleteFilterModal
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        filterData={filterData}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </>
  );
};

export default FilterTable;
