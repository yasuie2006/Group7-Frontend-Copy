
import { useState } from "react";
import {
  Alert,
  Button,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductCard from "../components/ProductCard";
import ProductFormDialog from "../components/ProductFormDialog";
import DeleteProductDialog from "../components/DeleteProductDialog";

export default function ProductListPage({
  products,
  categories,
  loading,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        await onUpdate(editingProduct.id, formData);
        setMessage("Product updated successfully!");
      } else {
        await onAdd(formData);
        setMessage("Product added successfully!");
      }

      setFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      await onDelete(deletingProduct.id);
      setMessage("Product deleted successfully!");
      setDeletingProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "28px",
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Product Catalog
          </Typography>

          <Typography color="text.secondary">
            Browse and manage your campus essentials.
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Product
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Loading products...
          </Typography>
        </div>
      ) : products.length === 0 ? (
        <Alert severity="info">
          No products yet. Click Add Product to get started.
        </Alert>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditClick}
              onDelete={setDeletingProduct}
            />
          ))}
        </div>
      )}

      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
      />

      <DeleteProductDialog
        open={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
