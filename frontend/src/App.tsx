import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path = '/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/what-we-offer" element={<WhatWeOffer />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/gold" element={<Gold />} />
          <Route path="/legend" element={<Legend />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
