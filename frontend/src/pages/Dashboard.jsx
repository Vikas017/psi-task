import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Tasks</Typography>

        {loading ? (
          <Box textAlign="center"><CircularProgress /></Box>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} refreshTasks={fetchTasks} />
          ))
        )}
      </Container>
    </>
  );
}