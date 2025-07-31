import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-hero-text">Portfolio Party</h1>
        </div>

        {/* Navigation Links, add items below to add to webpage functionality */}
        <div className="hidden md:flex items-center space-x-8">
          <Button variant="nav">Why We Do What We Do</Button>
          {/* <Button variant="nav"></Button> */}
          <Button variant="nav">Rankings</Button>
          <Button variant="nav">Your Community</Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-nav-text text-sm">
            🇺🇸 US
          </div>
          <Button variant="nav" size="sm" onClick ={() => navigate('/login')}>
            Log in
          </Button>
          <Button variant="nav-primary" size="sm" onClick ={() => navigate('/signup')}>
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;