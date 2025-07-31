import { Button } from "@/components/ui/button";

const HeroSection = () => {
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
          <source src="TODO" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Hero Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none"></div>

      {/* Animated Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary-glow rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary-glow rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-hero-text mb-6 leading-tight">
          Trade All<br />
          in One Place
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Manage your entire portfolio – stocks, ETFs, and crypto – at low costs.
        </p>

        <Button variant="hero" size="hero" className="shadow-button hover:shadow-glow">
          Get started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;