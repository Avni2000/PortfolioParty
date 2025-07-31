import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeatureGrid />
      <footer className="bg-background border-t border-border py-6 text-center text-sm text-muted-foreground z-10 relative">
       © 2025 Portfolio Party. All rights reserved.
      </footer>
    </div>

  );
};

export default Index;
