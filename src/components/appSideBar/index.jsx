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
import useDialogStore from "@/store/useDialogStore";

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
    url: "/project/5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
    icon: Kanban,
  },
  {
    title: "Project Two",
    url: "/project/5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
    icon: Kanban,
  },
  {
    title: "Project Three",
    url: "/project/5b3f59b3-b437-492a-a9b8-6b25ff3f1034",
    icon: Kanban,
  },
];

export function AppSidebar() {
  const updateUser = useAuthStore((state) => state.updateUser);
  const router = useRouter();

  const { openDialog } = useDialogStore();

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
          <div onClick={openDialog} className="createNewProject">
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
