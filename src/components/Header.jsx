
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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

        {isAuthenticated ? (
          <>
            <Typography sx={{ mr: 2 }}>
              {user?.name} ({user?.role})
            </Typography>

            <Button component={RouterLink} to="/" color="inherit">
              Products
            </Button>

            {isAdmin && (
              <Button
                component={RouterLink}
                to="/admin/products"
                color="inherit"
              >
                Manage Products
              </Button>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>

            <Button component={RouterLink} to="/register" color="inherit">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
