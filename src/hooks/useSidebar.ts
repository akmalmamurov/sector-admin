import useSettings from "@/context/settings";

export const useSidebarColor = () => {
  const { sideNavType, theme } = useSettings();

  const safeSideNavType = sideNavType ?? "white";

  return theme[safeSideNavType] || theme["white"];
};

export default useSidebarColor;
