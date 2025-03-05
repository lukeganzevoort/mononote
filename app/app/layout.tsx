import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/user-menu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex flex-row w-full justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <UserMenu
              user={{
                name: "user",
                email: "m@example.com",
                avatar: "https://github.com/shadcn.png",
              }}
            />
          </div>
        </header>
        <div className="flex-grow h-full w-full flex flex-col items-center">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
