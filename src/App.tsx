import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import Profissionais from "./pages/Profissionais.tsx";
import Clinicas from "./pages/Clinicas.tsx";
import EmpresasSST from "./pages/EmpresasSST.tsx";
import EmpresasEPI from "./pages/EmpresasEPI.tsx";
import ProviderProfile from "./pages/ProviderProfile.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import CodeOfConduct from "./pages/CodeOfConduct.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/conta" element={<Account />} />
            <Route path="/profissionais" element={<Profissionais />} />
            <Route path="/clinicas" element={<Clinicas />} />
            <Route path="/empresas-sst" element={<EmpresasSST />} />
            <Route path="/empresas-epi" element={<EmpresasEPI />} />
            <Route path="/p/:id" element={<ProviderProfile />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
