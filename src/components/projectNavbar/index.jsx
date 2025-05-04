"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import "./projectNavbar.css";
import Link from "next/link";
import useDialogStore from "@/store/useDialogStore";
import NewProjectDialogue from "@/components/dashboardComponents/createNewProject";

export function ProjectNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { openDialog } = useDialogStore();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="projectNavbar"
    >
      <div className="projectNavbarHeader flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Options</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="collapseBtn w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <Link href="/dashboard">
          <div className="navItems rounded-md px-4 py-3 font-mono text-sm">
            Back to dashboard
          </div>
        </Link>
        <div onClick={openDialog} className="navItems rounded-md px-4 py-3 font-mono text-sm">
          New project
        </div>
      </CollapsibleContent>
      <NewProjectDialogue />
    </Collapsible>
  );
}
