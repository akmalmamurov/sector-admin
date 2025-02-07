import {
  CatalogList,
  CategoriesList,
  SubCatalogList,
} from "@/components/tab-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabHeader } from "@/data";

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
  return (
    <div>
      {/* tabs */}
      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="h-[42px] p-1 font-sans relative">
          {tabHeader.map((el) => (
            <TabsTrigger
              key={el}
              className="px-5 h-full text-textColor text-base font-normal py-0 capitalize
                data-[state=active]:text-textColor"
              value={el}
            >
              {el}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-10">
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
