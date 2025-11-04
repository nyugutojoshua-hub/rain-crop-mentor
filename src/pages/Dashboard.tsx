import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Droplets, Wind, ThermometerSun, TrendingUp, AlertTriangle, Sprout } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [cropAdvisory, setCropAdvisory] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        // Fetch latest weather data
        const { data: weather, error: weatherError } = await supabase
          .from('weather_data')
          .select('*')
          .order('forecast_date', { ascending: false })
          .limit(1)
          .single();

        if (weatherError && weatherError.code !== 'PGRST116') throw weatherError;
        setWeatherData(weather);

        // Fetch crop advisory
        const { data: advisory, error: advisoryError } = await supabase
          .from('crop_advisory')
          .select('*')
          .limit(3);

        if (advisoryError) throw advisoryError;
        setCropAdvisory(advisory || []);

        // Fetch user alerts
        const { data: userAlerts, error: alertsError } = await supabase
          .from('alerts')
          .select('*')
          .or(`user_id.eq.${user.id},user_id.is.null`)
          .order('created_at', { ascending: false })
          .limit(3);

        if (alertsError) throw alertsError;
        setAlerts(userAlerts || []);
      } catch (error: any) {
        toast({
          title: "Error loading data",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                <div className="text-2xl font-bold">{weatherData?.temperature || 'N/A'}°C</div>
                <p className="text-xs text-muted-foreground mt-1">Current temperature</p>
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
                <div className="text-2xl font-bold">{weatherData?.rainfall_mm || 'N/A'}mm</div>
                <p className="text-xs text-muted-foreground mt-1">Forecast</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData?.humidity || 'N/A'}%</div>
                <p className="text-xs text-muted-foreground mt-1">Current humidity</p>
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
                <div className="text-2xl font-bold">{weatherData?.wind_speed || 'N/A'} km/h</div>
                <p className="text-xs text-muted-foreground mt-1">Current wind</p>
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
                    <p className="text-lg font-semibold mb-2">
                      {weatherData?.conditions || 'Weather forecast unavailable'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Location: {weatherData?.location || 'Not specified'}
                    </p>
                  </div>
                  {weatherData && (
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="text-xs font-medium mb-2">
                        {new Date(weatherData.forecast_date).toLocaleDateString()}
                      </p>
                      <CloudRain className="w-6 h-6 mx-auto text-secondary mb-1" />
                      <p className="text-sm font-semibold">{weatherData.temperature}°C</p>
                      <p className="text-xs text-muted-foreground">{weatherData.rainfall_mm}mm</p>
                    </div>
                  )}
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
                    {cropAdvisory.length > 0 ? (
                      cropAdvisory.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Sprout className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.crop_type}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <Badge variant="default">
                            {item.season}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No crop advisory available
                      </p>
                    )}
                  </div>
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
                    {alerts.length > 0 ? (
                      alerts.map((alert, idx) => (
                        <div key={idx} className="pb-3 border-b border-border last:border-0 last:pb-0">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${
                              alert.severity === "high" ? "bg-destructive" : 
                              alert.severity === "medium" ? "bg-accent" : "bg-primary"
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{alert.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(alert.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No alerts available
                      </p>
                    )}
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
