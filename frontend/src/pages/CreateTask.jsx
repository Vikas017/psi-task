import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Container,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    documents: []
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //   FILE SELECT
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + form.documents.length > 3) {
      return alert("Max 3 files allowed");
    }

    setForm({
      ...form,
      documents: [...form.documents, ...files]
    });
  };

  //   REMOVE FILE
  const handleRemoveFile = (index) => {
    const updated = form.documents.filter((_, i) => i !== index);
    setForm({ ...form, documents: updated });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "documents") {
          formData.append(key, form[key]);
        }
      });

      form.documents.forEach((file) => {
        formData.append("documents", file);
      });

      await API.post("/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Task Created");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Error creating task");
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
        bgcolor="white"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {/* BACK BUTTON + TITLE */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5">Create Task</Typography>
        </Box>

        {/* TITLE */}
        <TextField
          name="title"
          label="Title"
          fullWidth
          onChange={handleChange}
        />

        {/* STATUS */}
        <TextField
          select
          name="status"
          label="Status"
          value={form.status}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        {/* PRIORITY */}
        <TextField
          select
          name="priority"
          label="Priority"
          value={form.priority}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        {/* DATE */}
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          fullWidth
          value={form.dueDate}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          onChange={handleChange}
        />

        {/* USER DROPDOWN */}
        <TextField
          select
          name="assignedTo"
          label="Assign User"
          value={form.assignedTo}
          fullWidth
          onChange={handleChange}
        >
          {usersLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {" "}
                {user.email}{" "}
              </MenuItem>
            ))
          )}
        </TextField>

        {/*   UPLOAD */}
        <Button variant="outlined" component="label">
          Upload PDFs
          <input hidden type="file" multiple accept="application/pdf" onChange={handleFileChange} />
        </Button>

        {/*   PREVIEW */}
        {form.documents.map((file, i) => (
          <Box key={i} sx={{
            display: "flex",
             justifyContent: "space-between"
          }}>
            <Typography>{file.name}</Typography>
            <IconButton sx={{color : "red"}} onClick={() => handleRemoveFile(i)}>
              <CloseIcon/>
            </IconButton>
          </Box>
        ))}

      

        {/* DESCRIPTION */}
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} /> : "Create Task"}
        </Button>
      </Box>
    </Container>
  );
}
