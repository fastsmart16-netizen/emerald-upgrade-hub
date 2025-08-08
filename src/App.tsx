import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HoistService from "./pages/HoistService";
import CraneService from "./pages/CraneService";
import PanelService from "./pages/PanelService";
import PPMPanelService from "./pages/PPMPanelService";
import HoistCraneTPAService from "./pages/HoistCraneTPAService";
import PLCService from "./pages/PLCService";
import VFDService from "./pages/VFDService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hoist-service" element={<HoistService />} />
          <Route path="/crane-service" element={<CraneService />} />
          <Route path="/panel-service" element={<PanelService />} />
          <Route path="/ppm-panel-service" element={<PPMPanelService />} />
          <Route path="/hoist-crane-tpa-service" element={<HoistCraneTPAService />} />
          <Route path="/plc-service" element={<PLCService />} />
          <Route path="/vfd-service" element={<VFDService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
