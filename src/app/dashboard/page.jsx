"use client"

import { AppSidebar } from "@/components/appSideBar";
import "./dashboard.css";
import { PanelRightOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const Dashboard = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="dashboard_wrapper">
      <AppSidebar />
      <div className="page_content">
        <div className="pageTop">
          <div onClick={toggleSidebar} className="sideBar_trigger">
            <PanelRightOpen className="panelBtn" />
          </div>
        </div>
        <div className="dashboard_content">
          <div className="projects_wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
