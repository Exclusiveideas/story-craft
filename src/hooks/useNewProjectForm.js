import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useDialogStore from "@/store/useDialogStore";
import { createProject } from "@/apiCalls/projectAPI";
import { testNewProjectErrors } from "@/lib/utils";
import axios from "axios";

export function useNewProjectForm() {
  const { isOpen, closeDialog, isLoading, updateIsLoading } = useDialogStore();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);

  const cancelTokenRef = useRef(null); // Store Axios cancel token

  const handleSave = async () => {
    updateIsLoading(true);

    const validationError = testNewProjectErrors({
      projectName,
      scriptTitle,
      storytellingStyle: selectedStyle?.label,
      description,
    });

    if (validationError) {
      updateIsLoading(false);
      return toast.error(validationError);
    }

    // Create an Axios cancel token
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const newProject = await createProject(
        {
          projectName,
          scriptTitle,
          storytellingStyle: selectedStyle?.label,
          tags: tags.split(",").map((tag) => tag.trim()),
          description,
        },
        cancelTokenRef.current.token // Pass cancel token
      );

      if (newProject?.error) {
        toast.error("Error creating project.", {
          description: newProject?.error,
          style: { border: "none", color: "red" },
        });
      } else {
        toast.success("Project is created", {
          description: "Preparing research data",
          style: { border: "none", color: "green" },
        });

        closeProjectDialog();
        router.push(`/project/${newProject?.project?.id}`);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Project creation request canceled.");
      } else {
        toast.error("Failed to create project.");
      }
    }

    updateIsLoading(false);
  };

  const closeProjectDialog = () => {
    // Cancel any ongoing request
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Project creation request canceled.");
    }

    // Reset form state
    resetForm()
    closeDialog();
  };

  const resetForm = () => {
    setProjectName("");
    setScriptTitle("");
    setTags("");
    setDescription("");
    setSelectedStyle(null);
    updateIsLoading(false);
  }

  const setField = (type, value) => {
    switch (type) {
      case "projectName":
        setProjectName(value);
        break;
      case "scriptTitle":
        setScriptTitle(value);
        break;
      case "tags":
        setTags(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  };

  return {
    isOpen,
    isLoading,
    selectedStyle,
    setField,
    setSelectedStyle,
    handleSave,
    closeProjectDialog,
  };
}
