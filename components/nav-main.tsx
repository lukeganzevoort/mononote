"use client";

import {
  ChevronRight,
  PlusIcon,
  SquarePlusIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import useSWR from "swr";
import pb from "@/lib/pocketbase";
import { FoldersRecord, FoldersResponse } from "@/pocketbase-types";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { data: collections, error } = useSWR("collections", async () => {
    const records = await pb
      .collection("folders")
      .getFullList<FoldersResponse>({ sort: "-created" });

    console.log("collections", records);

    return records;
  });

  return (
    <SidebarGroup>
      <div className="flex flex-row w-full justify-between">
        <SidebarGroupLabel>Collections</SidebarGroupLabel>
        <SidebarMenuButton
          className="w-fit"
          onClick={async () => {
            // await pb.collection("users").authRefresh();
            const user = pb.authStore.model?.id;
            console.log("user", user);
            if (!pb.authStore.isValid) {
              // Handle unauthenticated state, e.g., redirect to login
              console.error("User is not authenticated");
              return;
            }
            if (!user) {
              // Handle missing user
              console.error("User is missing");
              return;
            }

            await pb
              .collection("folders")
              .create({ name: "New Collection", user });
          }}
        >
          <SquarePlusIcon />
        </SidebarMenuButton>
      </div>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
