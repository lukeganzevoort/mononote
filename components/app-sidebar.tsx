"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  NotebookPenIcon,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-1">
        <a href="/app">
          <SidebarMenuButton
            size="lg"
            className="bg-accent text-bg-accent-foreground"
          >
            <div className="grid flex-1 text-left text-sm leading-tight font-mono">
              <span className="truncate font-semibold">MONO.NOTE</span>
              <span className="truncate text-xs">Simply Private & Secure</span>
            </div>
            <div className="flex aspect-square size-6 items-center justify-center rounded-lg">
              <NotebookPenIcon className="size-6" />
            </div>
          </SidebarMenuButton>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
