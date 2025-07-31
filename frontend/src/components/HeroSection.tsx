import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"
import tradingVideo from "@/video/vecteezy_forex-trading-investor-financial-analyst-stock-market-chart_26389055.mp4";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop
          playsInline
        > { /* video link can go here! */}
          <source src={tradingVideo} type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Hero Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none"></div>

      

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-hero-text mb-6 leading-tight">
          Trade All<br />
          in One Place
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Manage your entire portfolio – stocks, ETFs, and crypto – at low costs.
        </p>

        <Button variant="hero" size="hero" className="shadow-button hover:shadow-glow" onClick ={() => navigate('/signup')}>
          Get started
        </Button>
      </div>
    </section>
    
  );
};

export default HeroSection;