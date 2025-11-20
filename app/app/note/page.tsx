import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Note } from "./textarea";

export default function NotePage() {
  return (
    <div className="w-full h-full flex flex-col font-mono overflow-auto">
      <div className="flex-grow flex justify-center">
        <Card className="my-2 mx-0 sm:mx-2 md:mx-6 w-full max-w-3xl">
          <CardContent className="h-full p-0 flex">
            <Suspense fallback={<div>Loading...</div>}>
              <Note />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

