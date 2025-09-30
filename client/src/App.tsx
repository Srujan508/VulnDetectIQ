import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthSelector } from "@/components/auth-selector";
import { AdminLogin } from "@/components/admin-login";
import { CustomerLogin } from "@/components/customer-login";
import { Button } from "@/components/ui/button";
import { LogOut, MessageCircle } from "lucide-react"; // Removed Bot
import Dashboard from "@/pages/dashboard";
import QueryPage from "@/pages/query";
import ReportsPage from "@/pages/reports";
import ScansPage from "@/pages/scans";
import VulnerabilitiesPage from "@/pages/vulnerabilities";
import NotFound from "@/pages/not-found";
import { Chatbot } from "@/components/chatbot";

type AuthState = {
  isAuthenticated: boolean;
  userRole: "admin" | "customer" | null;
  user: { email: string } | null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      {/* <Route path="/query" component={QueryPage} /> */}
      <Route path="/reports" component={ReportsPage} />
      <Route path="/scans" component={ScansPage} />
      <Route path="/vulnerabilities" component={VulnerabilitiesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    user: null
  });
  const [selectedRole, setSelectedRole] = useState<"admin" | "customer" | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleRoleSelect = (role: "admin" | "customer") => {
    setSelectedRole(role);
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    setAuthState({
      isAuthenticated: true,
      userRole: selectedRole!,
      user: { email: credentials.email }
    });
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      user: null
    });
    setSelectedRole(null);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark" storageKey="cybershield-theme">
          {!authState.isAuthenticated ? (
            selectedRole === null ? (
              <AuthSelector onSelectRole={handleRoleSelect} />
            ) : selectedRole === "admin" ? (
              <AdminLogin onLogin={handleLogin} onBack={handleBackToSelection} />
            ) : (
              <CustomerLogin onLogin={handleLogin} onBack={handleBackToSelection} />
            )
          ) : (
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full cyber-bg-glow">
                <AppSidebar />
                <div className="flex flex-col flex-1">
                  <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 cyber-border">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {authState.user?.email} ({authState.userRole})
                      </span>
                      <ThemeToggle />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleLogout}
                        data-testid="button-logout"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto p-6">
                    <Router />
                  </main>
                </div>
              </div>
              <Button
                variant="default"
                size="icon"
                className="fixed right-8 top-[calc(100vh-80px)] rounded-full h-14 w-14 shadow-lg cyber-glow z-40"
                onClick={toggleChatbot}
                data-testid="button-toggle-floating-chatbot"
              >
                <MessageCircle className="h-7 w-7" />
              </Button>
              <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
            </SidebarProvider>
          )}
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
