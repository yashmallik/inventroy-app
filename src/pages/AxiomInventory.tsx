import React from "react";
import { useInventory } from "../hooks/useInventory";
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleSelectItem } from "../store";
import { Search, Filter, Download, Plus, MoreHorizontal, History, User } from "lucide-react";

export function AxiomInventory() {
  const { data: inventory } = useInventory();
  const selectedIds = useSelector((state: RootState) => state.ui.selectedItemIds);
  const dispatch = useDispatch();

  return (
    <div className="flex-1 flex overflow-hidden -m-8 h-[calc(100vh-76px)]">
      <aside className="hidden xl:flex flex-col w-72 border-r border-slate-200 bg-white p-8">
        <h2 className="text-slate-900 font-bold uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
          <Filter size={14} className="text-blue-600" /> Refine Selection
        </h2>
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Product Categories</label>
            <div className="space-y-3">
              {["Neural Hardware", "Bio-Augmentations", "Energy Storage"].map(c => (
                <label key={c} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-4 h-4" />
                  <span className="group-hover:text-blue-700 transition-colors">{c}</span>
                </label>
              ))}
            </div>
          </div>
          <button className="w-full py-3.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-blue-100 transition-all">
            Update View
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-slate-50/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inventory Assets</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Managed records across 6 regional nodes</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm">
              <Download size={16} /> Export Data
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-700/20">
              <Plus size={16} /> New Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
          {selectedIds.length > 0 && (
            <div className="bg-blue-50/50 border-b border-blue-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-6 px-2">
                <span className="text-blue-800 font-bold text-xs uppercase tracking-widest">{selectedIds.length} Records Selected</span>
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest">Adjust Units</button>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 w-12 text-center"></th>
                  <th className="p-5 font-bold uppercase text-[10px] tracking-widest text-slate-400">Reference ID</th>
                  <th className="p-5 font-bold uppercase text-[10px] tracking-widest text-slate-400">Nomenclature</th>
                  <th className="p-5 font-bold uppercase text-[10px] tracking-widest text-slate-400">Quantity</th>
                  <th className="p-5 font-bold uppercase text-[10px] tracking-widest text-slate-400">Status</th>
                  <th className="p-5 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(inventory) && inventory.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => dispatch(toggleSelectItem(item.id))} 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 w-4 h-4" 
                      />
                    </td>
                    <td className="p-5 text-xs font-mono text-slate-400 tracking-tight">#{item.id}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img src={item.image_url} className="w-12 h-12 rounded-lg border border-slate-200 object-cover" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-bold text-slate-700">{item.quantity}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'CRITICAL' ? "bg-red-50 text-red-700 border-red-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}>{item.status}</span>
                    </td>
                    <td className="p-5 text-right">
                      <MoreHorizontal size={20} className="text-slate-400 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="hidden lg:flex flex-col w-80 border-l border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-slate-900 font-bold uppercase tracking-widest text-[11px] flex items-center gap-2">
            <History size={14} className="text-blue-600" /> System Activity Log
          </h2>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto">
           {[1, 2, 3].map(i => (
             <div key={i} className="relative pl-6 border-l-2 border-slate-100 space-y-3">
               <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-600 rounded-full"></div>
               <div className="flex justify-between items-start">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">09:42:01 AM</p>
                 <span className="text-emerald-600 text-[10px] font-black">+15 UNITS</span>
               </div>
               <p className="text-xs text-slate-700 font-semibold leading-relaxed">Stock Adjustment: <span className="text-blue-700">MK-7 Core</span></p>
               <div className="flex items-center gap-2.5">
                  <User size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Op: Alex</span>
               </div>
             </div>
           ))}
        </div>
      </aside>
    </div>
  );
}
