// components/Layout.tsx
import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 px-4">{children}</main>
    </div>
  );
};

export default Layout;