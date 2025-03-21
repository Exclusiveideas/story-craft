"use client";

import { AppSidebar } from "@/components/appSideBar";
import "./dashboard.css";
import { FolderX, PanelRightOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import DashboardProject from "@/components/dashboardComponents/dashboardProject";
import SpinnerLoader from "@/components/cssLoader";
import NewProjectDialogue from "@/components/dashboardComponents/createNewProject";
import useDialogStore from "@/store/useDialogStore";

const projects = [
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three", "mufu"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5df5d667-9530-46c9-abd8-0ae947106877",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
  {
    title: "How to be a superhero in 12 seconds",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicingswwe ww wef wfw f w ewf",
    style: "Listicle format",
    tags: ["one", "two", "three"],
    uuid: "5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
  },
];

const Dashboard = () => {
  const { toggleSidebar } = useSidebar();
  const [searchData, setSearchData] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const { openDialog } = useDialogStore();

  useEffect(() => {
    // Simulate API call with timeout
    setLoading(true);
    setTimeout(() => {
      setFilteredProjects(projects);
      setLoading(false);
    }, 1000); // Simulating a 1-second delay
  }, []);

  useEffect(() => {
    if (!searchData.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchData.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchData.toLowerCase())
        )
    );

    setFilteredProjects(filtered);
  }, [searchData]);

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
            <div onClick={openDialog} className="createNewProjectBtn">Create New Project</div>
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
                  <FolderX />
                  <p>No Projects</p>
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
