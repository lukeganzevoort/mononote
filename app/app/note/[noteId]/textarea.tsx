"use client";

import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import { NotesResponse } from "@/pocketbase-types";
import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DEMO_NOTES } from "@/pocketbase/demo_data";

export const Note = () => {
  const params = useParams<{ noteId: string }>();
  const noteId = params.noteId === "create" ? undefined : params.noteId;
  const [isSaving, setIsSaving] = useState(false);
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";

  const { data: note, error: loadingNoteError } = useSWR(
    ["note", noteId, isDemoMode],
    async () => {
      if (!noteId) return { content: "" };
      if (isDemoMode) {
        const foundNote = DEMO_NOTES.find((note) => note.id === noteId);
        if (!foundNote) {
          throw new Error(`Note with id ${noteId} not found`);
        }
        return foundNote;
      }
      const record = await pb.collection("notes").getOne<NotesResponse>(noteId);
      if (!record) {
        throw new Error(`Note with id ${noteId} not found`);
      }
      return record;
    }
  );

  if (loadingNoteError) return <div>Error loading note</div>;
  if (!note) return <div>Loading...</div>;
  return (
    <TextArea
      noteId={noteId}
      defaultValue={note.content}
      setIsSaving={setIsSaving}
    />
  );
};
const TextArea = ({
  noteId,
  defaultValue,
  setIsSaving,
}: {
  noteId?: string;
  defaultValue: string;
  setIsSaving?: (isSaving: boolean) => void;
}) => {
  const [note, setNote] = useState(defaultValue);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";
  const debouncedUpdateNote = useDebouncedCallback(async () => {
    try {
      if (noteId && !isDemoMode) {
        console.log("Updating note:", noteId);
        const record = await pb
          .collection("notes")
          .update(noteId, { content: note });
        console.log("Note updated:", record);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setIsSaving?.(false);
    }
  }, 1000);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    setIsSaving?.(true);
    debouncedUpdateNote();
  }, [note]);

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [note]);

  return (
    <textarea
      placeholder="Add notes..."
      className="w-full h-full min-h-full p-6 bg-transparent ring-0 focus-visible:outline-none focus-visible:ring-0 resize-none overflow-hidden"
      value={note}
      onChange={(e) => {
        setNote(e.target.value);
      }}
      autoFocus
      spellCheck
    />
  );
};
