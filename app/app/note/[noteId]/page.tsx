import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Note } from "./textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotePage() {
  const note = { title: "Test", content: "Test: this note" };

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
            <span className="absolute left-1/2 transform -translate-x-1/2 font-mono font-bold">
              {note.title}
            </span>
            <ModeToggle />
          </div>
          <div className="flex-grow h-full w-full flex flex-col items-center">
            <Card className="flex-grow flex my-2 mx-0 sm:mx-2 md:mx-6 w-full max-w-3xl">
              {/* <CardHeader>
                <CardTitle className="flex justify-center">
                  {note.title}
                </CardTitle>
              </CardHeader> */}
              <CardContent className="flex-grow pt-6">
                <Note />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
