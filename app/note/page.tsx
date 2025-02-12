export default function NotePage() {
  const note = { title: "Test", content: "test this note" };

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex flex-col justify-center items-center space-y-2">
        <div className="h-12 w-full flex items-center justify-between">
          <span className="px-4">MONO.NOTE</span>
          <span>{note.title}</span>
          <span className="px-4 opacity-0">MONO.NOTE</span>
        </div>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}
