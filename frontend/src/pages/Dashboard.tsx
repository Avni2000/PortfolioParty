

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-hero-text mb-6 leading-tight">
          Welcome to Portfolio Party
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Manage your portfolio and engage with your community.
        </p>

      </div>
    </section>
  );
};

export default HeroSection;