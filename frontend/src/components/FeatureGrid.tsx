import { Card, CardContent } from "@/components/ui/card";

const FeatureGrid = () => {
  const features = [
    {
      title: "Popular Stocks Right Now",
      description: "See what stocks are trending and popular among users. Get insights into the latest market movements and popular picks."
    },
    {
      title: "Investor Chatrooms", 
      description: "Join topic-based chatrooms to discuss strategies, share insights, and connect with other investors. Engage in real-time conversations about market trends and investment opportunities."
    },
    {
      title: "Portfolio Snapshots",
      description: "Peak into anonymized, top-performing portfolios to see how successful investors are allocating their assets. Learn from the strategies of the best in the market."
    },
    {
      title: "Investment Insights Feed",
      description: "Scroll through a personalized feed of investment insights, news, and updates. Stay informed with the latest market trends and expert analyses tailored to your interests."
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-hero-text mb-6">
            Title Section
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Subtitle description text goes here
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;