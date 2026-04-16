import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import API from "../services/api";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        width="100%"
        p={4}
        borderRadius={3}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {/* TITLE */}
        <Typography variant="h4" textAlign="center" mb={2}>
          Login
        </Typography>

        {/* EMAIL */}
        <TextField
          label="Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REGISTER LINK */}
        <Typography textAlign="center">
          No account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="inherit"
            sx={{ fontWeight: 500 }}
          >
            Register
          </Link>
        </Typography>

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
}
