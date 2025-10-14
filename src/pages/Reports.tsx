import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";

const Reports = () => {
  const rainfallData = [
    { month: "Jan", amount: 45 },
    { month: "Feb", amount: 62 },
    { month: "Mar", amount: 78 },
    { month: "Apr", amount: 95 },
    { month: "May", amount: 120 },
    { month: "Jun", amount: 85 }
  ];

  const cropPerformance = [
    { crop: "Maize", yield: 85, trend: "+12%" },
    { crop: "Beans", yield: 78, trend: "+8%" },
    { crop: "Wheat", yield: 92, trend: "+15%" },
    { crop: "Rice", yield: 75, trend: "+5%" }
  ];

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
                    <div className="text-3xl font-bold text-secondary">485mm</div>
                    <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">81mm</div>
                    <p className="text-xs text-muted-foreground mt-1">Per month</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent">+18%</div>
                    <p className="text-xs text-muted-foreground mt-1">Compared to last year</p>
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
                    {rainfallData.map((data) => (
                      <div key={data.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{data.month}</span>
                          <span className="text-muted-foreground">{data.amount}mm</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all"
                            style={{ width: `${(data.amount / 120) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
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
                    {cropPerformance.map((crop) => (
                      <div key={crop.crop} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{crop.crop}</h4>
                            <p className="text-sm text-muted-foreground">Yield Performance</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{crop.yield}%</div>
                            <div className="text-sm text-primary font-medium">{crop.trend}</div>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                            style={{ width: `${crop.yield}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Best Performing Crop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Wheat</h3>
                      <p className="text-muted-foreground">92% yield performance</p>
                      <p className="text-primary font-medium mt-1">+15% growth</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                        <span className="text-sm">Increase wheat cultivation area</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-1.5" />
                        <span className="text-sm">Optimize bean planting schedule</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                        <span className="text-sm">Monitor rice field moisture levels</span>
                      </li>
                    </ul>
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
