import React from "react";
import { User, Mail, Shield, Clock, Key, CreditCard, Bell } from "lucide-react";

export function ProfilePage({ theme = "neon" }: { theme?: "neon" | "axiom" }) {
  const user = {
    name: "Alex Chen",
    role: "System Administrator",
    email: "alex.chen@neoncore.sys",
    joined: "2024-01-12",
    id: "OP-8492",
    status: "Active",
  };

  if (theme === "axiom") {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Operator Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-slate-50 overflow-hidden shadow-sm mb-4">
                <img src="https://picsum.photos/seed/axiom-user/200/200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-sm font-medium text-slate-500 mb-4">{user.role}</p>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {user.status}
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Quick Actions</h3>
               <div className="space-y-2">
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                   <span className="flex items-center gap-3 text-sm font-medium"><Key size={16} /> Change Password</span>
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                   <span className="flex items-center gap-3 text-sm font-medium"><Bell size={16} /> Notification Settings</span>
                 </button>
               </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                  <div className="flex items-center gap-3 text-slate-900 font-medium">
                    <User size={18} className="text-blue-600" /> {user.name}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                  <div className="flex items-center gap-3 text-slate-900 font-medium">
                    <Mail size={18} className="text-blue-600" /> {user.email}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Operator ID</p>
                  <div className="flex items-center gap-3 text-slate-900 font-mono text-sm">
                    <Shield size={18} className="text-blue-600" /> {user.id}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Joined Date</p>
                  <div className="flex items-center gap-3 text-slate-900 font-medium">
                    <Clock size={18} className="text-blue-600" /> {user.joined}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">System Preferences</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <div>
                     <p className="font-bold text-slate-900 text-sm">Two-Factor Authentication</p>
                     <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                   </div>
                   <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-800 transition-colors">Enable</button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Neon Theme
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
         <h1 className="text-2xl font-black font-headline uppercase tracking-widest text-[#ff2d78] neon-glow-text-primary mb-1">Operator_Profile</h1>
         <p className="font-label text-xs uppercase tracking-widest text-slate-500">System Access: GRANTED</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.05)] flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-2 border-[#ff2d78] p-1 overflow-hidden shadow-[0_0_15px_rgba(255,45,120,0.3)] mb-4 bg-black">
              <img src="https://picsum.photos/seed/user/200/200" alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-xl font-bold font-headline text-white tracking-tight">{user.name}</h2>
            <p className="text-xs font-label uppercase tracking-widest text-slate-400 mb-4">{user.role}</p>
            <span className="bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
              {user.status}
            </span>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-white/5">
             <h3 className="text-[10px] font-bold font-label text-slate-500 uppercase tracking-widest mb-4">System Actions</h3>
             <div className="space-y-2">
               <button className="w-full flex items-center justify-between p-3 bg-black/40 border border-white/5 hover:border-[#ff2d78]/50 rounded text-slate-300 hover:text-white transition-all group">
                 <span className="flex items-center gap-3 text-[11px] font-label uppercase tracking-widest"><Key size={14} className="text-[#ff2d78] group-hover:shadow-[0_0_10px_#ff2d78]" /> Security_Key</span>
               </button>
               <button className="w-full flex items-center justify-between p-3 bg-black/40 border border-white/5 hover:border-[#00ffcc]/50 rounded text-slate-300 hover:text-white transition-all group">
                 <span className="flex items-center gap-3 text-[11px] font-label uppercase tracking-widest"><Bell size={14} className="text-[#00ffcc] group-hover:shadow-[0_0_10px_#00ffcc]" /> Alerts</span>
               </button>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold font-headline uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#ff2d78]"></span> Personal_Data
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold font-label text-slate-500 uppercase tracking-widest mb-2">Operator Name</p>
                <div className="flex items-center gap-3 text-white text-sm">
                  <User size={16} className="text-[#00ffcc]" /> {user.name}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold font-label text-slate-500 uppercase tracking-widest mb-2">Comms Channel</p>
                <div className="flex items-center gap-3 text-white text-sm">
                  <Mail size={16} className="text-[#00ffcc]" /> {user.email}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold font-label text-slate-500 uppercase tracking-widest mb-2">Sys_ID</p>
                <div className="flex items-center gap-3 text-white font-mono text-xs">
                  <Shield size={16} className="text-[#ff2d78]" /> {user.id}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold font-label text-slate-500 uppercase tracking-widest mb-2">Init Date</p>
                <div className="flex items-center gap-3 text-white text-sm font-mono text-xs">
                  <Clock size={16} className="text-[#ff2d78]" /> {user.joined}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold font-headline uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#00ffcc]"></span> Config_Protocol
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-white/5 hover:border-[#ff2d78]/30 transition-colors">
                 <div>
                   <p className="font-bold text-white text-xs font-headline uppercase tracking-widest">2FA Security</p>
                   <p className="text-[10px] font-label text-slate-500 mt-1 uppercase tracking-wider">Require secondary token.</p>
                 </div>
                 <button className="bg-transparent border border-[#ff2d78] text-[#ff2d78] hover:bg-[#ff2d78]/10 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(255,45,120,0.1)]">Enable_2FA</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
