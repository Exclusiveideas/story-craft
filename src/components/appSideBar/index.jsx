"use client";

import { Home, Kanban, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import "./appSideBar.css";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/apiCalls/authAPI";

// Menu items.
const navHeader = [
  {
    title: "My Library",
    url: "/dashboard",
    icon: Home,
  },
];

const navProjects = [
  {
    title: "Project One",
    url: "/project/project-id",
    icon: Kanban,
  },
  {
    title: "Project Two",
    url: "/project/project-id",
    icon: Kanban,
  },
  {
    title: "Project Three",
    url: "/project/project-id",
    icon: Kanban,
  },
];

export function AppSidebar() {
  const updateUser = useAuthStore((state) => state.updateUser);
  const router = useRouter();

  const logOut = () => {
    updateUser(null);
    logOutUser();
    router.push("/auth");
  };

  return (
    <Sidebar className="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-max">
            <div className="userInfo_box">
              <div className="userLetter">M</div>
              <div className="userInfo_subContainer">
                <p className="user_name">Muftau</p>
                <p className="user_email">muftau201@gmail.com</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="sidebar_menu">
              {navHeader.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="sideBarItem">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {navProjects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="sideBarItem">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <div className="createNewProject">
            <p>Create new project</p>
          </div>
          <SidebarMenuItem onClick={logOut}>
            <SidebarMenuButton className="logOutBar">
              <LogOut /> <span className="logOutTxt">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
