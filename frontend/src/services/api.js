import axios from "axios";

const API = axios.create({
  baseURL: "https://psi-task-backend.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;