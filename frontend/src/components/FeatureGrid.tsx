import { Card, CardContent } from "@/components/ui/card";

const FeatureGrid = () => {
  const features = [
    {
      title: "Box Title 1",
      description: "Feature description goes here"
    },
    {
      title: "Box Title 2", 
      description: "Feature description goes here"
    },
    {
      title: "Box Title 3",
      description: "Feature description goes here"
    },
    {
      title: "Box Title 4",
      description: "Feature description goes here"
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