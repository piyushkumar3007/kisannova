import type { DemoUser } from "./Layout";

interface NavbarProps {
  currentUser: DemoUser | null;
  onLogin: (user: DemoUser) => void;
  onLogout: () => void;
  onOpenDashboard: () => void;
}
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, UserRound, Sprout } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology" },
  { label: "Results", href: "#sustainability" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  currentUser,
  onLogin,
  onLogout,
  onOpenDashboard,
}: NavbarProps)  {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "create">("login");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openAuth = (mode: "login" | "create") => {
    setAuthMode(mode);
    setAuthMessage("");
    setAuthOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          scrolled
            ? "bg-card border-b border-border shadow-subtle"
            : "bg-card/95 backdrop-blur-sm border-b border-border/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Nova Home"
              data-ocid="nav.logo"
            >
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shadow-subtle group-hover:shadow-elevated transition-smooth">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-lg text-foreground tracking-tight">
                KisanNova
                </span>
                {/*
                <span className="text-[10px] text-muted-foreground font-body tracking-widest uppercase">
                  by KisanNova
                </span>
                */}
              </div>
            </button>

            {/* Desktop navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop login button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAuth("login")}
                className="border-primary/40 text-primary hover:bg-primary/5 transition-smooth gap-2"
                data-ocid="nav.login_button"
              >
                <UserRound className="w-4 h-4" />
                Login / Create Account
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted/60 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              data-ocid="nav.mobile_menu_toggle"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="md:hidden bg-card border-t border-border shadow-elevated"
            data-ocid="nav.mobile_menu"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-body font-medium text-foreground hover:bg-muted/60 rounded-md transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 border-t border-border mt-2">
                <Button
                  className="w-full gap-2"
                  onClick={() => openAuth("login")}
                  data-ocid="nav.mobile_login_button"
                >
                  <UserRound className="w-4 h-4" />
                  Login / Create Account
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Login / Create Account popup - outside header */}
      {authOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-foreground/55 backdrop-blur-sm px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setAuthOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            className="relative my-auto w-full max-w-md max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elevated animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setAuthOpen(false)}
              aria-label="Close login dialog"
              className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sprout className="h-6 w-6" />
            </div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              KisanNova
            </p>

            <h2
              id="auth-title"
              className="font-display text-2xl font-semibold text-foreground"
            >
              {authMode === "login" ? "Welcome back" : "Join KisanNova"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {authMode === "login"
                ? "Sign in to continue your farming journey."
                : "Create an account to stay connected with our farming technology updates."}
            </p>

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setAuthMessage(
                  "The account form is ready, but secure sign-in is not connected yet. Connect an authentication service to enable accounts."
                );
              }}
            >
              {authMode === "create" && (
                <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-11 rounded-lg border border-input bg-background px-3 font-normal outline-none transition-smooth focus:ring-2 focus:ring-ring"
                  />
                </label>
              )}

              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-lg border border-input bg-background px-3 font-normal outline-none transition-smooth focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
                Password
                <input
                  required
                  type="password"
                  minLength={8}
                  autoComplete={
                    authMode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  placeholder="At least 8 characters"
                  className="h-11 rounded-lg border border-input bg-background px-3 font-normal outline-none transition-smooth focus:ring-2 focus:ring-ring"
                />
              </label>

              {authMessage && (
                <p
                  role="status"
                  className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs leading-relaxed text-foreground"
                >
                  {authMessage}
                </p>
              )}

              <Button type="submit" className="mt-1 w-full">
                {authMode === "login" ? "Login" : "Create account"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {authMode === "login"
                ? "New to KisanNova?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setAuthMode(
                    authMode === "login" ? "create" : "login"
                  );
                  setAuthMessage("");
                }}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {authMode === "login"
                  ? "Create an account"
                  : "Login instead"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
