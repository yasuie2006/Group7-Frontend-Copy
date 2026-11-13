
import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "50vh", textAlign: "center" }}
    >
      <Typography variant="h3" color="primary">
        404
      </Typography>

      <Typography variant="h5">
        Page Not Found
      </Typography>

      <Typography color="text.secondary">
        Sorry, the page you are looking for does not exist.
      </Typography>

      <Button
        component={RouterLink}
        to="/"
        variant="contained"
      >
        Back to Products
      </Button>
    </Stack>
  );
}
