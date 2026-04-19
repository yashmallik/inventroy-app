import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { NeonDashboardMobile } from "./NeonDashboardMobile";
import { useInventory } from "../hooks/useInventory";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Bolt, Filter } from "lucide-react";

const chartData = [
  { time: "06:00", outflow: 1200 },
  { time: "09:00", outflow: 1800 },
  { time: "12:00", outflow: 1400 },
  { time: "15:00", outflow: 2420 },
  { time: "18:00", outflow: 2000 },
  { time: "21:00", outflow: 2600 },
  { time: "00:00", outflow: 1500 },
];

export function NeonDashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: inventory } = useInventory();

  if (isMobile) {
    return <NeonDashboardMobile />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface neon-border-pink p-5 rounded-lg relative overflow-hidden group">
          <p className="font-label text-[10px] tracking-widest text-slate-400 mb-1">TOTAL_STOCK</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black font-headline neon-glow-text-primary">12,842</h3>
            <span className="text-[#00ffcc] text-xs font-label pb-1">+2.4%</span>
          </div>
        </div>
        <div className="bg-surface neon-border-pink p-5 rounded-lg relative overflow-hidden border-l-4 border-l-tertiary">
          <p className="font-label text-[10px] tracking-widest text-slate-400 mb-1">LOW_STOCK_ALERTS</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black font-headline text-tertiary drop-shadow-[0_0_8px_rgba(255,224,74,0.4)]">24</h3>
            <span className="text-error text-xs font-label pb-1 lowercase">critical</span>
          </div>
        </div>
        <div className="bg-surface neon-border-pink p-5 rounded-lg relative overflow-hidden">
          <p className="font-label text-[10px] tracking-widest text-slate-400 mb-1">DAILY_TRANSACTIONS</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black font-headline text-[#00ffcc] neon-glow-text-secondary">842</h3>
            <span className="text-slate-500 text-xs font-label pb-1">VOL_NORMAL</span>
          </div>
        </div>
        <div className="bg-[#ff2d78]/10 border border-[#ff2d78]/40 p-5 rounded-lg relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Bolt size={14} className="text-[#ff2d78]" />
            <p className="font-label text-[10px] tracking-widest text-[#ff2d78]">AI_INSIGHTS</p>
          </div>
          <p className="text-[11px] leading-tight text-white/80 italic font-body">Optimize "Hyper-Core" reserves before the 24:00 demand spike.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold font-headline tracking-tight uppercase">Stock_Movement</h2>
              <p className="text-xs text-slate-500 font-label">UNIT_FLOW_ANALYSIS_24H</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-black border border-zinc-700 px-3 py-1 text-[10px] font-label text-slate-400 hover:border-primary">1D</button>
              <button className="bg-black border border-primary px-3 py-1 text-[10px] font-label text-primary shadow-[0_0_8px_rgba(255,45,120,0.2)]">1W</button>
              <button className="bg-black border border-zinc-700 px-3 py-1 text-[10px] font-label text-slate-400">1M</button>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-0 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff2d78" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff2d78" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #ff2d78", fontSize: "12px" }}
                  labelStyle={{ color: "#8E9299" }}
                />
                <Area type="monotone" dataKey="outflow" stroke="#ff2d78" fillOpacity={1} fill="url(#colorOutflow)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-xl p-5 relative overflow-hidden">
             <h2 className="text-sm font-bold font-headline mb-4 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1.5 h-4 bg-primary"></span>
                Predictive_Reorder
             </h2>
             <div className="space-y-4">
                <div className="p-3 bg-black border border-white/5 rounded group hover:border-primary/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold">CYBER_DRIVE_X2</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-error/20 text-error border border-error/30">PRIORITY_H</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">Inventory depletion expected in <span className="text-tertiary">14 hours</span>.</p>
                  <button className="w-full py-1.5 bg-black border border-zinc-700 text-[10px] font-label uppercase tracking-widest text-slate-300 hover:text-primary hover:border-primary">APPROVE_PO_#842</button>
                </div>
                <div className="p-3 bg-black border border-white/5 rounded group hover:border-[#00ffcc]/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold">NEON_FLUX_COIL</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#00ffcc]/20 text-[#00ffcc] border border-[#00ffcc]/30">OPTIMIZATION</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">Excess stock detected. Reduce weekly order by <span className="text-[#00ffcc]">15%</span>.</p>
                  <button className="w-full py-1.5 bg-black border border-zinc-700 text-[10px] font-label uppercase tracking-widest text-slate-300 hover:text-[#00ffcc] hover:border-[#00ffcc]">ADJUST_SCHEDULE</button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <section className="bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold font-headline tracking-tight uppercase">LIVE_INVENTORY_FEED</h2>
            <p className="text-[10px] text-slate-500 font-label">REALTIME_SYNC_OPERATIONAL</p>
          </div>
          <div className="flex gap-2">
            <select className="bg-black border border-zinc-700 text-[10px] font-label tracking-widest text-slate-400 px-3 py-2 rounded focus:ring-1 focus:ring-primary uppercase">
              <option>ALL_CATEGORIES</option>
            </select>
            <button className="bg-black border border-zinc-700 px-3 py-2 text-[10px] font-label text-slate-400 flex items-center gap-2 hover:text-primary transition-all uppercase">
              <Filter size={14} /> SORT
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-slate-400 uppercase">ID</th>
                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-slate-400 uppercase">PRODUCT_NAME</th>
                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-slate-400 uppercase">CATEGORY</th>
                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-slate-400 uppercase text-right">QUANTITY</th>
                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-slate-400 uppercase">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.isArray(inventory) && inventory.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-label text-[11px] text-slate-500">#{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-800 border border-white/5 flex items-center justify-center">
                        <img src={item.image_url} className="w-full h-full object-cover rounded" />
                      </div>
                      <span className="text-xs font-bold text-white tracking-tight">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-400 uppercase">{item.category}</td>
                  <td className="px-6 py-4 text-[11px] text-white text-right font-bold">{item.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                      item.status === "STABLE" || item.status === "OPTIMAL" ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30" : "bg-error/10 text-error border border-error/30"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
