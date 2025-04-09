import { useRef, useState } from "react";
import classNames from "classnames";
import { SearchIcon, Trash2Icon, X, MoreHorizontal, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Range } from "react-range";

import { useConfirmModal, useCurrentColor, useDeleteFilterFull } from "@/hooks";
import {
  FilterResponse,
  FilterOption,
  FilterRequest,
  ProductData,
} from "@/types";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import DeleteFilterModal from "../modal/DeleteItem";
import { ConfirmModal } from "../modal";
import ProductModalTable from "./ProductModalTable";
import { useGetProductByCatalogId } from "@/hooks/product/get-product-by-catalog";

interface Props {
  filterData: FilterResponse[];
  handleOpen: (element?: FilterResponse) => void;
  selectedSubCatalogId: string;
  selectedCategoryId: string;
}

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const FilterTable = ({ filterData, handleOpen, selectedSubCatalogId, selectedCategoryId }: Props) => {
  const theme = useCurrentColor();
  const [checkedProduct, setCheckedProduct] = useState<ProductData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const filterNameRef = useRef<HTMLInputElement>(null);
  const [selectedBrands, setSelectedBrands] = useState<FilterOption[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState<ProductData[]>([]);
  const [filterCheckedData, setFilterCheckedData] = useState<FilterOption[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: productData } = useGetProductByCatalogId({
    catalogId: selectedCategoryId,
    subcatalogId: selectedSubCatalogId,
  });
  const [step, setStep] = useState(1);
  const { mutate: deleteFilter } = useDeleteFilterFull();
  const {
    isOpen: isConfirmOpen,
    message,
    openModal,
    closeModal,
    onConfirm,
  } = useConfirmModal();

  const handleDeleteClick = (id: string) => {
    openModal("Are you sure you want to delete this filter?", () => {
      deleteFilter({ id });
    });
  };

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

  const [expandedFilters, setExpandedFilters] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleFilter = (title: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleUpload = () => {
    localStorage.setItem(
      "filterCheckedData",
      JSON.stringify(filterCheckedData)
    );
    // const sendData = filterCheckedData.map((item) => ({
    //   name: item.name,
    //   options: item.options,
    // }));
    // console.log(sendData);
    console.log(selectedCategoryId, selectedSubCatalogId);
    console.log(checkedProduct);
  };

  const handleFilterChecked = (filter: FilterOption) => {
    if (filterCheckedData.some((item) => item.name === filter.name)) {
      setFilterCheckedData((prev) =>
        prev.filter((item) => item.name !== filter.name)
      );
    } else {
      setFilterCheckedData((prev) => [...prev, filter]);
    }
  };

  const handleChecked = (product: ProductData) => {
    if (checkedProduct.some((item) => item.id === product.id)) {
      setCheckedProduct((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
    } else {
      setCheckedProduct((prev) => [...prev, product]);
    }
  };

  const renderFilterItem = (filterItem: FilterRequest) => {
    if (filterItem.type === "import-checkbox") {
      return (
        <div className="mb-2 space-y-2">
          {(filterItem.options ?? [])
            .slice(
              0,
              expandedFilters[filterItem.title]
                ? (filterItem.options ?? []).length
                : 5
            )
            .map((option, optIdx) => (
              <label
                key={`${filterItem.name}-${optIdx}`}
                htmlFor={`import-checkbox-${filterItem.name}-${optIdx}`}
                className="flex items-center space-x-2 select-none"
              >
                <input
                  type="checkbox"
                  id={`import-checkbox-${filterItem.name}-${optIdx}`}
                />
                <span className={`${theme.text} text-sm`}>{option.title}</span>
              </label>
            ))}

          {(filterItem.options ?? []).length > 5 && (
            <button
              onClick={() => {
                setModalOpen(true);
                setSelectedBrands(filterItem.options);
              }}
              className="text-blue-500 hover:underline"
            >
              {`Ещё ${filterItem.options.length - 5}`}
            </button>
          )}
        </div>
      );
    } else if (filterItem.type === "checkbox") {
      return (
        <div className="mb-2 space-y-2">
          {(filterItem.options ?? [])
            .slice(
              0,
              expandedFilters[filterItem.title]
                ? (filterItem.options ?? []).length
                : 5
            )
            .map((option, optIdx) => (
              <label
                key={`${filterItem.name}-${optIdx}`}
                htmlFor={`checkbox-${filterItem.name}-${optIdx}`}
                className="flex items-center space-x-2 select-none"
              >
                <input
                  type="checkbox"
                  id={`checkbox-${filterItem.name}-${optIdx}`}
                />
                <span className={`${theme.text} text-sm`}>{option.title}</span>
              </label>
            ))}

          {(filterItem.options ?? []).length > 5 && (
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
      );
    } else if (filterItem.type === "radio") {
      return (
        <div className="mb-4 pr-4 py-3">
          <p className="text-sm font-medium text-gray-700 mb-4">
            Диапазон: {formatNumber(rangeValues[filterItem.title]?.[0] || 0)} -
            {formatNumber(rangeValues[filterItem.title]?.[1] || 500000000)}
          </p>
          <Range
            values={rangeValues[filterItem.title] || [0, 500000000]}
            step={1000}
            min={0}
            max={500000000}
            onChange={(values) =>
              handleRangeChange(filterItem.title, values as [number, number])
            }
            renderTrack={({ props, children }) => {
              return (
                <div
                  {...props}
                  className="h-1 w-full bg-gray-200 rounded-full relative"
                >
                  <div
                    className="absolute h-1 bg-green-500 rounded-full"
                    style={{
                      left: `${
                        ((rangeValues[filterItem.title]?.[0] || 0) /
                          500000000) *
                        100
                      }%`,
                      width: `${
                        (((rangeValues[filterItem.title]?.[1] || 500000000) -
                          (rangeValues[filterItem.title]?.[0] || 0)) /
                          500000000) *
                        100
                      }%`,
                    }}
                  />
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className="h-5 w-5 bg-white border-2 border-green-500 rounded-full flex items-center justify-center focus:outline-none"
                />
              );
            }}
          />
        </div>
      );
    } else if (filterItem.type === "link") {
      return (
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
            {(filterItem.options ?? []).map((option, idx) => (
              <div key={`${filterItem.name}-option-${idx}`} className="mb-2">
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
      );
    } else {
      return (
        <p className="text-gray-500 text-sm italic">No filters available</p>
      );
    }
  };
  const renderFilterModalItem = (filterItem: FilterRequest, itemIdx: number) => {
    if (filterItem.type === "import-checkbox") {
      return (
        <div className="mb-2 space-y-1.5 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          {(filterItem.options ?? []).map((option, optIdx) => (
            <label
              key={`${filterItem.name}-${optIdx}`}
              htmlFor={`${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
              className="flex items-center space-x-2 select-none"
            >
              <input
                onChange={() => handleFilterChecked(option)}
                checked={filterCheckedData.some(
                  (item) => item.name === option.name
                )}
                type="checkbox"
                id={`${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
              />
              <span className={`${theme.text} text-sm`}>{option.title}</span>
            </label>
          ))}
        </div>
      );
    } else if (filterItem.type === "checkbox") {
      return (
        <div className="mb-2 space-y-1.5 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          {(filterItem.options ?? []).map((option, optIdx) => (
            <label
              key={`${filterItem.name}-${optIdx}`}
              htmlFor={`${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
              className="flex items-center space-x-2 select-none"
            >
              <input
                onChange={() => handleFilterChecked(option)}
                checked={filterCheckedData.some(
                  (item) => item.name === option.name
                )}
                type="checkbox"
                id={`${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
              />
              <span className={`${theme.text} text-sm`}>{option.title}</span>
            </label>
          ))}
        </div>
      );
    } else if (filterItem.type === "radio") {
      return (
        <div className="mb-4 pr-4 py-3">
          <input
            type="text"
            className="w-full outline-none border border-gray-400 rounded-md px-2 py-1.5  text-xs"
          />
        </div>
      );
    } else if (filterItem.type === "link") {
      return (
        <>
          <div className="mb-2 space-y-1.5 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
            {(filterItem.options ?? []).map((option, optIdx) => (
              <label
                key={`${filterItem.name}-${optIdx}`}
                htmlFor={`modal-link-${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
                className="flex items-center space-x-2 select-none"
              >
                <input
                  onChange={() => handleFilterChecked(option)}
                  checked={filterCheckedData.some(
                    (item) => item.name === option.name
                  )}
                  type="checkbox"
                  id={`modal-link-${filterItem.name}-${option.name}-${optIdx}-${itemIdx}`}
                />
                <span className={`${theme.text} text-sm`}>{option.title}</span>
              </label>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <p className="text-gray-500 text-sm italic">No filters available</p>
      );
    }
  };

  const handleGetProduct = () => {
    setFilteredProduct(
      productData?.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(filterNameRef.current?.value?.toLowerCase() ?? "") ||
          product.productCode
            .toLowerCase()
            .includes(filterNameRef.current?.value?.toLowerCase() ?? "")
      ) ?? []
    );
  };

  console.log(filterData);

  return (
    <>
      {/* <Table className="table-auto min-w-[800px] w-full">
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            <TableHead className={`px-4 py-2 uppercase font-bold text-sm ${theme.text}`}>Name</TableHead>
            <TableHead className={`px-4 py-2 uppercase font-bold text-sm text-right ${theme.text}`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-auto">
          {filterData?.map((item, index) => (
            <TableRow key={item.id || index} className="overflow-x-auto">
              <TableCell className="flex gap-1 text-sm">
                {item.data.map((filterItem, idx) => (
                  <div key={`${item.id}-data-${idx}`} className="flex gap-1 ">
                    <span className="text-header font-bold"> {idx + 1}. </span>
                    <p className={theme.text}>{filterItem.title}</p>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button
                     onClick={() => setModalOpenAdd(true)}
                    className="my-3 w-[300px]"
                  >
                    Update
                  </Button>
                </div>
                <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
                  {productData?.length ?? 0 > 0 ? (
                    <ProductModalTable
                      handleChecked={handleChecked}
                      checkedProduct={checkedProduct}
                      productData={productData as ProductData[]}
                      setPage={setPage}
                      page={page}
                      limit={limit}
                      setLimit={setLimit}
                      number={true}
                    />
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>No Product available</p>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

<Table className="table-auto min-w-[800px] w-full">
        <TableHeader className={`${theme.header}`}>
          <TableRow>
            <TableHead
              className={`px-4 py-2 uppercase font-bold text-sm ${theme.text}`}
            >
              Filter
            </TableHead>
            <TableHead
              className={`px-4 py-2 uppercase font-bold text-sm text-right ${theme.text}`}
            >
              Products
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {filterData?.map((filterItem, idx) => (
            <TableRow
              key={`${filterItem.id}-data-${idx}`}
              className="gap-5 flex"
            >
              <TableCell className="gap-1 text-sm w-[300px] shadow-md">
                <div className="flex gap-2 items-center justify-between mb-4 py-2 px-3">
                  <div className="flex gap-2 items-center">
                    <img src="/filter.svg" alt="filter" className="w-5 h-5" />
                    <p className="text-lg font-medium">Фильтры</p>
                  </div>
                  <div className="bg-gray-200 rounded-md p-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal
                            className={classNames("w-4 h-4 text-header")}
                          />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className={theme.bg}>
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleOpen(filterItem)}
                            className="flex items-center justify-center px-3 py-2 w-full"
                          >
                            <Edit className="mr-2 w-4 h-4 text-blue-600" />
                            <span className={`min-w-[47px] ${theme.text}`}>
                              Edit
                            </span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => setIsDeleteOpen(true)}
                            className={`flex items-center justify-center px-3 py-2 w-full ${theme.text}`}
                          >
                            <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                            Delete Item
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDeleteClick(filterItem.id)}
                            className={`flex items-center justify-center px-3 py-2 w-full ${theme.text}`}
                          >
                            <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                            Delete Filter
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {filterItem.data.map((item, itemIdx) => (
                  <div
                    key={`${filterItem.id}-item-${itemIdx}`}
                    className="mb-4 "
                  >
                    <div
                      className={`${theme.text} text-lg flex gap-2 items-center bg-gray-100 px-4 py-2 mb-2 select-none`}
                    >
                      <img
                        src={item.icon}
                        alt="filter-icon"
                        className="w-5 h-5"
                      />
                      {item.title}
                    </div>
                    <div className="ml-4">{renderFilterItem(item)}</div>
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setModalOpenAdd(true)}
                    className="my-3 w-[300px]"
                  >
                    Update
                  </Button>
                </div>
                <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
                  {productData?.length ?? 0 > 0 ? (
                    <ProductModalTable
                      handleChecked={handleChecked}
                      checkedProduct={checkedProduct}
                      productData={productData as ProductData[]}
                      setPage={setPage}
                      page={page}
                      limit={limit}
                      setLimit={setLimit}
                      number={true}
                    />
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>No Product available</p>
                    </div>
                  )}
                </div>
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
          <DialogDescription className="hidden">a</DialogDescription>

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
      <Dialog
        open={modalOpenAdd}
        onOpenChange={() => {
          setModalOpenAdd(false);
        }}
      >
        <DialogContent
          className={`${theme.bg} max-w-6xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex flex-col px-5 pt-6`}
        >
          {step === 1 && (
            <>
              <DialogHeader className="font-bold">
                <DialogTitle className={theme.text}>Update</DialogTitle>
                <button onClick={() => setModalOpenAdd(false)}>
                  <X
                    className={classNames(
                      theme.text,
                      "w-6 h-6 absolute top-4 right-4"
                    )}
                  />
                </button>
              </DialogHeader>
              <DialogDescription className="hidden">a</DialogDescription>
              <div className="mt-4 flex items-center gap-2">
                <Input
                  ref={filterNameRef}
                  placeholder="Name or code of product"
                  className="border-gray-300 rounded-md w-[80%] h-[42px]"
                />
                <Button onClick={handleGetProduct} className="w-[20%] h-[42px]">
                  Search
                </Button>
              </div>
              <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
                {productData?.length ?? 0 > 0 ? (
                  <ProductModalTable
                    handleChecked={handleChecked}
                    checkedProduct={checkedProduct}
                    productData={
                      filteredProduct.length > 0
                        ? filteredProduct
                        : (productData as ProductData[])
                    }
                    setPage={setPage}
                    page={page}
                    limit={limit}
                    setLimit={setLimit}
                  />
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>No Product available</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  disabled={checkedProduct.length === 0}
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <DialogHeader className="font-bold">
                <DialogTitle className={theme.text}>
                  {checkedProduct[0].title}
                </DialogTitle>
                <button onClick={() => setModalOpenAdd(false)}>
                  <X
                    className={classNames(
                      theme.text,
                      "w-6 h-6 absolute top-4 right-4"
                    )}
                  />
                </button>
              </DialogHeader>
              <DialogDescription className="hidden">a</DialogDescription>
              <div className="mt-4 flex items-center gap-2">
                <Input
                  ref={filterNameRef}
                  placeholder="Name or code of product"
                  className="border-gray-300 rounded-md w-[80%] h-[42px]"
                />
                <Button onClick={handleGetProduct} className="w-[20%] h-[42px]">
                  Search
                </Button>
              </div>
              <div className="border rounded-md">
                <div className="grid grid-cols-3 gap-2">
                  {filterData[0].data.map((item, itemIdx) => {
                    if (item.name !== "brend" && item.name !== "tsena") {
                      return (
                        <div key={`item-${itemIdx}`} className="">
                          <div
                            className={`${theme.text} text-sm flex gap-2 items-center bg-gray-100 px-4 py-2 mb-2 select-none`}
                          >
                            <img
                              src={item.icon}
                              alt="filter-icon"
                              className="w-3.5 h-3.5"
                            />
                            {item.title}
                          </div>
                          <div className="ml-3 max-h-[200px] overflow-y-auto scrollbar-default">
                            {renderFilterModalItem(item, itemIdx)}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </>
          )}
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
