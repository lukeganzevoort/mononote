"use client";

import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import { NotesResponse } from "@/pocketbase-types";
import useSWR from "swr";
import { useParams } from "next/navigation";

export const Note = () => {
  const params = useParams<{ noteId: string }>();
  const noteId = params.noteId === "create" ? undefined : params.noteId;

  const { data: note, error: loadingNoteError } = useSWR(
    { note: noteId },
    async () => {
      if (!noteId) return { content: "" };
      const record = await pb.collection("notes").getOne<NotesResponse>(noteId);
      return record;
    }
  );

  if (loadingNoteError) return <div>Error loading note</div>;
  if (!note) return <div>Loading...</div>;
  return <TextArea noteId={noteId} defaultValue={note.content} />;
};

const TextArea = ({
  noteId,
  defaultValue,
}: {
  noteId?: string;
  defaultValue: string;
}) => {
  const [note, setNote] = useState(defaultValue);

  useEffect(() => {
    const updateNote = async () => {
      try {
        if (noteId) {
          const record = await pb
            .collection("notes")
            .update(noteId, { content: note });
          console.log("Note updated:", record);
        }
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };

    updateNote();
  }, [note]);

  return (
    <textarea
      placeholder="Add notes..."
      className="w-full h-full bg-transparent focus-visible:outline-none focus-visible:ring-0 resize-none"
      value={note}
      onChange={(e) => {
        setNote(e.target.value);
      }}
      autoFocus
    />
  );
};
