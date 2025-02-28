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

  // return (
  //   <div className="flex flex-col h-screen p-4 overflow-auto">
  //     {/* Other content above the card */}

  //     <div className="flex-1 flex justify-center items-center">
  //       <div className="w-full h-full max-w-2xl bg-white shadow-lg rounded-lg p-4 min-h-[200px] ">
  //         <textarea
  //           className="w-full h-full resize-none border-none focus:outline-none"
  //           placeholder="Type something..."
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  const range = (n: number) => Array.from({ length: n }, (_, i) => i);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen w-screen flex flex-col font-mono overflow-auto">
        {/* <div>Hello</div>
        <div>Hello2</div>
        <div className="flex-grow flex flex-col">
          <div className="flex-grow">b</div>
          <div className="">
            {range(22).map((i) => (
              <div key={i}>{i}</div>
            ))}
          </div>
        </div>
        <div>Bye</div> */}
        <div className="relative h-14 min-h-14 w-full flex items-center justify-between px-4">
          <span>MONO.NOTE</span>
          <span className="absolute left-1/2 transform -translate-x-1/2 font-mono font-bold">
            {note.title}
          </span>
          <ModeToggle />
        </div>
        <div className="flex-grow flex justify-center">
          <Card className="my-2 mx-0 sm:mx-2 md:mx-6 w-full max-w-3xl">
            <CardContent className="h-full p-0 flex">
              <Note />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
