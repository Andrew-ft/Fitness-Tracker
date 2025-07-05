import * as React from "react";
import { Dumbbell, SquareTerminal, TableProperties, User } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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

// Sample data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/member/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Workouts",
      url: "/member/workout",
      icon: Dumbbell,
    },
    {
      title: "Routines",
      url: "/member/routines",
      icon: TableProperties,
    },
    {
      title: "Profile",
      url: "/member/profile",
      icon: User,
    },
  ],
};

export default function Member() {
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
                  <BreadcrumbLink href="#">Member Role</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-4">
          <h1 className="text-2xl font-bold">This is member page.</h1>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
