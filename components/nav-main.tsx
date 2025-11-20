"use client";

import {
  ChevronRight,
  NotebookTabsIcon,
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
import { useParams, useSearchParams } from "next/navigation";
import { DEMO_FOLDERS, DEMO_NOTES } from "@/pocketbase/demo_data";

export function NavMain() {
  const params = useParams<{ noteId: string }>();
  const currentNoteId = params.noteId;
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";

  const { data: collections, error } = useSWR(
    ["collections", isDemoMode],
    async () => {
      if (isDemoMode) {
        return DEMO_FOLDERS;
      }
      const records = await pb
        .collection("folders")
        .getFullList<FoldersResponse>({ sort: "-created" });

      console.log("collections", records);

      return records;
    }
  );
  const { data: notes, error: notesError } = useSWR(
    ["notes", isDemoMode],
    async () => {
      if (isDemoMode) {
        return DEMO_NOTES;
      }
      const records = await pb
        .collection("notes")
        .getFullList({ sort: "-created" });

      console.log("notes", records);

      return records;
    }
  );

  if (error) {
    return <div>Error loading collections</div>;
  } else if (!collections) {
    return <div>Loading collections...</div>;
  } else if (notesError) {
    return <div>Error loading notes</div>;
  } else if (!notes) {
    return <div>Loading notes...</div>;
  }

  const currentNote = notes.find((note) => note.id === currentNoteId);

  const items: {
    id: string;
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[] = collections.map((collection: FoldersRecord) => ({
    id: collection.id,
    title: collection.name,
    url: `/collections/${collection.id}`,
    isActive: currentNote?.folder === collection.id,
    icon: NotebookTabsIcon,
    items: notes
      ?.filter((note) => note.folder === collection.id)
      .map((note) => ({
        title: note.title,
        url: `/app/note?id=${note.id}&${isDemoMode ? "demo=true" : ""}`,
      })),
  }));

  return (
    <SidebarGroup>
      <div className="flex flex-row w-full justify-between">
        <SidebarGroupLabel>Collections</SidebarGroupLabel>
        <SidebarMenuButton
          className="w-fit"
          onClick={async () => {
            if (isDemoMode) {
              return;
            }
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
            key={item.id}
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
