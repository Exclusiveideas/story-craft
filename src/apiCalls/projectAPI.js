import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  withCredentials: true, // 🔥 Ensures cookies are sent & received
});


export async function createProject(projectData, cancelToken) {
  try {
    const response = await API.post("/project", projectData, { cancelToken });
    return { project: response.data };
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log("Request canceled:", error.message);
      return { error: "Request was canceled" };
    }
    return { error: "Failed to create project" };
  }
}



export const fetchProject = async (projectID) => {
    
  try {
    const response = await API.get(`/project/one/${projectID}`);

    return { project: response.data };
  } catch (err) {
    return {
      error: err?.response?.data?.error || err?.message || "Problem fetching project - Try again.",
    };
  }
};
