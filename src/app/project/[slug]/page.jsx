"use client";
import { useEffect, useState } from "react";
import "./projectPage.css";
import ProjectLoadingDialog from "@/components/projectPageComponents/projectDialog";
import { toast } from "sonner";
import { fetchProject } from "@/apiCalls/projectAPI";
import useProjectPageStore from "@/store/useProjectPageStore";
import { usePathname } from "next/navigation";
import { createProjectResearch, fetchProjectResearch } from "@/lib/utils";

export default function Page() {
  const pathname = usePathname(); // Get the current URL path
  const segments = pathname.split("/"); // Split the path into parts
  const projectId = segments[segments.length - 1]; // Get the last segment (projectId)

  
  const [loading, setLoading] = useState(true);
  const [loadingDialogTitle, setLoadingDialogTitle] = useState("Fetching Project");
  const [loadingDialogContent, setLoadingDialogContent] = useState("processing...");
  
  const { openloadingDialog, activeProjectResearches, updateActiveProject, updateActiveProjectResearches } = useProjectPageStore();

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
        })
        }, 3000);
    
      setLoadingDialogContent("An error occurred.");
      setLoading(false);
    } else {
      updateActiveProject(response?.project);
      
      setLoadingDialogTitle(response?.project?.projectName)
      if(response?.project?.processed) {
        fetchProjectResearch(projectId, updateActiveProjectResearches)
      } else {
        createProjectResearch(projectId, updateActiveProjectResearches, setLoadingDialogContent)
      }
    }
    
  };

  
  useEffect(() => {
    // load project view
  }, [activeProjectResearches]);

  return (
    <div className="projectPage_wrapper">
      <ProjectLoadingDialog title={loadingDialogTitle} content={loadingDialogContent} loading={loading} />
    </div>
  );
}
