export const trimFormValues = <T extends Record<string, string | number | null | undefined>>(values: T): T => {
    return Object.keys(values).reduce((acc, key) => {
      const value = values[key];
      return {
        ...acc,
        [key]: typeof value === "string" ? value.trim() : value,
      };
    }, {} as T);
  };
  