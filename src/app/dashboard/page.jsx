"use client";

import { AppSidebar } from "@/components/appSideBar";
import "./dashboard.css";
import { PanelRightOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import DashboardProject from "@/components/dashboardComponents/dashboardProject";
import SpinnerLoader from "@/components/cssLoader";
import NewProjectDialogue from "@/components/dashboardComponents/createNewProject";
import useDialogStore from "@/store/useDialogStore";
import { useDashboardData } from "@/hooks/useDashboardData";
import Image from "next/image";


const Dashboard = () => {
  const { toggleSidebar } = useSidebar();
  const { openDialog } = useDialogStore();

  const { searchData, setSearchData, loading, filteredProjects } =
    useDashboardData();

  return (
    <div className="dashboard_wrapper">
      <AppSidebar />
      <div className="page_content">
        <div className="pageTop">
          <div onClick={toggleSidebar} className="sideBar_trigger">
            <PanelRightOpen className="panelBtn" />
          </div>
          <div className="projectSearchContainer">
            <input
              type="text"
              name="search text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="searchInput"
              placeholder="search for projects by name or tags"
            />
          </div>
        </div>
        <div className="dashboard_content">
          <div className="contentHeader">
            <h1>All Projects</h1>
            <div onClick={openDialog} className="createNewProjectBtn">
              Create New Project
            </div>
          </div>
          {loading ? (
            <div className="noProjectsWrapper">
              <SpinnerLoader />
            </div>
          ) : (
            <>
              {filteredProjects[0] ? (
                <div className="projects_wrapper">
                  {filteredProjects?.map((project, i) => (
                    <DashboardProject key={i} projectInfo={project} />
                  ))}
                </div>
              ) : (
                <div className="noProjectsWrapper">
                  <Image
                    src={`/images/empty-box.png`}
                    width={400}
                    height={400}
                    alt="empty box"
                    className="noProjectImg"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <NewProjectDialogue />
    </div>
  );
};

export default Dashboard;
