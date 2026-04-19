import React from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Package, TrendingUp, AlertTriangle, ChevronRight, QrCode, Activity } from "lucide-react";

export function AxiomDashboardMobile() {
  const { data: inventory } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-32">
      <div className="mb-8">
        <h1 className="headline text-2xl font-extrabold text-slate-900 tracking-tight">System <span className="text-blue-700">Overview</span></h1>
        <p className="text-slate-500 text-sm mt-1">Real-time enterprise inventory tracking active.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Total Units", val: "4,821", change: "+12.5%", icon: <Package size={18} className="text-blue-700" />, color: "blue" },
          { label: "Asset Value", val: "$84,200", change: "LIVE", icon: <TrendingUp size={18} className="text-slate-600" />, color: "slate" },
          { label: "Low Stock", val: "03", change: "CRITICAL", icon: <AlertTriangle size={18} className="text-red-600" />, color: "red" },
          { label: "24h Trans", val: "182", change: "", icon: <Activity size={18} className="text-slate-600" />, color: "slate" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50' : stat.color === 'red' ? 'bg-red-50' : 'bg-slate-50'}`}>
                {stat.icon}
              </div>
              {stat.change && <span className={`text-[10px] font-bold px-2 py-1 rounded ${stat.color === 'blue' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{stat.change}</span>}
            </div>
            <div>
              <div className="text-2xl font-bold headline text-slate-900">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Stock_Movement_Flow</h3>
        </div>
        <div className="h-32 w-full min-h-0 min-w-0">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={[{v:10},{v:30},{v:20},{v:50},{v:15},{v:60}]}>
               <Area type="monotone" dataKey="v" stroke="#1d4ed8" strokeWidth={3} fill="#1d4ed810" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>00:00</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Active_Inventory</h3>
          <button className="text-[11px] font-bold text-blue-700">VIEW FULL LEDGER</button>
        </div>
        {Array.isArray(inventory) && inventory.map(item => (
          <div key={item.id} className={`bg-white border-l-4 p-4 rounded-r-xl shadow-sm flex items-center justify-between ${
            item.status === 'CRITICAL' ? 'border-red-500' : 'border-blue-600'
          }`}>
             <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-slate-50 flex items-center justify-center rounded-lg">
                  <img src={item.image_url} className="w-full h-full object-cover rounded opacity-80" />
                </div>
                <div>
                   <div className="headline text-sm font-bold text-slate-900">{item.name}</div>
                   <div className="text-[10px] text-slate-500 font-medium tracking-tight">UUID: {item.sku}</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-sm font-bold text-slate-900">{item.quantity} <span className="text-[10px] font-medium text-slate-400">Units</span></div>
                <div className={`text-[9px] font-bold uppercase tracking-wider ${item.status === 'CRITICAL' ? 'text-red-500' : 'text-emerald-600'}`}>{item.status}</div>
                <div className="mt-2 flex gap-1 justify-end">
                   <button onClick={() => navigate("/axiom/inventory", { state: { transition: "push" } })} className="text-[8px] border border-slate-200 px-1 py-0.5 text-slate-400 uppercase font-bold"><span>Inventory</span></button>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button className="relative w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-700/30">
           <QrCode size={24} />
        </button>
      </div>
    </div>
  );
}

