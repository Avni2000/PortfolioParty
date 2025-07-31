// components/Layout.tsx
import Navigation from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 px-4">{children}</main>
        <footer className="bg-background border-t border-border py-6 text-center text-sm text-muted-foreground">
        © 2025 Portfolio Party. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;