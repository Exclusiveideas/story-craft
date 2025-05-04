// hooks/useResearchProcess.js
import { useEffect } from "react";
import axios from "axios";
import { useProcessStore } from "@/store/processStore";
import {
  createResearchByProject,
  getResearchByProject,
} from "@/apiCalls/researchAPI";
import { toast } from "sonner";

export function useResearchProcess(projectId) {
  const { addProcess, updateProcessStatus, removeProcess } = useProcessStore();

  useEffect(() => {
    // Initialize the process and add it to the store
    const researchProcess = {
      id: Date.now(), // Unique ID using the current timestamp
      description: "Researching project...",
      status: "running", // Set to running initially
    };

    // addProcess(researchProcess); // Add the process to the store

    // Start the API request to research the project
    axios
      .post("/api/research", { projectId })
      .then((response) => {
        // On success, update process status to 'completed' and set the message
        updateProcessStatus(
          researchProcess.id,
          "completed",
          "Research successful"
        );
      })
      .catch((error) => {
        // On failure, update process status to 'completed' and set the message
        updateProcessStatus(researchProcess.id, "completed", "Research failed");
      });

    // Cleanup function if needed (e.g., for cancellation or further cleanup)
    return () => {
      // Optional: handle cleanup if necessary (e.g., cancelling the request)
    };
  }, [projectId, addProcess, updateProcessStatus]); // Re-run when projectId changes

  const createProjectResearchCaller = async (
    processId,
    projectId,
    updateActiveProjectResearches
  ) => {
    try {
      const researchCreaion = await createResearchByProject(projectId);

      if (researchCreaion?.error) {
        updateProcessStatus(processId, "failed");
        toast.error("Error performing deep research.", {
          description: researchCreaion?.error,
          style: { border: "none", color: "red" },
        });
      } else {
        updateProcessStatus(processId, "completed");

        const fetchingProcess = {
          id: Date.now(), // Unique ID using the current timestamp
          description: "Fetching Research info",
          status: "running", // Set to running initially
        };

        addProcess(fetchingProcess); // Add the process to the store

        fetchProjectResearchCaller(
          processId,
          projectId,
          updateActiveProjectResearches
        );
      }
    } catch (error) {
      toast.error("Failed to perform deep research.", {
        description: error,
        style: { border: "none", color: "red" },
      });
    }
  };

  const fetchProjectResearchCaller = async (
    processId,
    projectId,
    updateActiveProjectResearches
  ) => {
    try {
      const researchFetch = await getResearchByProject(projectId);

      if (researchFetch?.error) {
        updateProcessStatus(processId, "failed");
        toast.error("Error Fetching Researching info.", {
          description: researchFetch?.error,
          style: { border: "none", color: "red" },
        });
      } else {
        // console.log('researchFetch: ', researchFetch)
        updateProcessStatus(processId, "completed");
        updateActiveProjectResearches(researchFetch?.researches?.researchData);
      }
    } catch (error) {
      toast.error("Failed to fetch research info.", {
        description: error,
        style: { border: "none", color: "red" },
      });
    }
  };

  return {
    createProjectResearchCaller,
    fetchProjectResearchCaller,
  };
}
