"use client";

import { ModeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { UserMenu } from "./user-menu";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import pb from "@/lib/pocketbase";
import { DEMO_NOTES } from "@/pocketbase/demo_data";

export const NavTop = () => {
  const params = useParams<{ noteId: string | undefined }>();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";

  // Always call useSWR to maintain hook order
  const { data: notes } = useSWR(["notes", isDemoMode], async () => {
    if (isDemoMode) {
      return DEMO_NOTES;
    }
    const records = await pb
      .collection("notes")
      .getFullList({ sort: "-created" });
    return records;
  });

  let noteTitle = "All Notes";
  if (params.noteId) {
    const currentNoteId = params.noteId;
    const currentNote = notes?.find((note) => note.id === currentNoteId);
    noteTitle = currentNote?.title ?? "Untitled Note";
  }

  return (
    <div className="relative h-14 min-h-14 w-full flex items-center justify-between gap-4 font-mono">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {/* <span>MONO.NOTE</span> */}
      </div>
      <span className="absolute left-1/2 transform -translate-x-1/2 font-mono font-bold">
        {noteTitle}
      </span>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {isDemoMode ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <span>Demo User</span>
          </div>
        ) : (
          <UserMenu
            user={{
              name: "user",
              email: "m@example.com",
              avatar: "https://github.com/shadcn.png",
            }}
          />
        )}
      </div>
    </div>
  );
};
