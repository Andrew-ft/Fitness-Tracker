import * as React from "react";
import {
  Dumbbell,
  SquareTerminal,
  TableProperties,
  User,
  Users,
  UserCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Workouts",
      url: "/admin/workouts",
      icon: Dumbbell,
    },
    {
      title: "Routines",
      url: "/admin/routines",
      icon: TableProperties,
    },
    {
      title: "Members",
      url: "/admin/members",
      icon: Users,
    },
    {
      title: "Trainers",
      url: "/admin/trainers",
      icon: UserCheck,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: User,
    },
  ],
};

export default function Admin() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    avatar: "",
  });

  React.useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    const avatar = localStorage.getItem("avatar") || "/avatars/default.png";

    setUser({ name, email, avatar });
  }, []);
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-primary" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Admin Role</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
