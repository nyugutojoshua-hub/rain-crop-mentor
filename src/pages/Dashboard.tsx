import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Droplets, Wind, ThermometerSun, TrendingUp, AlertTriangle, Sprout } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const weatherData = {
    temperature: 24,
    humidity: 72,
    rainfall: 12,
    windSpeed: 15,
    soilMoisture: 68,
    forecast: "Moderate rain expected in 2 days"
  };

  const cropAdvisory = [
    {
      crop: "Maize",
      status: "Optimal",
      action: "Good time for planting",
      icon: Sprout,
      color: "text-primary"
    },
    {
      crop: "Beans",
      status: "Wait",
      action: "Wait for more rainfall",
      icon: AlertTriangle,
      color: "text-accent"
    },
    {
      crop: "Wheat",
      status: "Good",
      action: "Continue maintenance",
      icon: TrendingUp,
      color: "text-secondary"
    }
  ];

  const alerts = [
    { message: "Heavy rainfall expected tomorrow", severity: "high", time: "2 hours ago" },
    { message: "Optimal planting window opening", severity: "medium", time: "5 hours ago" },
    { message: "Soil moisture levels ideal", severity: "low", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Farmer</span>
            </h1>
            <p className="text-muted-foreground">
              Here's your personalized farming dashboard with real-time updates
            </p>
          </div>

          {/* Weather Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <ThermometerSun className="w-4 h-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                <p className="text-xs text-muted-foreground mt-1">Optimal range</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
                  <CloudRain className="w-4 h-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.rainfall}mm</div>
                <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.soilMoisture}%</div>
                <p className="text-xs text-muted-foreground mt-1">Good levels</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
                  <Wind className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.windSpeed} km/h</div>
                <p className="text-xs text-muted-foreground mt-1">Moderate breeze</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Forecast Card */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-primary" />
                    Weather Forecast
                  </CardTitle>
                  <CardDescription>Next 7 days outlook for your location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-[var(--gradient-dashboard)] rounded-lg p-6 mb-4">
                    <p className="text-lg font-semibold mb-2">{weatherData.forecast}</p>
                    <p className="text-sm text-muted-foreground">
                      Perfect conditions for planting season crops. Prepare your fields now.
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {["Mon", "Tue", "Wed", "Thu"].map((day, idx) => (
                      <div key={day} className="text-center p-3 rounded-lg bg-muted/30">
                        <p className="text-xs font-medium mb-2">{day}</p>
                        <CloudRain className="w-6 h-6 mx-auto text-secondary mb-1" />
                        <p className="text-sm font-semibold">{23 + idx}°C</p>
                        <p className="text-xs text-muted-foreground">{10 + idx}mm</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Crop Advisory */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-primary" />
                    Crop Advisory
                  </CardTitle>
                  <CardDescription>Personalized recommendations for your crops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropAdvisory.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.crop}</h4>
                              <p className="text-sm text-muted-foreground">{item.action}</p>
                            </div>
                          </div>
                          <Badge variant={item.status === "Optimal" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Crop Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert, idx) => (
                      <div key={idx} className="pb-3 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${
                            alert.severity === "high" ? "bg-destructive" : 
                            alert.severity === "medium" ? "bg-accent" : "bg-primary"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    <Sprout className="w-4 h-4 mr-2" />
                    Add Crop Field
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CloudRain className="w-4 h-4 mr-2" />
                    View Detailed Forecast
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
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

export default Dashboard;
