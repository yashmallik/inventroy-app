import React from "react";
import { useNavigate } from "react-router-dom";
import { useInventory, useUpdateQuantity } from "../hooks/useInventory";
import { Search, Filter, Plus, Minus, ScanLine } from "lucide-react";

export function NeonInventoryMobile() {
  const { data: inventory } = useInventory();
  const updateQty = useUpdateQuantity();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-32">
      <div className="relative flex gap-2">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
          <input className="w-full bg-zinc-900 border-b-2 border-primary/30 text-sm font-label uppercase tracking-widest py-3 pl-10 pr-4 outline-none focus:border-primary" placeholder="SEARCH_INVENTORY" />
        </div>
        <button className="bg-zinc-900 border border-primary/20 px-3 flex items-center justify-center text-secondary">
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 neon-border-pink rounded-lg">
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Stock</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-headline font-bold text-white">1,284</span>
            <span className="text-[10px] text-secondary font-label mb-1">+12.5%</span>
          </div>
        </div>
        <div className="bg-zinc-900 p-4 neon-border-pink border-tertiary/20 rounded-lg">
          <p className="font-label text-[10px] text-slate-500 uppercase tracking-widest mb-1">Low Units</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-headline font-bold text-tertiary">08</span>
            <span className="text-[10px] text-error font-label mb-1 uppercase">Critical</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-headline text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Live_Inventory_Stream</h2>
          <span className="text-[10px] font-label text-secondary animate-pulse">● LIVE_SYNC</span>
        </div>

        {Array.isArray(inventory) && inventory.map(item => (
          <div key={item.id} className="bg-zinc-900 rounded-lg neon-border-pink p-4 group">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                 <img src={item.image_url} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline text-sm font-bold text-white leading-tight uppercase tracking-tight">{item.name.replace(/ /g, '_')}</h3>
                    <span className="bg-primary/10 text-primary text-[9px] font-label px-2 py-0.5 rounded border border-primary/20 uppercase">{item.category}</span>
                  </div>
                  <p className="font-label text-[10px] text-slate-500 mt-1 uppercase">SKU: {item.sku}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                   <div className="flex items-center gap-3">
                     <button 
                       onClick={() => updateQty.mutate({ id: item.id, delta: -1 })}
                       className="w-8 h-8 flex items-center justify-center border border-primary/30 text-primary active:scale-90 transition-transform"
                     >
                       <Minus size={14} />
                     </button>
                     <span className="font-headline font-bold text-lg text-white w-6 text-center">{item.quantity}</span>
                     <button 
                       onClick={() => updateQty.mutate({ id: item.id, delta: 1 })}
                       className="w-8 h-8 flex items-center justify-center border border-primary/30 text-primary active:scale-90 transition-transform"
                     >
                       <Plus size={14} />
                     </button>
                   </div>
                   <div className="text-right">
                     <p className="font-label text-[9px] text-slate-500">STATUS</p>
                     <p className={`font-label text-[10px] uppercase font-bold neon-glow-text-secondary ${item.status === 'CRITICAL' ? 'text-error' : 'text-secondary'}`}>{item.status}</p>
                     <div className="mt-2 flex gap-2 justify-end">
                        <button onClick={() => navigate("/dashboard", { state: { transition: "none" } })} className="text-[8px] border border-zinc-700 px-1 py-0.5 text-slate-500 uppercase"><span>Stats</span></button>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button className="w-10 h-10 bg-zinc-900 border border-secondary/30 text-secondary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.2)]">
           <ScanLine size={20} />
        </button>
        <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,45,120,0.4)]">
           <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
