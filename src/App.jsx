
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import api from "./api/axios";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(
        response.data.data.map((product) => ({
          ...product,
          category: product.category?.name || "",
        }))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load categories.");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [isAuthenticated, fetchProducts]);

  const handleAddProduct = async (newProduct) => {
    try {
      const formData = new FormData();

      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category_id", Number(newProduct.category));

      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      await api.post("/products", formData);
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
      throw err;
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const formData = new FormData();

      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("category_id", Number(updatedProduct.category));
      formData.append("_method", "PUT");

      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }

      await api.post(`/products/${id}`, formData);
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product.");
      throw err;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
      throw err;
    }
  };

  return (
    <MainLayout>
      {error && <p role="alert">{error}</p>}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <ProductListPage
                products={products}
                categories={categories}
                loading={loading}
                onAdd={handleAddProduct}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                isAdmin={false}
              />
            }
          />

          <Route
            path="/products/:id"
            element={<ProductDetailsPage products={products} />}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/products"
            element={
              <ProductListPage
                products={products}
                categories={categories}
                loading={loading}
                onAdd={handleAddProduct}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                isAdmin={isAdmin}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}
