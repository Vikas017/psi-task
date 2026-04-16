import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import API from "../services/api";
import { getUser } from "../utils/auth";

export default function TaskCard({ task, refreshTasks }) {
  const user = getUser();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate?.split("T")[0] || "",
  });

  const [newDocs, setNewDocs] = useState([]);
  const [removeDocs, setRemoveDocs] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🗑️ REMOVE NEW FILE (before upload)
  const handleRemoveNewFile = (index) => {
    const updated = newDocs.filter((_, i) => i !== index);
    setNewDocs(updated);
  };

  // 🗑️ TOGGLE REMOVE EXISTING FILE
  const toggleRemoveDoc = (doc) => {
    if (removeDocs.includes(doc)) {
      setRemoveDocs(removeDocs.filter((d) => d !== doc));
    } else {
      setRemoveDocs([...removeDocs, doc]);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setLoading(true);
      await API.delete(`/tasks/${task._id}`);
      refreshTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (user.role !== "admin") {
        await API.put(`/tasks/${task._id}`, { status: form.status });
      } else {
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        newDocs.forEach((file) => {
          formData.append("documents", file);
        });

        formData.append("removeDocs", JSON.stringify(removeDocs));

        await API.put(`/tasks/${task._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      refreshTasks();
      setOpen(false);
      setNewDocs([]);
      setRemoveDocs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <Card sx={{ mb: 2, cursor: "pointer", position: "relative" }} onClick={() => setOpen(true)}>
        <CardContent>

          {user.role === "admin" && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}

          <Typography variant="h6">{task.title}</Typography>
          <Typography>{task.description}</Typography>
          <Typography>Status: {task.status}</Typography>

          {/* VIEW DOCS */}
          {task.documents?.length > 0 && (
            <Box mt={1}>
              {task.documents.map((doc, i) => (
                <Button
                  key={i}
                  size="small"
                  href={`http://localhost:5000/${doc}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Doc {i + 1}
                </Button>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Update Task</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            disabled={user.role !== "admin"}
          />

          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            disabled={user.role !== "admin"}
          />

          <TextField
            select
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <TextField
            select
            name="priority"
            label="Priority"
            value={form.priority}
            onChange={handleChange}
            disabled={user.role !== "admin"}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <TextField
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true } }}
            disabled={user.role !== "admin"}
          />

          {/* 📂 ADD NEW FILES */}
          {user.role === "admin" && (
            <Button variant="outlined" component="label">
              Upload PDFs
              <input
                hidden
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) => setNewDocs(Array.from(e.target.files))}
              />
            </Button>
          )}

          {/*   NEW FILE PREVIEW */}
          {newDocs.map((file, i) => (
            <Box key={i}  sx={{
            display: "flex",
             justifyContent: "space-between"
          }}>
              <Typography>{file.name}</Typography>
              <IconButton sx={{color : "red"}} onClick={() => handleRemoveNewFile(i)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}

          {/*   EXISTING FILES */}
          {task.documents?.map((doc, i) => (
            <Box key={i} display="flex" justifyContent="space-between">
              <a href={`http://localhost:5000/${doc}`} target="_blank">
                Doc {i + 1}
              </a>

              {user.role === "admin" && (
                <Button
                  color={removeDocs.includes(doc) ? "success" : "error"}
                  onClick={() => toggleRemoveDoc(doc)}
                >
                  {removeDocs.includes(doc) ? "Undo" : "Remove"}
                </Button>
              )}
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleUpdate} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}