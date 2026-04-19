import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ReceiptText, BarChart3, HelpCircle, LogOut, Bell, Settings, Search, Plus, Map, Archive, Palette } from "lucide-react";
import { useDispatch } from "react-redux";
import { setTheme } from "../store";

import { useMediaQuery } from "../hooks/useMediaQuery";

export function AxiomLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", id: "Axiom-Dash-Desktop", icon: <LayoutDashboard size={20} />, path: "/dashboard", transition: "push_back" as const },
    { name: "Inventory", id: "Axiom-Inv-Desktop", icon: <Package size={20} />, path: "/inventory", transition: "push" as const },
  ];

  if (isMobile) {
    return (
      <div className="theme-axiom min-h-screen font-body flex flex-col overflow-x-hidden">
        <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 w-full flex justify-between items-center px-6 py-4 shadow-[0_12px_32px_-4px_rgba(0,72,141,0.08)]">
           <div className="flex items-center gap-3">
             <LayoutDashboard size={24} className="text-slate-600" />
             <span className="text-xl font-bold tracking-tighter text-blue-800 headline">AXIOM_LEDGER</span>
           </div>
           <div className="flex items-center gap-4">
             <div className="relative">
               <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-slate-500 hover:text-blue-600 transition-colors">
                 <Palette size={20} />
               </button>
               {isThemeMenuOpen && (
                 <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                   <button onClick={() => { dispatch(setTheme("neon")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50">Neon Tokyo</button>
                   <button onClick={() => { dispatch(setTheme("axiom")); setIsThemeMenuOpen(false); }} className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50">Axiom Ledger</button>
                 </div>
               )}
             </div>
             <Bell size={20} className="text-slate-500" />
             <div className="relative">
               <div 
                 className="w-9 h-9 rounded-full border border-slate-200 overflow-hidden shadow-sm cursor-pointer"
                 onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
               >
                 <img src="https://picsum.photos/seed/axiom-user/100/100" className="w-full h-full object-cover" />
               </div>
               {isProfileMenuOpen && (
                 <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/profile', { state: { transition: "push" } }); }} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors">My Profile</button>
                   <button onClick={() => { setIsProfileMenuOpen(false); navigate('/login', { state: { transition: "push_back" } }); }} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                 </div>
               )}
             </div>
           </div>
        </header>
        <main className="flex-1 pt-6 px-4 pb-24">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 flex justify-around items-center py-3 px-2 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <Link to="/dashboard" state={{ transition: "none" }} className="flex flex-col items-center gap-1 text-blue-700">
            <LayoutDashboard size={20} />
            <span><span>Dash</span></span>
          </Link>
          <Link to="/inventory" state={{ transition: "none" }} className="flex flex-col items-center gap-1 text-slate-400">
            <Archive size={20} />
            <span><span>Vault</span></span>
          </Link>
          <button key="grid-view" onClick={() => navigate("/dashboard", { state: { transition: "push_back" } })} className="flex flex-col items-center gap-1 text-slate-400">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="hidden">Grid</span>
          </button>
          <button className="relative -top-6 w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-700/30">
             <Plus />
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="theme-axiom min-h-screen font-body flex bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-100 p-6 space-y-8 border-r border-slate-200 z-50 flex flex-col">
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white">
              <Map size={24} />
            </div>
            <div>
              <h2 className="font-black text-slate-900 leading-none">Global Logistics</h2>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Enterprise Tier</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              state={{ transition: item.transition }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-out ${
                location.pathname === item.path
                  ? "text-blue-700 font-bold bg-white shadow-sm"
                  : "text-slate-500 hover:text-blue-600 hover:pl-6"
              }`}
            >
              {item.icon}
              <span><span>{item.name}</span></span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <button className="w-full py-3 bg-blue-700 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-700/20 transition-all">
            Create New Entry
          </button>
          <div className="pt-6 border-t border-slate-200 space-y-3">
             <a href="#" className="flex items-center gap-3 text-slate-500 hover:text-blue-600">
               <HelpCircle size={16} />
               <span className="text-[11px] uppercase tracking-widest">Help Center</span>
             </a>
             <button onClick={() => navigate('/login', { state: { transition: "push_back" } })} className="w-full flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors">
               <LogOut size={16} />
               <span className="text-[11px] uppercase tracking-widest">Logout</span>
             </button>
          </div>
        </div>
      </aside>
      <div className="ml-64 flex-1 flex flex-col">
         <header className="w-full sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(0,72,141,0.08)] flex justify-between items-center px-8 py-4">
           <div className="flex items-center gap-12">
             <h1 className="text-xl font-bold tracking-tighter text-blue-800 headline">AXIOM_LEDGER</h1>
             <div className="flex items-center bg-white border border-slate-200 rounded-lg px-4 py-2 w-96 shadow-sm">
               <Search size={18} className="text-slate-400 mr-2" />
               <input className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400 w-full" placeholder="Search inventory, batches, or shipping IDs..." />
             </div>
           </div>
           <div className="flex items-center gap-6">
             <div className="relative">
               <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="text-slate-500 hover:text-blue-600 transition-colors">
                 <Palette size={20} />
               </button>
               {isThemeMenuOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                   <button onClick={() => { dispatch(setTheme("neon")); setIsThemeMenuOpen(false); }} className="w-full text-left px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50">Neon Tokyo</button>
                   <button onClick={() => { dispatch(setTheme("axiom")); setIsThemeMenuOpen(false); }} className="w-full text-left px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50">Axiom Ledger</button>
                 </div>
               )}
             </div>
             <Bell size={20} className="text-slate-500 hover:text-blue-700 cursor-pointer" />
             <Settings size={20} className="text-slate-500 hover:text-blue-700 cursor-pointer" />
             <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-slate-900">Alex Chen</p>
                 <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Ops Manager</p>
               </div>
               <div className="relative">
                 <div 
                   className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer"
                   onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                 >
                   <img src="https://picsum.photos/seed/axiom-user/100/100" className="w-full h-full object-cover" />
                 </div>
                 {isProfileMenuOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                     <button onClick={() => { setIsProfileMenuOpen(false); navigate('/profile', { state: { transition: "push" } }); }} className="w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors">My Profile</button>
                     <button onClick={() => { setIsProfileMenuOpen(false); navigate('/login', { state: { transition: "push_back" } }); }} className="w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                   </div>
                 )}
               </div>
             </div>
           </div>
        </header>
        <main className="flex-1 p-8 overflow-x-hidden">
           {children}
        </main>
      </div>
    </div>
  );
}
