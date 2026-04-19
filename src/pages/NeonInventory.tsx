import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { NeonInventoryMobile } from "./NeonInventoryMobile";
import { useInventory } from "../hooks/useInventory";
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleSelectItem } from "../store";
import { Filter, Search, Download, PlusCircle, MoreVertical, History } from "lucide-react";

export function NeonInventory() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: inventory } = useInventory();
  const selectedIds = useSelector((state: RootState) => state.ui.selectedItemIds);
  const dispatch = useDispatch();

  if (isMobile) {
    return <NeonInventoryMobile />;
  }

  return (
    <div className="flex-1 flex overflow-hidden -m-6 h-[calc(100vh-100px)]">
      <aside className="hidden xl:flex flex-col w-64 border-r border-[#ff2d78]/10 p-6 bg-[#0a0a12]">
        <h2 className="text-[#00ffcc] font-label uppercase tracking-[0.2em] text-[11px] mb-6 flex items-center gap-2">
          <Filter size={14} /> Advanced Filters
        </h2>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-label uppercase text-slate-500 tracking-widest">Category</label>
            <div className="space-y-2">
              {["Neural Chips", "Augmentations", "Power Cells"].map(c => (
                <label key={c} className="flex items-center gap-3 text-xs text-slate-400 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-700 bg-zinc-900 text-primary focus:ring-primary w-4 h-4" />
                  <span className="group-hover:text-primary transition-colors uppercase tracking-tight">{c}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-label uppercase text-slate-500 tracking-widest">Price Range (¥)</label>
             <input type="range" className="w-full accent-primary bg-zinc-800 h-1 rounded-full appearance-none" />
             <div className="flex justify-between text-[10px] font-label text-slate-400">
               <span>1,000</span>
               <span>500k+</span>
             </div>
          </div>
          <button className="w-full py-3 bg-[#00ffcc]/10 border border-[#00ffcc]/50 text-[#00ffcc] font-label uppercase tracking-widest text-[10px] hover:bg-[#00ffcc] hover:text-black transition-all">
            Apply Filters
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white font-headline uppercase tracking-tight">Active_Inventory</h1>
            <p className="text-slate-500 font-label text-xs uppercase tracking-[0.2em]">Showing {inventory?.length} items across 6 zones</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#ff2d78]/50 text-[#ff2d78] text-[11px] font-label uppercase tracking-widest">
              <Download size={14} /> Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-[#ff2d78] text-white text-[11px] font-label uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,45,120,0.4)]">
              <PlusCircle size={14} /> Add_New_Product
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-white/5 overflow-hidden shadow-2xl relative">
          {selectedIds.length > 0 && (
            <div className="absolute top-0 left-0 right-0 bg-[#00ffcc]/10 border-b border-[#00ffcc]/30 p-3 flex items-center justify-between z-10 transition-all">
               <span className="text-[#00ffcc] font-label text-xs uppercase tracking-widest font-bold ml-12">{selectedIds.length} Items Selected</span>
               <div className="flex gap-2">
                 <button className="px-3 py-1 bg-[#00ffcc] text-black text-[10px] font-bold uppercase tracking-widest">Update Stock</button>
               </div>
            </div>
          )}
          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="p-4 w-12"></th>
                  <th className="p-4 font-label uppercase text-[10px] tracking-widest text-slate-500">ID_Hash</th>
                  <th className="p-4 font-label uppercase text-[10px] tracking-widest text-slate-500">Product_Model</th>
                  <th className="p-4 font-label uppercase text-[10px] tracking-widest text-slate-500">Status</th>
                  <th className="p-4 font-label uppercase text-[10px] tracking-widest text-slate-500">Unit_Price</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Array.isArray(inventory) && inventory.map(item => (
                  <tr key={item.id} className={`hover:bg-white/[0.02] transition-colors group ${selectedIds.includes(item.id) ? "bg-[#00ffcc]/5" : ""}`}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)}
                        onChange={() => dispatch(toggleSelectItem(item.id))}
                        className="rounded border-slate-700 bg-zinc-900 text-[#00ffcc] focus:ring-[#00ffcc] w-4 h-4" 
                      />
                    </td>
                    <td className="p-4 text-[11px] font-label text-slate-500 tracking-tighter">#{item.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image_url} className="w-10 h-10 rounded border border-white/10 object-cover" />
                        <div>
                          <p className="text-sm font-bold text-white font-headline group-hover:text-primary transition-colors uppercase tracking-tight">{item.name.replace(/ /g, '_')}</p>
                          <p className="text-[10px] text-slate-500 font-label">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[9px] font-label uppercase tracking-widest border ${
                        item.status === 'CRITICAL' ? "bg-error/10 text-error border-error/20" : "bg-secondary/10 text-secondary border-secondary/20"
                      }`}>{item.status}</span>
                    </td>
                    <td className="p-4 text-xs font-label text-white">¥ {item.price.toLocaleString()}</td>
                    <td className="p-4 text-right">
                       <MoreVertical size={16} className="text-slate-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="hidden lg:flex flex-col w-80 border-l border-[#ff2d78]/10 bg-zinc-950/50 overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-[#ff2d78] font-label uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
            <History size={14} /> Live Feed Logs
          </h2>
        </div>
        <div className="p-6 space-y-8">
           {[1, 2, 3].map(i => (
             <div key={i} className="relative pl-6 border-l border-primary/20 space-y-2 last:opacity-60">
               <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#ff2d78]"></div>
               <div className="flex justify-between items-start">
                 <p className="text-[10px] font-label text-slate-500 uppercase">09:42:01_AM</p>
                 <span className="text-secondary text-[10px] font-bold font-label">+15 UNITS</span>
               </div>
               <p className="text-xs text-white font-medium">Stock Update: <span className="text-primary uppercase">Neural_Link_V4</span></p>
               <div className="flex items-center gap-2">
                 <img src="https://picsum.photos/seed/op/100/100" className="w-4 h-4 rounded-full border border-primary/30" />
                 <span className="text-[9px] font-label text-slate-400 uppercase">Operator: J_CORVIS</span>
               </div>
             </div>
           ))}
        </div>
      </aside>
    </div>
  );
}
