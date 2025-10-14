import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Upload, Activity, Settings, Search } from "lucide-react";
import Navbar from "@/components/Navbar";

const Admin = () => {
  const users = [
    { id: 1, name: "John Kamau", email: "john@example.com", location: "Kiambu", status: "Active", joined: "Jan 2025" },
    { id: 2, name: "Mary Wanjiru", email: "mary@example.com", location: "Nakuru", status: "Active", joined: "Dec 2024" },
    { id: 3, name: "Peter Ochieng", email: "peter@example.com", location: "Kisumu", status: "Inactive", joined: "Nov 2024" },
    { id: 4, name: "Sarah Akinyi", email: "sarah@example.com", location: "Machakos", status: "Active", joined: "Jan 2025" }
  ];

  const systemStats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Active Farms", value: "892", icon: Activity, color: "text-secondary" },
    { label: "Data Updates", value: "156", icon: Upload, color: "text-accent" },
    { label: "System Health", value: "98%", icon: Settings, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Admin <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Panel</span>
            </h1>
            <p className="text-muted-foreground">
              Manage users, upload data, and monitor system performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* User Management */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        User Management
                      </CardTitle>
                      <CardDescription>Manage farmer accounts and permissions</CardDescription>
                    </div>
                    <Button variant="hero" size="sm">
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-10"
                    />
                  </div>

                  {/* User Table */}
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {user.location} • Joined {user.joined}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Load More Users
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Data Upload */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Data Upload
                  </CardTitle>
                  <CardDescription>Upload rainfall and crop data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Rainfall Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Crop Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV File
                  </Button>
                </CardContent>
              </Card>

              {/* System Monitoring */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>API Response</span>
                      <span className="text-primary font-medium">Excellent</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[95%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Database</span>
                      <span className="text-primary font-medium">Healthy</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[98%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Storage</span>
                      <span className="text-secondary font-medium">Good</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full w-[75%]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    View Logs
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Backup Database
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
