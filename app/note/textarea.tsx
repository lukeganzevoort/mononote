"use client";

import { useState } from "react";

export const TextArea = ({ defaultValue }: { defaultValue: string }) => {
  const [notes, setNotes] = useState(defaultValue);

  return (
    <textarea
      placeholder="Add notes..."
      className="w-full h-full bg-transparent focus-visible:outline-none focus-visible:ring-0 resize-none"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      autoFocus
    />
  );
};
