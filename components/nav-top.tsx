import { ModeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { UserMenu } from "./user-menu";

export const NavTop = () => {
  return (
    <div className="relative h-14 min-h-14 w-full flex items-center justify-between gap-4 font-mono">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {/* <span>MONO.NOTE</span> */}
      </div>
      <span className="absolute left-1/2 transform -translate-x-1/2 font-mono font-bold">
        {"Note Title"} {/* Placeholder for note title */}
      </span>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserMenu
          user={{
            name: "user",
            email: "m@example.com",
            avatar: "https://github.com/shadcn.png",
          }}
        />
      </div>
    </div>
  );
};
