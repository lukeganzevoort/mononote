"use client";

import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import useSWR from "swr";
import { NotesResponse } from "@/pocketbase-types";

export const NoteList = () => {
  const { data, error } = useSWR("notes", async () => {
    const records = await pb
      .collection("notes")
      .getFullList<NotesResponse>({ sort: "-created" });

    return records;
  });

  if (error) return <div>Error loading notes</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Notes:</h1>
      <ul>
        {data.map((note) => (
          <li key={note.id}>
            <a href={`/app/note/${note.id}`}>{note.title}</a>
          </li>
        ))}
        <li>
          <a href="/app/note">New Note</a>
        </li>
      </ul>
    </div>
  );
};
