import HomePage from "@/pages/home/HomePage";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/layouts";
import ProductsPage from "@/pages/products/ProductsPage";
import CatalogPage from "@/pages/categories/CatalogPage";
import SignIn from "@/pages/sign-in/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
