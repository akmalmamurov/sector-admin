import { Link, useLocation } from "react-router-dom";
import { Home, Settings, UserCircle } from "lucide-react";
import BurgerMenuIcon from "../burger-menu/BurgerMenuIcon";
import SettingsDrawer from "../settings/Settings";

interface Props {
  open: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar = ({ open, setOpen, isOpen, setIsOpen }: Props) => {
  const toggleOpen = () => setOpen(!open);
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center justify-between px-8 h-[75px] text-white font-montserrat">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* Home icon */}
          <Link
            to="/"
            className="flex items-center gap-1 text-white hover:text-gray-200"
          >
            <Home size={16} />
            <span className="font-semibold">Home</span>
          </Link>

          {/* Dynamic breadcrumbs */}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <span key={name} className="flex items-center gap-2">
                <span className="text-white">/</span>
                {!isLast ? (
                  <Link to={routeTo} className="hover:text-gray-200 capitalize">
                    {name.replace("-", " ")}
                  </Link>
                ) : (
                  <span className="capitalize font-semibold">
                    {name.replace("-", " ")}
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <BurgerMenuIcon isOpen={open} toggleOpen={toggleOpen} />
      </div>

      <div className="flex items-center gap-5 px-5">
        <button className="flex gap-1 items-center text-sm">
          <UserCircle className="w-5 h-5" />
          Sign in
        </button>
        <button onClick={() => setIsOpen(true)}>
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <SettingsDrawer
        open={isOpen}
        setOpen={setIsOpen}
        toggleOpen={toggleOpen}
        sideOpen={open}
      />
    </nav>
  );
};

export default Navbar;
