import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; 
import Dashboard from "./pages/Dashboard";
import WhatWeOffer from "./pages/WhatWeOffer";
import Strategies from "./pages/Strategies";
import Gold from "./pages/Gold";
import Legend from "./pages/Legend";
import Learn from "./pages/Learn";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const ProtectedDashboard = () => {
  const { isSignedIn, currentUser } = useAuth();
  
  console.log('🛡️ ProtectedDashboard render - isSignedIn:', isSignedIn, 'user:', currentUser?.email);
  
  // Redirect to login if not signed in
  if (!isSignedIn) {
    console.log('❌ User not signed in, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  return <Dashboard />;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path = '/login' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedDashboard />} />
            <Route path="/what-we-offer" element={<WhatWeOffer />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/gold" element={<Gold />} />
            <Route path="/legend" element={<Legend />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
