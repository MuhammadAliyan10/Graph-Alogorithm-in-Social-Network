import { validateRequest } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequest();
  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider
      value={{
        user: user ?? null,
        session: session,
      }}
    >
      <main className="flex flex-col">
        <div className="flex justify-between items-center p-4">
          <SidebarProvider>
            <AppSidebar />
            <div className="fixed top-2 right-1">
              <ModeToggle />
            </div>
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </div>
      </main>
    </SessionProvider>
  );
}
