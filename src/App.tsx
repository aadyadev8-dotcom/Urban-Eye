import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewComplaintCategoryPage from "./pages/NewComplaintCategoryPage";
import AddComplaintMediaPage from "./pages/AddComplaintMediaPage";
import SplashPage from "./pages/SplashPage"; // Import the new SplashPage
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} /> {/* Set SplashPage as the initial route */}
          <Route path="/home" element={<HomePage />} /> {/* HomePage is now at /home */}
          <Route path="/new-complaint-category" element={<NewComplaintCategoryPage />} />
          <Route path="/new-complaint-media" element={<AddComplaintMediaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;