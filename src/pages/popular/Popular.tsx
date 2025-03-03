import classNames from "classnames";

import {
  CategoriesList,
} from "@/components/tab-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentColor, useGetBrand, useGetCatalog } from "@/hooks";
import { popularTabHeader } from "@/data";
import { useGetPopularCategory } from "@/hooks/popular-category/get-popular-category";
import { PopularCategoryList } from "@/components/tab-list/PopularCategoryList";  
import { PopularBrandList } from "@/components/tab-list/PopularBrand";
import { IPopularBrand } from "@/types";

const Popular = () => {
  const { data: catalogData = []} = useGetCatalog();
  const { data: popularCategoryData = [], isLoading: popularCategoryLoading, error: popularCategoryError } = useGetPopularCategory(true);
  const { data: popularBrandData = [], isLoading: popularBrandLoading, error: popularBrandError } = useGetBrand(true);
  const tabList = [
    {
      value: "Popular Category",
      item: (
        <PopularCategoryList
          categoriesData={popularCategoryData}
          isLoading={popularCategoryLoading}
          error={popularCategoryError as Error}
          catalogData={catalogData}
        />
      ),
    },
    {
      value: "Popular Brand",
      item: <PopularBrandList popularBrandData={popularBrandData as IPopularBrand[]} isLoading={popularBrandLoading} error={popularBrandError as Error} />,
    },
    {
      value: "Popular Product",
      item: <CategoriesList catalogData={catalogData} />,
    },
  ];
  const theme = useCurrentColor();
  return (
    <div>
      {/* tabs */}
      <Tabs defaultValue="Popular Category" className="w-full">
        <TabsList
          className={classNames(
            "h-[42px] p-1 font-sans relative gap-7",
            theme.tabBg
          )}
        >
          {popularTabHeader.map((el) => (
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
              {el.item}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Popular;
