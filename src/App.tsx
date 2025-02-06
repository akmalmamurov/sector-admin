import HomePage from "@/pages/home/HomePage";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/layouts";
import CategoriesPage from "@/pages/categories/CategoriesPage";
import ProductsPage from "@/pages/products/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
