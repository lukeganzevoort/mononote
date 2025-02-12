import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

export default function NotePage() {
  const note = { title: "Test", content: "test this note" };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen w-screen font-mono">
        <div className="h-full flex flex-col justify-center items-center space-y-2">
          <div className="h-12 w-full flex items-center justify-between px-4">
            <span>MONO.NOTE</span>
            <span className="absolute left-1/2 transform -translate-x-1/2 font-mono">
              {note.title}
            </span>
            <ModeToggle />
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>
    </ThemeProvider>
  );
}
