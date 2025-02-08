import {
  CatalogList,
  CategoriesList,
  SubCatalogList,
} from "@/components/tab-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabHeader } from "@/data";
import { useCurrentColor } from "@/hooks";
import classNames from "classnames";

const tabList = [
  {
    value: "catalog",
    item: CatalogList,
  },
  {
    value: "subcatalog",
    item: SubCatalogList,
  },
  {
    value: "categories",
    item: CategoriesList,
  },
];
const CatalogPage = () => {
  const theme = useCurrentColor();
  return (
    <div>
      {/* tabs */}
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList
          className={classNames(
            "h-[42px] p-1 font-sans relative gap-7",
            theme.tabBg
          )}
        >
          {tabHeader.map((el) => (
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

export default CatalogPage;
