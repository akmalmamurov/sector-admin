import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import { AdminLayout } from "@/layouts";
import ProductsPage from "@/pages/products/ProductsPage";
import CatalogPage from "@/pages/categories/CatalogPage";
import SignIn from "@/pages/sign-in/SignIn";
import useStore from "@/context/store";
import UsersPage from "@/pages/user/UsersPage";
import BrandPage from "./pages/brand/BrandPage";
import FilterPage from "./pages/filter-condition/FilterConditionPage";
import BannerPage from "./pages/banner/BannerPage";
import Popular from "./pages/popular/Popular";
import Remark from "./pages/remark/Remark";
import Garantee from "./pages/garantee/Garantee";
import Promotion from "./pages/promotion/Promotion";
import News from "./pages/news/News";
import Order from "./pages/orders/Order";
function App() {
  const { auth } = useStore();

  return (
    <Routes>
      {!auth ? (
        <>
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/banner" element={<BannerPage />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/remark" element={<Remark />} />
            <Route path="/garantee" element={<Garantee />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/news" element={<News />} />
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path="/signin" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
