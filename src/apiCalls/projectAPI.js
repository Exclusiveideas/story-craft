import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  withCredentials: true, // 🔥 Ensures cookies are sent & received
});

export const createProject = async (projectDetails) => {
    
  try {
    const response = await API.post(`/project/`, projectDetails);

    return { project: response.data?.project };
  } catch (err) {
    return {
      error: err?.response?.data?.error || err?.message || "Problem creating project - Try again.",
    };
  }
};