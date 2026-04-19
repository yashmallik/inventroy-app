import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { AxiomDashboardMobile } from "./AxiomDashboardMobile";
import { useInventory } from "../hooks/useInventory";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, AlertTriangle, Activity, Sparkles, Download } from "lucide-react";

export function AxiomDashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: inventory } = useInventory();

  if (isMobile) {
    return <AxiomDashboardMobile />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Total Stock Units</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-900">12,842</h3>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">+2.4%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Low Stock Alerts</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-900">24</h3>
            <span className="text-amber-700 text-[10px] font-bold uppercase tracking-widest">Action Required</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Daily Volume</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-900">842</h3>
            <span className="text-slate-400 text-[10px] font-medium">Within Range</span>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-blue-700" />
            <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">AI Insights</p>
          </div>
          <p className="text-xs leading-relaxed text-blue-900/80 font-medium">Inventory velocity indicates "Hyper-Core" depletion within 24h. Recommend restocking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Stock Flow Analysis</h2>
              <p className="text-sm text-slate-500">Inventory movement over the last 7 business days</p>
            </div>
            <div className="flex p-1 bg-slate-100 rounded-lg">
              {['1D', '1W', '1M'].map(t => (
                <button key={t} className={`px-4 py-1.5 text-xs font-bold transition-all rounded ${t === '1W' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-[320px] w-full min-h-0 min-w-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[
                 { day: 'Mon', val: 2100 },
                 { day: 'Tue', val: 2420 },
                 { day: 'Wed', val: 2200 },
                 { day: 'Thu', val: 2600 },
                 { day: 'Fri', val: 2300 },
                 { day: 'Sat', val: 2100 },
                 { day: 'Sun', val: 2500 },
               ]}>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Area type="monotone" dataKey="val" stroke="#1d4ed8" strokeWidth={3} fill="#1d4ed810" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              Predictive Reorders
            </h2>
            <div className="space-y-4">
              {['Cyber Drive X2', 'Neon Flux Coil'].map(name => (
                <div key={name} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${name.includes('Drive') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {name.includes('Drive') ? 'Critical' : 'Optimize'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">Action required based on velocity.</p>
                  <button className="w-full py-2 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded hover:border-blue-600 hover:text-blue-600 transition-all">Action</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden group">
             <div className="relative z-10">
               <h3 className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">Efficiency Report</h3>
               <p className="text-sm text-slate-300 mb-6 font-body">Logistics efficiency increased by 12% across nodes.</p>
               <button className="flex items-center gap-2 text-white font-bold text-xs hover:text-blue-400">
                  Download Analysis <Download size={14} />
               </button>
             </div>
          </div>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Global Inventory Feed</h2>
            <p className="text-sm text-slate-500 font-medium">Real-time synchronization active.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Serial ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product Name</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Quantity</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.isArray(inventory) && inventory.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">#{item.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <img src={item.image_url} className="w-full h-full object-cover rounded opacity-80" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-900 text-right">{item.quantity}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'STABLE' || item.status === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
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
