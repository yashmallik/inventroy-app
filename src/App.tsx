import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { store, RootState } from "./store";

import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";

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

function ThemedLayout({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const Layout = theme === "neon" ? NeonLayout : AxiomLayout;
  return (
    <Layout>
      <PageTransition>{children}</PageTransition>
    </Layout>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<ThemedLayout><Dashboard /></ThemedLayout>} />
        <Route path="/inventory" element={<ThemedLayout><Inventory /></ThemedLayout>} />
        <Route path="/profile" element={<ThemedLayout><ProfilePage /></ThemedLayout>} />
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
