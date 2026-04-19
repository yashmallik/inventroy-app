import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ReceiptText, BarChart3, HelpCircle, LogOut, Bell, Settings, Search, Plus, Archive, Palette } from "lucide-react";
import { useDispatch } from "react-redux";
import { setTheme } from "../store";

import { useMediaQuery } from "../hooks/useMediaQuery";

export function NeonLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", id: "Dash-Desktop", icon: <LayoutDashboard size={20} />, path: "/dashboard", transition: "push_back" as const },
    { name: "Inventory", id: "Inv-Desktop", icon: <Package size={20} />, path: "/inventory", transition: "push" as const },
  ];

  if (isMobile) {
    return (
      <div className="theme-neon min-h-screen font-body flex flex-col">
        <header className="fixed top-0 z-50 w-full bg-[#0a0a12]/80 backdrop-blur-md border-b border-[#ff2d78]/30 px-6 py-3 flex justify-between items-center transition-all">
          <div className="flex items-center gap-4">
            <button key="menu-btn" onClick={() => navigate("/dashboard", { state: { transition: "push_back" } })} className="text-[#ff2d78]">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-xl font-bold tracking-tighter text-[#ff2d78] headline neon-glow-text-primary">NEON_CORE_INV</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
               <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-slate-400 hover:text-[#00ffcc] transition-colors">
                 <Palette size={20} />
               </button>
               {isThemeMenuOpen && (
                 <div className="absolute right-0 mt-2 w-40 bg-[#0a0a12] border border-[#ff2d78]/30 rounded shadow-[0_0_15px_rgba(255,45,120,0.2)] py-1 z-50">
                   <button onClick={() => { dispatch(setTheme("neon")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[10px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78]">Neon Tokyo</button>
                   <button onClick={() => { dispatch(setTheme("axiom")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[10px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78]">Axiom Ledger</button>
                 </div>
               )}
             </div>
             <Bell size={20} className="text-slate-400" />
             <div className="relative">
               <div 
                 className="w-8 h-8 rounded-full border border-primary overflow-hidden cursor-pointer"
                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
               >
                 <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full object-cover" />
               </div>
               {isProfileMenuOpen && (
                 <div className="absolute right-0 mt-2 w-36 bg-[#0a0a12] border border-[#ff2d78]/30 rounded shadow-[0_0_15px_rgba(255,45,120,0.2)] py-1 z-50">
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/profile', { state: { transition: "push" } }); }} className="w-full text-left px-4 py-2 text-[10px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78] transition-colors">My Profile</button>
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/login', { state: { transition: "push_back" } }); }} className="w-full text-left px-4 py-2 text-[10px] font-label uppercase tracking-widest text-slate-400 hover:bg-[#ff2d78]/10 hover:text-[#ff2d78] transition-colors">Logout</button>
                 </div>
               )}
             </div>
          </div>
        </header>
        <main className="flex-1 pt-20 pb-24 px-4 overflow-x-hidden">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a12]/95 backdrop-blur-lg border-t border-white/5 flex justify-around items-center py-4 px-4 z-50">
          <Link to="/inventory" state={{ transition: "none" }} className="flex flex-col items-center gap-1 text-slate-400">
            <Archive size={20} />
            <span><span className="hidden">Vault</span>Vault</span>
          </Link>
          <Link to="/inventory" state={{ transition: "push" }} className="flex flex-col items-center gap-1 text-slate-400">
            <Package size={20} />
            <span><span>Inventory</span></span>
          </Link>
          <Link to="/dashboard" state={{ transition: "none" }} className="flex flex-col items-center gap-1 text-[#ff2d78]">
            <LayoutDashboard size={20} />
            <span><span>Dash</span></span>
          </Link>
          <button className="relative -top-6 w-14 h-14 bg-[#0a0a12] border-2 border-primary rounded-full flex items-center justify-center text-primary shadow-[0_0_20px_rgba(255,45,120,0.4)]">
             <Plus />
          </button>
        </nav>
      </div>
    );
  }


  return (
    <div className="theme-neon min-h-screen font-body flex">
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0a12] border-r border-[#ff2d78]/20 py-6 pt-20 z-40 flex flex-col">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#00ffcc]"></div>
            <div>
              <h2 className="text-lg font-black text-[#ff2d78] font-headline">NEON_OS</h2>
              <p className="font-label uppercase tracking-widest text-[10px] text-slate-500">v2.0.8_OPERATIONAL</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              state={{ transition: item.transition }}
              className={`flex items-center gap-4 px-4 py-3 rounded text-[11px] font-label uppercase tracking-widest transition-all ${
                location.pathname === item.path 
                  ? "bg-[#ff2d78]/10 text-[#ff2d78] border-r-2 border-[#ff2d78] shadow-[0_0_15px_rgba(255,45,120,0.2)]" 
                  : "text-slate-500 hover:text-[#00ffcc] hover:bg-slate-800/40"
              }`}
            >
              {item.icon}
              <span><span>{item.name}</span></span>
            </Link>
          ))}
          <button 
             onClick={() => navigate("/dashboard", { state: { transition: "none" } })}
             className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white transition-all uppercase text-[11px] font-label tracking-widest"
          >
             <BarChart3 size={20} />
             <span><span>Stats</span></span>
          </button>
        </nav>
        <div className="px-6 mt-6">
          <button className="w-full bg-transparent border border-primary text-primary font-label text-[10px] tracking-widest py-3 hover:bg-primary/10 transition-all">
            ADD_STOCK
          </button>
        </div>
        <div className="mt-auto px-3 border-t border-slate-800 pt-4">
          <a href="#" className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-300">
            <HelpCircle size={20} />
            <span className="font-label uppercase tracking-widest text-[11px]">Support</span>
          </a>
          <button onClick={() => navigate('/login', { state: { transition: "push_back" } })} className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-300">
            <LogOut size={20} />
            <span className="font-label uppercase tracking-widest text-[11px]">Logout</span>
          </button>
        </div>
      </aside>
      <div className="ml-64 flex-1 flex flex-col">
        <header className="fixed top-0 left-64 right-0 z-40 bg-[#0a0a12]/80 backdrop-blur-md border-b border-[#ff2d78]/30 px-6 py-4 flex justify-between items-center shadow-[0_0_15px_rgba(255,45,120,0.1)]">
           <div className="flex items-center gap-8">
             <h1 className="text-xl font-bold tracking-tighter text-[#ff2d78] headline neon-glow-text-primary">NEON_CORE_INV</h1>
             <div className="flex items-center bg-zinc-900 rounded-full px-4 py-1.5 border border-zinc-700/50">
               <Search size={14} className="text-slate-400 mr-2" />
               <input className="bg-transparent border-none focus:ring-0 text-xs font-label uppercase tracking-wider text-on-surface-variant w-64" placeholder="QUERY_DATABASE..." />
             </div>
           </div>
           <div className="flex items-center gap-6">
             <div className="relative">
               <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-white hover:text-[#00ffcc] transition-colors">
                 <Palette size={20} />
               </button>
               {isThemeMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-[#0a0a12] border border-[#ff2d78]/30 rounded-lg shadow-[0_0_15px_rgba(255,45,120,0.2)] py-2 z-50">
                   <button onClick={() => { dispatch(setTheme("neon")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[11px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78]">Neon Tokyo</button>
                   <button onClick={() => { dispatch(setTheme("axiom")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[11px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78]">Axiom Ledger</button>
                 </div>
               )}
             </div>
             <Bell size={20} className="text-white hover:text-secondary cursor-pointer" />
             <Settings size={20} className="text-white hover:text-secondary cursor-pointer" />
             <div className="relative">
               <div 
                 className="w-8 h-8 rounded-full border border-primary overflow-hidden cursor-pointer"
                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
               >
                 <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full object-cover" />
               </div>
               {isProfileMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-[#0a0a12] border border-[#ff2d78]/30 rounded-lg shadow-[0_0_15px_rgba(255,45,120,0.2)] py-2 z-50">
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/profile', { state: { transition: "push" } }); }} className="w-full text-left px-4 py-2 text-[11px] font-label uppercase tracking-widest text-white hover:bg-[#ff2d78]/10 hover:text-[#ff2d78] transition-colors">My Profile</button>
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/login', { state: { transition: "push_back" } }); }} className="w-full text-left px-4 py-2 text-[11px] font-label uppercase tracking-widest text-slate-400 hover:bg-[#ff2d78]/10 hover:text-[#ff2d78] transition-colors">Logout</button>
                 </div>
               )}
             </div>
           </div>
        </header>
        <main className="pt-24 p-6 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
