import axios from "axios";
import { API_BASE } from "../constants";

const http = axios.create({ baseURL: API_BASE, withCredentials: true });

// ---- User ----
export const getUser = () => http.get("/user/getuser");
export const loginUser = (payload) =>
  http.post("/user/login", payload, { headers: { "Content-Type": "application/json" } });
export const registerUser = (payload) =>
  http.post("/user/register", payload, { headers: { "Content-Type": "application/json" } });
export const logoutUser = () => http.get("/user/logout");

// ---- Jobs ----
export const getAllJobs = () => http.get("/job/getall");
export const getJobById = (id) => http.get(`/job/${id}`);
export const getMyJobs = () => http.get("/job/getmyjobs");
export const postJob = (payload) =>
  http.post("/job/post", payload, { headers: { "Content-Type": "application/json" } });
export const updateJob = (id, payload) => http.put(`/job/update/${id}`, payload);
export const deleteJob = (id) => http.delete(`/job/delete/${id}`);

// ---- Applications ----
export const getEmployerApplications = () => http.get("/application/employer/getall");
export const getJobSeekerApplications = () => http.get("/application/jobseeker/getall");
export const postApplication = (formData) =>
  http.post("/application/post", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteApplication = (id) => http.delete(`/application/delete/${id}`);
