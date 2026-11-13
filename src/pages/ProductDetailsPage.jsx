
import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(price));

export default function ProductDetailsPage({ products }) {
  const { id } = useParams();
  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h5">
          Product not found
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Products
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
      >
        Back to Products
      </Button>

      <Paper
        elevation={0}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 4,
          p: { xs: 2, md: 4 },
          borderRadius: 3,
        }}
      >
        <img
          src={
            product.image ||
            "https://placehold.co/600x400?text=Product"
          }
          alt={product.name}
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <Stack spacing={2}>
          <Typography variant="h4">
            {product.name}
          </Typography>

          <Chip
            label={product.category || "Uncategorized"}
            sx={{ alignSelf: "flex-start" }}
          />

          <Typography
            variant="h5"
            color="primary"
          >
            {formatPrice(product.price)}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            {product.description ||
              "No description available for this product."}
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
