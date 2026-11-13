
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 800,
            flexGrow: 1,
          }}
        >
          Campus Store
        </Typography>

        <Button component={RouterLink} to="/" color="inherit">
          Products
        </Button>
      </Toolbar>
    </AppBar>
  );
}
