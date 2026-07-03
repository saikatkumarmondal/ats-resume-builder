import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar
          userName={session.user.name ?? "User"}
          userEmail={session.user.email ?? ""}
        />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}