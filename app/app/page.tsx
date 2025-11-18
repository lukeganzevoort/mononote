import { Suspense } from "react";
import { NoteList } from "./note-list";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full p-8">
          <p className="font-mono text-muted-foreground">Loading notes...</p>
        </div>
      }
    >
      <NoteList />
    </Suspense>
  );
}
