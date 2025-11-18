"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/user-menu";
import { AuthCheck } from "./auth-check";
import { NavTop } from "@/components/nav-top";
import { ThemeProvider } from "@/components/theme-provider";
import { useSearchParams } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get("demo") === "true";
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        {isDemoMode ? null : <AuthCheck />}
        <AppSidebar />
        <SidebarInset>
          <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear">
            <div className="flex flex-row w-full justify-between px-4 py-3">
              <NavTop />
            </div>
          </header>
          <div className="flex-grow h-full w-full flex flex-col items-center">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
