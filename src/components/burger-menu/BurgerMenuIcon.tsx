import { ListCollapse } from "lucide-react";

const BurgerMenuIcon = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <button
      onClick={toggleOpen}
      className="flex items-center justify-center rounded-full transition ml-20"
    >
      <ListCollapse className={`${!isOpen ? "rotate-180" : ""} duration-300 ease-in-out`} />
      {/* Chevron icon */}
    </button>
  );
};

export default BurgerMenuIcon;
