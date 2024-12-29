import {
  ChartScatter,
  Users,
  UserPlus,
  MessageSquare,
  Home,
  Info,
  Settings,
  LogOut,
  Network,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { logout } from "@/auth";

// Application menu items.
const applicationItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Social Graph",
    url: "/graph",
    icon: ChartScatter,
  },
  {
    title: "Network Evolution",
    url: "/networkEvolution",
    icon: Network,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];

// Social menu items.
const socialItems = [
  {
    title: "Friends",
    url: "/friends",
    icon: Users,
  },
  {
    title: "Add Friends",
    url: "/add-friends",
    icon: UserPlus,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
];

// User menu items.
const userItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <SidebarHeader className="text-lg font-semibold p-4 text-muted-foreground">
          NetWiz
        </SidebarHeader>
        <SidebarSeparator />

        {/* Sidebar Content */}
        <SidebarContent className="flex-grow p-2 space-y-6">
          {/* Application Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {applicationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Social Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Social</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {socialItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* User Group */}
          <SidebarGroup>
            <SidebarGroupLabel>User</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />

        {/* Sidebar Footer */}
        <SidebarFooter className="text-center text-xs text-muted-foreground p-2">
          © 2024 NetWiz
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
