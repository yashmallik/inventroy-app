import React from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import { TrendingUp, AlertTriangle, History, QrCode, Plus } from "lucide-react";

const chartData = [
  { val: 40 }, { val: 60 }, { val: 90 }, { val: 55 }, { val: 70 },
  { val: 30 }, { val: 45 }, { val: 80 }, { val: 65 }, { val: 95 },
  { val: 40 }, { val: 75 },
];

export function NeonDashboardMobile() {
  const { data: inventory } = useInventory();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-32">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="headline text-3xl font-extrabold text-white tracking-tight">System <span className="text-primary neon-glow-text-primary">Overview</span></h1>
        <p className="text-slate-400 font-medium text-sm">Automated inventory tracking active.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 neon-border-pink p-4 rounded flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-primary"><TrendingUp size={20} /></span>
            <span className="text-[10px] font-label text-secondary font-bold">+12%</span>
          </div>
          <div>
            <div className="text-2xl font-bold headline tracking-tighter">4,821</div>
            <div className="text-[9px] font-label uppercase tracking-tighter text-slate-500">Total Units</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-secondary/30 p-4 rounded flex flex-col justify-between shadow-[inset_0_0_12px_rgba(0,255,204,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-secondary"><TrendingUp size={20} /></span>
            <span className="text-[10px] font-label text-tertiary font-bold">LIVE</span>
          </div>
          <div>
            <div className="text-2xl font-bold headline tracking-tighter">$84.2K</div>
            <div className="text-[9px] font-label uppercase tracking-tighter text-slate-500">Asset Value</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-slate-800 p-4 rounded flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-tertiary"><AlertTriangle size={20} /></span>
            <span className="text-[10px] font-label text-error font-bold">14</span>
          </div>
          <div>
            <div className="text-2xl font-bold headline tracking-tighter">03</div>
            <div className="text-[9px] font-label uppercase tracking-tighter text-slate-500">Low Stock</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-slate-800 p-4 rounded flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500"><History size={20} /></span>
          </div>
          <div>
            <div className="text-2xl font-bold headline tracking-tighter">182</div>
            <div className="text-[9px] font-label uppercase tracking-tighter text-slate-500">24h Trans.</div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 neon-border-pink p-5 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-label uppercase tracking-widest text-[11px] font-bold text-primary">Flow_Analytics</h3>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_#ff2d78]"></div>
            <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_5px_#00ffcc]"></div>
          </div>
        </div>
        <div className="h-40 w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="val" fill="#ff2d78" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-2 text-[9px] font-label text-slate-400 uppercase tracking-tighter">
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>00:00</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="font-label uppercase tracking-widest text-xs font-bold">Active_Inventory</h3>
          <span className="text-[10px] text-secondary font-medium uppercase tracking-widest">View All</span>
        </div>
        {Array.isArray(inventory) && inventory.map(item => (
          <div key={item.id} className={`bg-zinc-900 p-4 border-l-2 flex items-center justify-between ${
            item.status === 'CRITICAL' ? 'border-tertiary' : 'border-primary'
          }`}>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center rounded">
                  <img src={item.image_url} className="w-full h-full object-cover rounded opacity-80" />
                </div>
                <div>
                   <div className="headline text-sm font-bold tracking-tight text-white">{item.name.replace(/ /g, '_')}</div>
                   <div className="font-label text-[10px] text-slate-500 uppercase tracking-tight">SN: {item.sku}</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-sm font-bold headline text-white">{item.quantity} <span className="text-[10px] font-normal text-slate-500">Units</span></div>
                <div className={`text-[9px] font-label uppercase tracking-widest font-bold ${
                   item.status === 'STABLE' || item.status === 'OPTIMAL' ? 'text-secondary neon-glow-text-secondary' : 'text-tertiary'
                }`}>{item.status}</div>
                <div className="mt-2 flex gap-1 justify-end">
                  <button onClick={() => navigate("/inventory", { state: { transition: "push" } })} className="text-[8px] border border-zinc-800 px-1 py-0.5 text-zinc-600"><span>Inventory</span></button>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button className="w-10 h-10 bg-zinc-900 border border-secondary/30 text-secondary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.2)]">
           <QrCode size={20} />
        </button>
        <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,45,120,0.4)]">
           <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
