import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-[#3FAC1F]">
            Portfolio Party
          </Link>
        </div>

        {/* Navigation Links, add items below to add to webpage functionality */}
        <div className="hidden md:flex items-center space-x-8">
          <Button variant="nav" onClick={() => navigate('/purpose')}>
            Our Purpose
          </Button>
          <Button variant="nav" onClick={() => navigate('/what-we-offer')}>
            What We Offer
          </Button>
          <Button variant="nav" onClick={() => navigate('/community')}>
            Community
          </Button>
          <Button variant="nav" onClick={() => navigate('/support')}>
            Support
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-sm">
            <label htmlFor="language" className="sr-only">Select language</label>
            <select
              id="language"
              name="language"
              className="bg-black text-white border border-border rounded px-2 py-1 focus:outline-none focus:ring focus:border-primary"
              defaultValue="us"
              onChange={(e) => {
                const lang = e.target.value;
                // TODO: Implement language switch logic here
                console.log("Selected language:", lang);
              }}
            >
              <option value="us">🇺🇸 US</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="es">🇪🇸 ES</option>
              <option value="de">🇩🇪 DE</option>
              <option value="cn">🇨🇳 CN</option>
              <option value="jp">🇯🇵 JP</option>
            </select>
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