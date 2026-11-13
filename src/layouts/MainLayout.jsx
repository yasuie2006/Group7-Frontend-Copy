
import { Box, Container } from "@mui/material";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />

      <Container
        component="main"
        maxWidth={false}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
