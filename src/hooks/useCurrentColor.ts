import useSettings from "@/context/settings";

export const useCurrentColor = () => {
  const { themeType, theme } = useSettings();
  
  const safeThemeType = themeType ?? "white";

  return theme[safeThemeType] || theme["white"];
};

export default useCurrentColor;
