import classNames from "classnames";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentColor, useGetBrand, useGetCatalog } from "@/hooks";
import { popularTabHeader } from "@/data";
import { useGetPopularCategory } from "@/hooks/popular-category/get-popular-category";
import { PopularCategoryList } from "@/components/tab-list/PopularCategoryList";  
import { PopularBrandList } from "@/components/tab-list/PopularBrand";
import { IPopularBrand, PopularProduct } from "@/types";
import { useGetPopularProducts } from "@/hooks/product/get-popular-products";
import { PopularProductList } from "@/components/tab-list/PopularProductList";
import { ProductRecommendationList } from "@/components/tab-list/ProductRecommendationList";
const Popular = () => {
  const { data: catalogData = []} = useGetCatalog();
  const { data: popularCategoryData = [], isLoading: popularCategoryLoading, error: popularCategoryError } = useGetPopularCategory(true);
  const { data: popularBrandData = {data: {brands: [], total: 0, limitNumber: 0, pageNumber: 0}, error: null, status: 200}, isLoading: popularBrandLoading, error: popularBrandError } = useGetBrand({popular: true});
  const { data: popularProductData = [], isLoading: popularProductLoading, error: popularProductError } = useGetPopularProducts({popular: true});
  const { data: productRecommendationData = [], isLoading: productRecommendationLoading, error: productRecommendationError } = useGetPopularProducts({recommended: true});
  
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
      item: <PopularBrandList popularBrandData={popularBrandData.data.brands as IPopularBrand[]} isLoading={popularBrandLoading} error={popularBrandError as Error} />,
    },
    {
      value: "Popular Product",
      item: <PopularProductList popularProductData={popularProductData as PopularProduct[]} isLoading={popularProductLoading} error={popularProductError as Error} />,
    },
    {
      value: "Product Recommendation",
      item: <ProductRecommendationList productRecommendationData={productRecommendationData as PopularProduct[]} isLoading={productRecommendationLoading} error={productRecommendationError as Error} />,
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
