"use client";

import { BookType, Home, LogOut } from "lucide-react";

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
import useDashboardStore from "@/store/useDashboardStore";
import { useHydrationZustand } from "@codebayu/use-hydration-zustand";
import { useEffect } from "react";
import Image from "next/image";

// Menu items.
const navHeader = [
  {
    title: "My Library",
    url: "/dashboard",
    icon: Home,
  },
];

export function AppSidebar() {
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const { openDialog } = useDialogStore();
  const { userProjects } = useDashboardStore();

  const isHydrated = useHydrationZustand(useAuthStore);

  const logOut = () => {
    updateUser(null);
    logOutUser();
    router.push("/auth");
  };

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/auth");
    }
  }, [user, isHydrated]);

  return (
    <Sidebar className="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-max">
            <div className="userInfo_box">
              <div className="userLetter">
                <Image
                  src={user?.avatar_url || 'https://api.dicebear.com/7.x/identicon/svg?seed=mufutau'}
                  width={50}
                  height={50}
                  alt="user avatar"
                  className="userAvatar"
                />
              </div>
              <div className="userInfo_subContainer">
                <p className="user_name">{user?.user_name}</p>
                <p className="user_email">{user?.email}</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="sidebar_menu">
              {navHeader.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton className="navBtn" asChild>
                    <a href={item.url} className="sideBarItem">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {userProjects?.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton className="navBtn" asChild>
                    <a href={`/project/${item?.id}`} className="sideBarItem">
                      <BookType />
                      <span>{item?.projectName}</span>
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
