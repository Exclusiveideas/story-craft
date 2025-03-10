"use client";
import { useEffect, useState } from "react";
import "./projectPage.css";
import ProjectLoadingDialog from "@/components/projectPageComponents/projectDialog";
import { toast } from "sonner";
import { fetchProject } from "@/apiCalls/projectAPI";
import useProjectPageStore from "@/store/useProjectPageStore";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname(); // Get the current URL path
  const segments = pathname.split("/"); // Split the path into parts
  const projectId = segments[segments.length - 1]; // Get the last segment (projectId)

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDialogTitle, setLoadingDialogTitle] = useState("Fetching Project");
  const [loadingDialogContent, setLoadingDialogContent] = useState("processing...");
  
  const { openloadingDialog, activeProject, updateActiveProject } = useProjectPageStore();

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
        toast.error("Error fetching project.", {
          description: response?.error,
          style: { color: "red" },
        });
      }, 100);

      setLoadingDialogContent("An error occurred.");
    } else {
      updateActiveProject(response?.project)
    }
  };
  
  useEffect(() => {
    if(!activeProject) {
      return
    }
    if(!activeProject?.processed) {
      processActiveProject()
    } else {
      displayProject();
    }
  }, [activeProject]);

  const processActiveProject = () => {
    setLoadingDialogTitle(`Processing ${activeProject?.projectName}`)
    setLoadingDialogContent("Researching script")
    // setLoadingDialogContent("Structuring script")
    // setLoadingDialogContent("Linking structure and research")
    // setLoadingDialogContent("Loading project view")
  }

  const displayProject = () => {
    setLoadingDialogTitle(activeProject?.projectName)
    setLoadingDialogContent("Loading project view")
  }

  return (
    <div className="projectPage_wrapper">
      <ProjectLoadingDialog title={loadingDialogTitle} content={loadingDialogContent} loading={loading} />
    </div>
  );
}
