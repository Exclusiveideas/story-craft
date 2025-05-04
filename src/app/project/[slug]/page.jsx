"use client";
import { useEffect, useState } from "react";
import "./projectPage.css";
import { toast } from "sonner";
import { fetchProject } from "@/apiCalls/projectAPI";
import useProjectPageStore from "@/store/useProjectPageStore";
import { usePathname } from "next/navigation";
import { ProcessToasts } from "@/components/processToastStack";
import { useResearchProcess } from "@/hooks/useResearchProcess";
import ProjectLoadingDialog from "@/components/projectPageComponents/projectDialog";
import { useProcessStore } from "@/store/processStore";
import { ProjectNavbar } from "@/components/projectNavbar";
import ProjectView from "@/components/projectPageComponents/projectView";

export default function Page() {
  const pathname = usePathname(); // Get the current URL path
  const segments = pathname.split("/"); // Split the path into parts
  const projectId = segments[segments.length - 1]; // Get the last segment (projectId)

   
  const [loading, setLoading] = useState(true);
  const [loadingDialogTitle, setLoadingDialogTitle] = useState("Fetching Project");
  const [loadingDialogContent, setLoadingDialogContent] = useState("processing...");
  
  
  const { activeProject, openloadingDialog, closeloadingDialog, updateActiveProject, updateActiveProjectResearches } = useProjectPageStore();
  const { addProcess } = useProcessStore();
  const {createProjectResearchCaller, fetchProjectResearchCaller} = useResearchProcess(projectId);

  useEffect(() => {
    openloadingDialog()
    setLoading(true);
    retrieveProject();
  }, [projectId]);

  const retrieveProject = async () => {
    if (!projectId) {
      setTimeout(() => {
        toast.error("Error fetching project.", {
          description: "Project ID is required",
          style: { color: "red" },
        });
      }, 100);

      setLoadingDialogContent("An error occurred.");
      setLoading(false);
      return;
    }

    const response = await fetchProject(projectId);

    if (response?.error) {
      setTimeout(() => {
        toast.error("Error fetching project", {
          description: response?.error,
          style: { color: "red" },
        });
      }, 100);

      setTimeout(() => {
        toast.info("Reload Page", {
          style: { color: "blue" },
        });
      }, 3000);

      setLoadingDialogContent("An error occurred.");
      setLoading(false);
    } else {
      updateActiveProject(response?.project);

      // setLoadingDialogTitle(response?.project?.projectName);
      closeloadingDialog()
      const processedStatus = response?.project?.processed;
      if (processedStatus === 'true') {
        
        const fetchingProcess = {
          id: Date.now(), // Unique ID using the current timestamp
          description: "Fetching Research info",
          status: "running", // Set to running initially
        };

        addProcess(fetchingProcess); // Add the process to the store

        fetchProjectResearchCaller(fetchingProcess?.id, projectId, updateActiveProjectResearches);

      } else {
        const researchProcess = {
          id: Date.now(), // Unique ID using the current timestamp
          description: "Performing deeper reasearch on",
          status: 'running', // Set to running initially
        };

        addProcess(researchProcess); // Add the process to the store

        createProjectResearchCaller(
          researchProcess?.id,
          projectId,
          updateActiveProjectResearches,
        );
      }
    }
    
  };


  return (
    <div className="projectPage_wrapper">
      <ProjectLoadingDialog title={loadingDialogTitle} content={loadingDialogContent} loading={loading} />
      <div className="projectTitleContainer">
        <p>{activeProject?.title}</p>
      </div>
      {activeProject?.id && <ProjectView scriptStructure={activeProject?.structure} />}
      <ProcessToasts />
      <ProjectNavbar />
    </div>
  );
}
