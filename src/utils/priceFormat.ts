export const priceFormat = (value: number | null | undefined): string => {
    if (value == null) return "0";
    return `${Number(value)
      .toLocaleString("uz-UZ", { useGrouping: true, minimumFractionDigits: 0 })
      .replace(/,/g, " ")}`;
  };
  