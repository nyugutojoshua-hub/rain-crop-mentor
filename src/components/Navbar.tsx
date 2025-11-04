import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cloud, Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      setIsAdmin(!!data);
    };

    checkAdminStatus();
  }, [user]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = user
    ? [
        { path: "/", label: "Home" },
        { path: "/dashboard", label: "Dashboard" },
        { path: "/reports", label: "Reports" },
        ...(isAdmin ? [{ path: "/admin", label: "Admin", icon: Shield }] : []),
      ]
    : [{ path: "/", label: "Home" }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Cloud className="w-8 h-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rain Advisory
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            {user ? (
              <Button variant="hero" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="hero" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/admin/login">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                      isActive(link.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}
              {user ? (
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Shield className="w-3 h-3" />
                      Admin Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
