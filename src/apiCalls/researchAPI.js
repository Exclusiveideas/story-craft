import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  withCredentials: true, // 🔥 Ensures cookies are sent & received
});


export const createResearchByProject = async (projectId) => {
    
    try {
      const response = await API.post(`/sectionResearch/`, {
        projectId
      });
  
      return { researches: response.data };
    } catch (err) {
      return {
        error: err?.response?.data?.error || err?.message || "Problem fetching project - Try again.",
      };
    }
  };

export const getResearchByProject = async (projectID) => {
    
    try {
      const response = await API.get(`/sectionResearch/${projectID}`);
  
      return { researches: response.data };
    } catch (err) {
      return {
        error: err?.response?.data?.error || err?.message || "Problem fetching project - Try again.",
      };
    }
  };