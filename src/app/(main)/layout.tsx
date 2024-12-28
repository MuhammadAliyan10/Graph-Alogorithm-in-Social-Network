import { validateRequest } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
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
  );
}
