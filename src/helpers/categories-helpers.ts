import { useEffect, useState } from "react";
import { Category, Catalog, SubCatalog } from "@/types";

export const useCatalogSelection = (catalogData: Catalog[]) => {
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (catalogData.length > 0 && !selectedCatalogId) {
      setSelectedCatalogId(catalogData[0].id);
    }
  }, [catalogData, selectedCatalogId]);

  return { selectedCatalogId, setSelectedCatalogId };
};

export const useSubCatalogSelection = (
  subCatalogData: SubCatalog[],
  selectedCatalogId: string | null
) => {
  const [selectedSubCatalogId, setSelectedSubCatalogId] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedSubCatalogId(null);
  }, [selectedCatalogId]);

  useEffect(() => {
    if (subCatalogData.length > 0 && !selectedSubCatalogId) {
      setSelectedSubCatalogId(subCatalogData[0].id);
    }
  }, [subCatalogData, selectedSubCatalogId]);

  return { selectedSubCatalogId, setSelectedSubCatalogId };
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});

  const handleOpen = (element?: Category) => {
    setTableElement(element || {});
    setIsOpen(!isOpen);
  };

  return { isOpen, setIsOpen, tableElement, handleOpen };
};
