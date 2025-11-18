"use client";

import pb from "@/lib/pocketbase";
import useSWR from "swr";
import { NotesResponse } from "@/pocketbase-types";
import { useSearchParams } from "next/navigation";
import { DEMO_NOTES } from "@/pocketbase/demo_data";

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

  if (error) return <div>Error loading notes</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Notes:{isDemoMode && " (Demo Mode)"}</h1>
      <ul>
        {data.map((note) => (
          <li key={note.id}>
            <a href={`/app/note/${note.id}${isDemoMode ? "?demo=true" : ""}`}>
              {note.title}
            </a>
          </li>
        ))}
        <li>
          <a href={`/app/note${isDemoMode ? "?demo=true" : ""}`}>New Note</a>
        </li>
      </ul>
    </div>
  );
};
