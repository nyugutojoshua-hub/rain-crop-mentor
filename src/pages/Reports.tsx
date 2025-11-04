import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rainfallData, setRainfallData] = useState<any[]>([]);
  const [cropPerformance, setCropPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch rainfall records for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const { data: rainfall, error: rainfallError } = await supabase
          .from('rainfall_records')
          .select('*')
          .gte('date', sixMonthsAgo.toISOString())
          .order('date', { ascending: true });

        if (rainfallError) throw rainfallError;
        
        // Group rainfall by month
        const monthlyRainfall = (rainfall || []).reduce((acc: any, record: any) => {
          const month = new Date(record.date).toLocaleString('default', { month: 'short' });
          if (!acc[month]) {
            acc[month] = { month, amount: 0 };
          }
          acc[month].amount += parseFloat(record.rainfall_mm);
          return acc;
        }, {});
        
        setRainfallData(Object.values(monthlyRainfall));

        // Fetch user's crops
        const { data: crops, error: cropsError } = await supabase
          .from('crops')
          .select('*')
          .eq('user_id', user.id);

        if (cropsError) throw cropsError;
        
        // Calculate crop performance
        const performance = (crops || []).reduce((acc: any, crop: any) => {
          const existing = acc.find((p: any) => p.crop === crop.crop_type);
          if (existing) {
            existing.count += 1;
          } else {
            acc.push({ crop: crop.crop_type, count: 1 });
          }
          return acc;
        }, []);
        
        setCropPerformance(performance);
      } catch (error: any) {
        toast({
          title: "Error loading reports",
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
          <p className="text-muted-foreground">Loading reports...</p>
        </div>
      </div>
    );
  }

  const totalRainfall = rainfallData.reduce((sum, data) => sum + data.amount, 0);
  const avgMonthly = rainfallData.length > 0 ? totalRainfall / rainfallData.length : 0;
  const maxRainfall = Math.max(...rainfallData.map(d => d.amount), 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Reports & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Analytics</span>
              </h1>
              <p className="text-muted-foreground">
                Track rainfall patterns and crop performance over time
              </p>
            </div>
            <Button variant="hero">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <Tabs defaultValue="rainfall" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
              <TabsTrigger value="crops">Crops</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="rainfall" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Total Rainfall</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-secondary">{totalRainfall.toFixed(0)}mm</div>
                    <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{avgMonthly.toFixed(0)}mm</div>
                    <p className="text-xs text-muted-foreground mt-1">Per month</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent">{rainfallData.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Data points</p>
                  </CardContent>
                </Card>
              </div>

              {/* Rainfall Chart */}
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Monthly Rainfall Distribution
                  </CardTitle>
                  <CardDescription>Rainfall patterns over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rainfallData.length > 0 ? (
                      rainfallData.map((data) => (
                        <div key={data.month} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{data.month}</span>
                            <span className="text-muted-foreground">{data.amount.toFixed(1)}mm</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                              style={{ width: `${(data.amount / maxRainfall) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No rainfall data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crops" className="space-y-6">
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Crop Performance Analysis
                  </CardTitle>
                  <CardDescription>Yield performance and trends by crop type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cropPerformance.length > 0 ? (
                      cropPerformance.map((crop) => {
                        const maxCount = Math.max(...cropPerformance.map(c => c.count), 1);
                        const percentage = (crop.count / maxCount) * 100;
                        return (
                          <div key={crop.crop} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{crop.crop}</h4>
                                <p className="text-sm text-muted-foreground">Crop Count</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">{crop.count}</div>
                                <div className="text-sm text-primary font-medium">Fields</div>
                              </div>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No crop data available
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Most Popular Crop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cropPerformance.length > 0 ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {cropPerformance.sort((a, b) => b.count - a.count)[0].crop}
                        </h3>
                        <p className="text-muted-foreground">
                          {cropPerformance.sort((a, b) => b.count - a.count)[0].count} fields
                        </p>
                        <p className="text-primary font-medium mt-1">Most cultivated</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        No crop data available
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Your Crops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cropPerformance.length > 0 ? (
                      <ul className="space-y-3">
                        {cropPerformance.map((crop, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            <span className="text-sm">{crop.crop}: {crop.count} field(s)</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        No crops planted yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle>Historical Trends</CardTitle>
                  <CardDescription>Long-term patterns and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Detailed trend analysis coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison">
              <Card className="border-border shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle>Year-over-Year Comparison</CardTitle>
                  <CardDescription>Compare performance across different periods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Comparison tools coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
