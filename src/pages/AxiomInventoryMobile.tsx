import React from "react";
import { useInventory, useUpdateQuantity } from "../hooks/useInventory";
import { Search, Filter, Plus, Minus, QrCode } from "lucide-react";

export function AxiomInventoryMobile() {
  const { data: inventory } = useInventory();
  const updateQty = useUpdateQuantity();

  return (
    <div className="space-y-6 pb-32">
       <div className="flex gap-3">
        <div className="relative flex-grow">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full bg-white border border-slate-200 rounded-lg text-sm font-medium py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" placeholder="Search inventory ledger..." />
        </div>
        <button className="bg-white border border-slate-200 rounded-lg px-3 flex items-center justify-center text-slate-600">
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Assets</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1,284</span>
            <span className="text-xs font-medium text-emerald-600">+12.5%</span>
          </div>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reorder</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">08</span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase">Critical</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-bold text-sm text-slate-900 uppercase tracking-tight">Active Inventory Items</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest">Connected</span>
          </div>
        </div>

        {Array.isArray(inventory) && inventory.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 transition-all">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200/50">
                 <img src={item.image_url} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-tight">{item.category}</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5 uppercase tracking-tighter">SKU: {item.sku}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                   <div className="flex items-center bg-slate-50 rounded-lg p-0.5 border border-slate-200">
                     <button 
                       onClick={() => updateQty.mutate({ id: item.id, delta: -1 })}
                       className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-blue-600"
                     >
                       <Minus size={14} />
                     </button>
                     <span className="font-bold text-sm text-slate-900 px-3">{item.quantity}</span>
                     <button 
                       onClick={() => updateQty.mutate({ id: item.id, delta: 1 })}
                       className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-blue-600"
                     >
                       <Plus size={14} />
                     </button>
                   </div>
                   <div className="text-right">
                     <p className={`text-[10px] font-semibold uppercase tracking-tighter ${item.status === 'CRITICAL' ? 'text-red-600' : 'text-emerald-600'}`}>{item.status}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col gap-3">
        <button className="w-14 h-14 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
           <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
