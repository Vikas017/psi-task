import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";

// Icons
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const user = getUser();

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Admin Create Task */}
        {user?.role === "admin" && (
          <IconButton
            component={Link}
            to="/create"
            sx={{ color: "white" }}
          >
            <AddIcon />
          </IconButton>
        )}

        {/* Logout */}
        <IconButton
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          sx={{ color: "white" }}
        >
          <LogoutIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}