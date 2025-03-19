import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { createResearchByProject, getResearchByProject } from "@/apiCalls/researchAPI";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function testNewProjectErrors(formData) {
  if (!formData?.projectName) {
    return "Project name is required.";
  } else if (!formData?.scriptTitle) {
    return "Accurate script title is required.";
  } else if (!formData?.storytellingStyle) {
    return "Must select a storytelling style.";
  } else if (!formData?.description) {
    return "Please provide a brief description of the script.";
  } else {
    return null;
  }
}


export async function fetchProjectResearch(
  projectId,
  updateActiveProjectResearches
) {
  try {
    const response = await getResearchByProject(projectId);
    if (response?.error) {
      throw new Error(response?.error);
    } else {
      updateActiveProjectResearches(response?.researches);
    }
  } catch (error) {
    console.error("Error fetching research:", error);
    toast.error("Error fetching research - reload page", {
      description: error.message || "Unknown error",
      style: { color: "red" },
    });
  }
}


export async function createProjectResearch(
  projectId,
  updateActiveProjectResearches,
  setLoadingDialogContent
) {
  try {
    setLoadingDialogContent("Researching Script");

    // Create project research
    const response = await createResearchByProject(projectId);
    if (response?.error) {
      throw new Error(response?.error);
    }

    // Fetch updated project research
    await fetchProjectResearch(projectId, updateActiveProjectResearches);
    
    setLoadingDialogContent('Loading view'); // Clear loading dialog after success
    toast.success("Loading view", {
    });
  } catch (error) {
    console.error("Error creating research:", error);
    toast.error("Error researching - reload page", {
      description: error.message || "Unknown error",
      style: { color: "red" },
    });
    setLoadingDialogContent("An error occurred.");
  }
}
