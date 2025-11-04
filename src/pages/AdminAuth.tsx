import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate input
      const validated = adminLoginSchema.parse({ email, password });

      // Sign in
      const { error: signInError } = await signIn(validated.email, validated.password);
      
      if (signInError) {
        toast({
          title: "Login Failed",
          description: signInError.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Unable to verify user",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (roleError || !roleData) {
        // Not an admin - sign them out
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You do not have administrator privileges",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Success - redirect to admin panel
      toast({
        title: "Welcome Admin",
        description: "Successfully logged in",
      });
      navigate("/admin");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Admin Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary">
            <Shield className="w-5 h-5 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground">Administrator Access</span>
          </div>
        </div>

        <Card className="border-border shadow-[var(--shadow-elevated)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your administrator credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="hero"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Login as Administrator"}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold mb-1">Security Notice</p>
                  <p>This is a restricted area. Only authorized administrators can access this panel. All login attempts are logged and monitored.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground"
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
