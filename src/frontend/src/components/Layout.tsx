
import { useState } from "react";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NovaAssistant from "../NovaAssistant";
import Dashboard from "@/pages/Dashboard";

export interface DemoUser {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(() => {
    try {
      const savedUser = localStorage.getItem("nova_demo_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = (user: DemoUser) => {
    setCurrentUser(user);
    localStorage.setItem("nova_demo_user", JSON.stringify(user));
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowDashboard(false);
    localStorage.removeItem("nova_demo_user");
  };

  const handleBack = () => {
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenDashboard={() => setShowDashboard(true)}
      />

      {showDashboard && currentUser ? (
        <Dashboard
          user={currentUser}
          onBack={handleBack}
          onLogout={handleLogout}
        />
      ) : (
        <>
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}

      <NovaAssistant />
    </div>
  );
}
