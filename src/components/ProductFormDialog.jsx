import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  image: null,
};

export default function ProductFormDialog({
  open,
  product,
  categories = [],
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: String(product.price ?? ""),
        category: String(product.category_id ?? ""),
        image: null,
      });

      setPreview(product.image || "");
    } else {
      setForm(emptyForm);
      setPreview("");
    }

    setErrors({});
  }, [product, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        image: "Please select an image file.",
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        image: "Image must not exceed 2 MB.",
      }));
      return;
    }

    setForm((current) => ({
      ...current,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));

    setErrors((current) => ({
      ...current,
      image: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const trimmedName = form.name.trim();
    const price = Number(form.price);

    if (!trimmedName) {
      nextErrors.name = "Product name is required";
    }

    if (
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      nextErrors.price = "Enter a valid price";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      name: trimmedName,
      price,
      category: form.category,
      image: form.image,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {product ? "Edit Product" : "Add New Product"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "grid", gap: 2, pt: "12px !important" }}
        >
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
            fullWidth
          />

          <TextField
            label="Price (₱)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            slotProps={{
  htmlInput: {
    min: 0,
    step: "0.01",
  },
}}
            required
            fullWidth
          />

          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            error={Boolean(errors.category)}
            helperText={errors.category}
            required
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <Box>
            <Button variant="outlined" component="label">
              Choose Product Image
              <input
                hidden
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />
            </Button>

            {errors.image && (
              <Typography color="error" variant="caption" display="block">
                {errors.image}
              </Typography>
            )}

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Product preview"
                sx={{
                  mt: 2,
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}