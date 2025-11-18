"use client";

import pb from "@/lib/pocketbase";
import useSWR from "swr";
import { NotesResponse } from "@/pocketbase-types";
import { useSearchParams } from "next/navigation";
import { DEMO_NOTES } from "@/pocketbase/demo_data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, FileTextIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export const NoteList = () => {
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";

  const { data, error } = useSWR(["notes", isDemoMode], async () => {
    // Return fake data if in demo mode
    console.log("isDemoMode", isDemoMode);
    if (isDemoMode) {
      return DEMO_NOTES;
    }

    // Otherwise fetch from PocketBase
    const records = await pb
      .collection("notes")
      .getFullList<NotesResponse>({ sort: "-created" });

    return records;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive font-mono">Error loading notes</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="font-mono text-muted-foreground">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col p-6 font-mono">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Notes
            {isDemoMode && (
              <span className="ml-2 text-sm text-muted-foreground font-normal">
                (Demo Mode)
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            {data.length} {data.length === 1 ? "note" : "notes"}
          </p>
        </div>
        <Link href={`/app/note/create${isDemoMode ? "?demo=true" : ""}`}>
          <Button className="gap-2 font-mono">
            <PlusIcon className="h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {data.map((note) => (
            <Link
              key={note.id}
              href={`/app/note/${note.id}${isDemoMode ? "?demo=true" : ""}`}
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <FileTextIcon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
                      {note.title || "Untitled Note"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content || "No content yet..."}
                  </p>
                  {note.updated && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3" />
                      <span>
                        {new Date(note.updated).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
