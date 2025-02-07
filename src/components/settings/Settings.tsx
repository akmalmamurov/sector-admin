import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import classNames from "classnames";
import { Switch } from "../ui/switch";
import useSettings from "@/context/settings";
import { useCurrentColor } from "@/hooks";

interface SettingsDrawerProps {
  open: boolean;
  sideOpen: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const SettingsDrawer = ({
  open,
  setOpen,
  toggleOpen,
  sideOpen,
}: SettingsDrawerProps) => {
  const {
    setSidenavColor,
    sidenavColor,
    setSideNavType,
    sideNavType,
    setThemeType,
    themeType,
  } = useSettings();

  const colors = [
    { name: "violet", className: "bg-violet-gradient" },
    { name: "dark", className: "bg-dark-gradient" },
    { name: "blue", className: "bg-blue-gradient" },
    { name: "green", className: "bg-green-gradient" },
    { name: "orange", className: "bg-orange-gradient" },
    { name: "red", className: "bg-red-gradient" },
  ];
  const theme = useCurrentColor();
  const toggleTheme = () => {
    setThemeType(themeType === "light" ? "dark" : "light");
  };

  const toggleMiniSidebar = () => {
    toggleOpen();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className={classNames(
          "w-[360px]  border-transparent",
          theme.drawColor
        )}
      >
        <SheetHeader className="pb-2">
          <SheetTitle className={theme.text}>Settings</SheetTitle>
          <SheetDescription className={theme.text}>
            Customize your application settings here.
          </SheetDescription>
          <div className="w-full h-[1px] bg-border-gradient"></div>
        </SheetHeader>

        {/* Sidenav Colors */}
        <div className="py-5">
          <div className="mb-8">
            <h3 className={classNames("mb-2 font-semibold ", theme.text)}>
              Sidenav Colors
            </h3>
            <div className="flex gap-2.5">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-6 h-6 rounded-full  ${color.className} ${
                    sidenavColor === color.className ? "ring-2 ring-white" : ""
                  }`}
                  onClick={() => setSidenavColor(color.className)}
                ></button>
              ))}
            </div>
          </div>

          {/* Sidenav Type */}
          <div>
            <h3 className={classNames("font-semibold ", theme.text)}>
              Sidenav Type
            </h3>
            <p className={classNames("text-sm",theme.text)}>Choose between 2 different sidenav types.</p>
            <div className="flex mt-3 gap-2">
              <button
                onClick={() => setSideNavType("white")}
                className={classNames(
                  "h-[42px] border border-header w-full rounded-[8px] font-semibold",
                  sideNavType === "white"
                    ? "bg-header text-white"
                    : "text-header"
                )}
              >
                White
              </button>
              <button
                onClick={() => setSideNavType("dark")}
                className={classNames(
                  "h-[42px] border border-header w-full rounded-[8px] font-semibold",
                  sideNavType === "dark"
                    ? "bg-header text-white"
                    : "text-header"
                )}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Sidenav Mini Toggle */}
          <div className="py-5">
            <div className="flex items-center justify-between mb-3">
              <h3
                className={
                  (classNames("mb-2 font-semibold  w-full"), theme.text)
                }
              >
                Sidenav Mini
              </h3>
              <Switch
                checked={!sideOpen}
                onCheckedChange={toggleMiniSidebar}
                className={classNames(
                  "data-[state=checked]:bg-header w-10",
                  theme.switch === "darkBg"
                    ? "data-[state=unchecked]:bg-darkBg"
                    : "data-[state=unchecked]:bg-input"
                )}
              />
            </div>
            <div className="h-[1px] bg-border-gradient"></div>
          </div>

          {/* Light / Dark Mode */}
          <div className="py-5">
            <div className="flex items-center justify-between mb-3">
              <h3
                className={
                  (classNames("mb-2 font-semibold  w-full"), theme.text)
                }
              >
                Light / Dark
              </h3>
              <Switch
                checked={themeType === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-header w-10"
              />
            </div>
            <div className="h-[1px] bg-border-gradient"></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;
