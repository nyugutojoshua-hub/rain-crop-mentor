import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, TrendingUp, Bell, Users, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-farm.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Home = () => {
  const features = [
    {
      icon: CloudRain,
      title: "Localized Rainfall Forecasts",
      description: "Get accurate, real-time rainfall predictions specific to your farm location"
    },
    {
      icon: TrendingUp,
      title: "Crop Rotation Advice",
      description: "Maximize yield with intelligent crop rotation and planting recommendations"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive timely alerts about weather changes and optimal planting times"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track rainfall patterns and crop performance with detailed reports"
    },
    {
      icon: Users,
      title: "Community Insights",
      description: "Learn from successful farming practices in your region"
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Powered by advanced weather APIs for maximum accuracy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Smart Farming with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Weather Intelligence
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Empower your farming decisions with localized rainfall forecasts, crop rotation advice, 
                and planting recommendations based on real-time weather data.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Lush green farmland with crops under rain" 
                className="relative rounded-2xl shadow-[var(--shadow-elevated)] w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Rain & Crop Advisory?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive system provides everything you need to make informed farming decisions
              and maximize your harvest potential.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border hover:shadow-[var(--shadow-card)] transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={dashboardPreview} 
                alt="Dashboard showing weather and crop data visualization" 
                className="rounded-2xl shadow-[var(--shadow-elevated)] w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Intuitive Dashboard for{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Data-Driven Decisions
                </span>
              </h2>
              <p className="text-muted-foreground">
                Access all your critical farming data in one place. Our dashboard provides real-time 
                weather updates, crop health monitoring, and actionable insights to help you make 
                the right decisions at the right time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Real-time rainfall forecasts and historical data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Personalized crop recommendations based on your location</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Performance analytics and trend visualization</span>
                </li>
              </ul>
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--gradient-dashboard)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of farmers who are already using our system to increase yields 
            and make smarter decisions.
          </p>
          <Link to="/auth">
            <Button variant="hero" size="lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Rain and Crop Advisory System. All rights reserved.</p>
          <p className="text-sm mt-2">Developed by Nyuguto Joshua Muriuki | Zetech University</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
