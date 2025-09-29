import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-6">
          <h2 className="text-lg font-semibold">Main Content Area</h2>
          <p className="text-muted-foreground">This is where the main content would appear.</p>
        </div>
      </div>
    </SidebarProvider>
  )
}