import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="border p-4 m-2">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}