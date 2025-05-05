"use client";

import useDialogStore from "@/store/useDialogStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CircularProgress from "@mui/material/CircularProgress";
import { ProjectForm } from "./ProjectForm";
import { useNewProjectForm } from "@/hooks/useNewProjectForm";
import './cNProject.css';

export default function NewProjectDialog() {
  const { isOpen } = useDialogStore();
  const {
    setField,
    selectedStyle,
    setSelectedStyle,
    isLoading,
    handleSave,
    closeProjectDialog
  } = useNewProjectForm();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="[&>button]:hidden flex flex-col sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Script Project</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        
        <ProjectForm
          setField={setField}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={closeProjectDialog}>Cancel</Button>
          <Button className="newProjectBtn" onClick={handleSave} disabled={isLoading}>
            {isLoading ? <CircularProgress color="white" size="17px" /> : "Create Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
