
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Explore from "./pages/Explore";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import SalonServices from "./pages/SalonServices";
import TeamMembers from "./pages/TeamMembers";
import Unauthorized from "./pages/Unauthorized";
import SalonSearch from "./pages/SalonSearch";
import Settings from "./pages/Settings";
import BusinessHours from "./pages/BusinessHours";
import PaymentMethods from "./pages/PaymentMethods";
import Notifications from "./pages/Notifications";
import Security from "./pages/Security";
import Appearance from "./pages/Appearance";

// Create a QueryClient
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/salon/services" element={<SalonServices />} />
              <Route path="/team" element={<TeamMembers />} />
              <Route path="/search" element={<SalonSearch />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/business-hours" element={<BusinessHours />} />
              <Route path="/settings/payment-methods" element={<PaymentMethods />} />
              <Route path="/settings/notifications" element={<Notifications />} />
              <Route path="/settings/security" element={<Security />} />
              <Route path="/settings/appearance" element={<Appearance />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
