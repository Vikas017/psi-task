import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Link
} from "@mui/material";
import API from "../services/api";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      await API.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      alert("Registration failed");
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
        bgcolor="white"
      >
        {/* TITLE */}
        <Typography variant="h4" textAlign="center" mb={2}>
          Register
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

        {/* LOGIN LINK */}
        <Typography textAlign="center">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            color="inherit"
            sx={{
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" }
            }}
          >
            Login
          </Link>
        </Typography>

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>
    </Container>
  );
}