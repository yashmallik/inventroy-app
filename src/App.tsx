import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { store, RootState } from "./store";

// Pages
import { NeonDashboard } from "./pages/NeonDashboard";
import { NeonDashboardMobile } from "./pages/NeonDashboardMobile";
import { NeonInventory } from "./pages/NeonInventory";
import { NeonInventoryMobile } from "./pages/NeonInventoryMobile";
import { AxiomDashboard } from "./pages/AxiomDashboard";
import { AxiomDashboardMobile } from "./pages/AxiomDashboardMobile";
import { AxiomInventory } from "./pages/AxiomInventory";
import { AxiomInventoryMobile } from "./pages/AxiomInventoryMobile";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";

// Layouts
import { NeonLayout } from "./components/NeonLayout";
import { AxiomLayout } from "./components/AxiomLayout";

const queryClient = new QueryClient();

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [direction, setDirection] = useState<"push" | "push_back" | "none">("none");

  useEffect(() => {
    const state = location.state as { transition?: "push" | "push_back" | "none" };
    setDirection(state?.transition || "none");
  }, [location]);

  const variants = {
    initial: (dir: string) => ({
      x: dir === "push" ? "100%" : dir === "push_back" ? "-100%" : 0,
      opacity: dir === "none" ? 0 : 1,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 } as any,
    },
    exit: (dir: string) => ({
      x: dir === "push" ? "-100%" : dir === "push_back" ? "100%" : 0,
      opacity: dir === "none" ? 0 : 1,
      transition: { duration: 0.3 } as any,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={location.pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        
        {/* Unified Routes */}
        <Route path="/dashboard" element={
          theme === "neon" ? (
            <NeonLayout><PageTransition><NeonDashboard /></PageTransition></NeonLayout>
          ) : (
            <AxiomLayout><PageTransition><AxiomDashboard /></PageTransition></AxiomLayout>
          )
        } />
        
        <Route path="/inventory" element={
          theme === "neon" ? (
            <NeonLayout><PageTransition><NeonInventory /></PageTransition></NeonLayout>
          ) : (
            <AxiomLayout><PageTransition><AxiomInventory /></PageTransition></AxiomLayout>
          )
        } />
        
        <Route path="/profile" element={
          theme === "neon" ? (
            <NeonLayout><PageTransition><ProfilePage theme="neon" /></PageTransition></NeonLayout>
          ) : (
            <AxiomLayout><PageTransition><ProfilePage theme="axiom" /></PageTransition></AxiomLayout>
          )
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
