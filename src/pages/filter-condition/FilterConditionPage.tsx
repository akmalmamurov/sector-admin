import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filterCondition } from "@/data";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";
import FilterList from "./FilterList";
import ConditionList from "./ConditionList";
import RelevanceList from "./RelevanceList";

const tabList = [
  {
    value: "filter",
    item: FilterList,
  },
  {
    value: "condition",
    item: ConditionList,
  },
  {
    value: "relevance",
    item: RelevanceList,
  },
];
const FilterConditionPage = () => {
  const theme = useCurrentColor();
  return (
    <div>
      {/* tabs */}
      <Tabs defaultValue="filter" className="w-full">
        <TabsList
          className={classNames(
            "h-[42px] p-1 font-sans relative gap-7",
            theme.tabBg
          )}
        >
          {filterCondition.map((el) => (
            <TabsTrigger
              key={el}
              className={classNames(
                "px-5 h-full text-base font-normal py-0 capitalize",
                theme.text
              )}
              value={el}
            >
              {el}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          {tabList.map((el) => (
            <TabsContent key={el.value} value={el.value} className="p-0">
              <el.item />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default FilterConditionPage;

