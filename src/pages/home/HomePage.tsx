import { useCurrentColor } from "@/hooks";
import classNames from "classnames";

const HomePage = () => {
  const theme = useCurrentColor();
  return (
    <div className={classNames("py-20",theme.sidebar)}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
        exercitationem tempora error blanditiis fugit molestias, explicabo
        impedit deserunt quaerat eaque nam ipsum reprehenderit velit quod dicta
        in ullam laudantium ad?
      </p>
    </div>
  );
};

export default HomePage;
