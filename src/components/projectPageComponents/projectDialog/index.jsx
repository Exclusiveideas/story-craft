"use client";

import "./projectDialog.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useProjectPageStore from "@/store/useProjectPageStore";
import { CircularProgress } from "@mui/material";

export default function ProjectLoadingDialog({ title, content, loading }) {
  const { loadingDialogOpen } = useProjectPageStore();

  return (
    <Dialog open={loadingDialogOpen}>
      <DialogContent className="[&>button]:hidden flex flex-col sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            <div className="dialogTitle">
            {title}
            </div>
        </DialogTitle>
        </DialogHeader>
        <div className="dialogContent">
          {loading && <CircularProgress size="15px" />}
          <p>{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
