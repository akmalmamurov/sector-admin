import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import { AdminLayout } from "@/layouts";
import ProductsPage from "@/pages/products/ProductsPage";
import CatalogPage from "@/pages/categories/CatalogPage";
import SignIn from "@/pages/sign-in/SignIn";
import useStore from "@/context/store";

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
          </Route>
          <Route path="/signin" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
