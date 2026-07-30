import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useInventory, useUpdateQuantity } from "../hooks/useInventory";
import { useTheme } from "../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleSelectItem } from "../store";
import { cn } from "../lib/cn";
import { InventoryTable } from "../components/ui/InventoryTable";
import { InventoryCard } from "../components/ui/InventoryCard";
import { FilterSidebar } from "../components/ui/FilterSidebar";
import { ActivityTimeline } from "../components/ui/ActivityTimeline";
import { FloatingActions } from "../components/ui/FloatingActions";
import { Search, Filter, Download, Plus, PlusCircle, ScanLine } from "lucide-react";
import type { InventoryItem } from "../types";

export function Inventory() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: inventory } = useInventory();
  const selectedIds = useSelector((state: RootState) => state.ui.selectedItemIds);
  const dispatch = useDispatch();
  const updateQty = useUpdateQuantity();

  if (isMobile) {
    return (
      <InventoryMobile
        items={inventory}
        onUpdateQuantity={(id, delta) => updateQty.mutate({ id, delta })}
      />
    );
  }

  return (
    <InventoryDesktop
      items={inventory}
      selectedIds={selectedIds}
      onToggleSelect={(id) => dispatch(toggleSelectItem(id))}
    />
  );
}

interface InventoryDesktopProps {
  items?: InventoryItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

function InventoryDesktop({ items, selectedIds, onToggleSelect }: InventoryDesktopProps) {
  const { isNeon } = useTheme();

  return (
    <div className={cn(
      "flex-1 flex overflow-hidden",
      isNeon ? "-m-6 h-[calc(100vh-100px)]" : "-m-8 h-[calc(100vh-76px)]",
    )}>
      <FilterSidebar />

      <div className={cn("flex-1 flex flex-col overflow-y-auto",
        isNeon ? "p-6" : "p-8 bg-slate-50/50",
      )}>
        <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
          isNeon ? "mb-8" : "mb-10",
        )}>
          <div>
            <h1 className={cn("text-3xl font-bold tracking-tight",
              isNeon ? "font-black text-white font-headline uppercase" : "text-[var(--text-primary)]",
            )}>{isNeon ? "Active_Inventory" : "Inventory Assets"}</h1>
            <p className={cn("text-[var(--text-muted)]",
              isNeon ? "font-label text-xs uppercase tracking-[0.2em]" : "text-sm font-medium mt-1",
            )}>{isNeon ? `Showing ${items?.length} items across 6 zones` : "Managed records across 6 regional nodes"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className={cn("flex items-center gap-2 uppercase tracking-widest",
              isNeon
                ? "px-4 py-2 border border-[var(--primary)]/50 text-[var(--primary)] text-[11px] font-label"
                : "px-5 py-2.5 border border-[var(--border-default)] bg-[var(--surface)] rounded-xl text-[var(--text-secondary)] text-xs font-bold shadow-sm",
            )}>
              <Download size={isNeon ? 14 : 16} /> {isNeon ? "Export" : "Export Data"}
            </button>
            <button className={cn("flex items-center gap-2 text-white uppercase",
              isNeon
                ? "px-5 py-2 bg-[var(--btn-primary-bg)] text-[11px] font-label tracking-[0.2em] shadow-[var(--btn-primary-shadow)]"
                : "px-6 py-2.5 bg-[var(--btn-primary-bg)] rounded-xl text-xs font-bold tracking-widest shadow-[var(--btn-primary-shadow)]",
            )}>
              {isNeon ? <PlusCircle size={14} /> : <Plus size={16} />}
              {isNeon ? "Add_New_Product" : "New Product"}
            </button>
          </div>
        </div>

        <InventoryTable
          items={items || []}
          selectedIds={selectedIds}
          onToggleSelect={onToggleSelect}
        />
      </div>

      <ActivityTimeline />
    </div>
  );
}

interface InventoryMobileProps {
  items?: InventoryItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

function InventoryMobile({ items, onUpdateQuantity }: InventoryMobileProps) {
  const { isNeon } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-32">
      {/* Search bar */}
      <div className={cn("flex", isNeon ? "gap-2" : "gap-3")}>
        <div className="relative flex-grow">
          <Search size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2",
            isNeon ? "text-[var(--primary)]/60" : "text-[var(--text-muted)]",
          )} />
          <input className={cn("w-full text-sm py-3 pl-10 pr-4 outline-none",
            isNeon
              ? "bg-zinc-900 border-b-2 border-[var(--primary)]/30 font-label uppercase tracking-widest focus:border-[var(--primary)]"
              : "bg-[var(--surface)] border border-[var(--border-default)] rounded-lg font-medium py-2.5 focus:ring-2 focus:ring-blue-500/20 transition-all",
          )} placeholder={isNeon ? "SEARCH_INVENTORY" : "Search inventory ledger..."} />
        </div>
        <button className={cn("px-3 flex items-center justify-center",
          isNeon ? "bg-zinc-900 border border-[var(--primary)]/20 text-[var(--secondary)]" : "bg-[var(--surface)] border border-[var(--border-default)] rounded-lg text-[var(--text-secondary)]",
        )}>
          <Filter size={18} />
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <div className={cn("p-4",
          isNeon ? "bg-zinc-900 neon-border-pink rounded-lg" : "bg-[var(--surface)] p-5 border border-[var(--border-default)] rounded-xl shadow-[var(--card-shadow)]",
        )}>
          <p className={cn("text-[10px] uppercase tracking-widest mb-1 text-[var(--text-muted)]",
            isNeon ? "font-label" : "text-xs font-semibold tracking-wider mb-2",
          )}>{isNeon ? "Total Stock" : "Total Assets"}</p>
          <div className="flex items-end gap-2">
            <span className={cn("text-2xl font-bold",
              isNeon ? "font-headline text-white" : "text-[var(--text-primary)]",
            )}>1,284</span>
            <span className={cn("text-xs",
              isNeon ? "text-[10px] text-[var(--secondary)] font-label mb-1" : "font-medium text-[var(--status-ok-text)]",
            )}>+12.5%</span>
          </div>
        </div>
        <div className={cn("p-4",
          isNeon ? "bg-zinc-900 neon-border-pink border-[var(--tertiary)]/20 rounded-lg" : "bg-[var(--surface)] p-5 border border-[var(--border-default)] rounded-xl shadow-[var(--card-shadow)]",
        )}>
          <p className={cn("text-[10px] uppercase tracking-widest mb-1 text-[var(--text-muted)]",
            isNeon ? "font-label" : "text-xs font-semibold tracking-wider mb-2",
          )}>{isNeon ? "Low Units" : "Reorder"}</p>
          <div className="flex items-end gap-2">
            <span className={cn("text-2xl font-bold",
              isNeon ? "font-headline text-[var(--tertiary)]" : "text-[var(--text-primary)]",
            )}>08</span>
            <span className={cn(
              isNeon ? "text-[10px] text-[var(--status-err-text)] font-label mb-1 uppercase" : "text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase",
            )}>Critical</span>
          </div>
        </div>
      </div>

      {/* Inventory Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className={cn("font-bold uppercase",
            isNeon ? "font-headline text-xs text-[var(--text-muted)] tracking-[0.2em]" : "text-sm text-[var(--text-primary)] tracking-tight",
          )}>{isNeon ? "Live_Inventory_Stream" : "Active Inventory Items"}</h2>
          <div className="flex items-center gap-1.5">
            {isNeon ? (
              <span className="text-[10px] font-label text-[var(--secondary)] animate-pulse">● LIVE_SYNC</span>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest">Connected</span>
              </>
            )}
          </div>
        </div>

        {Array.isArray(items) && items.map(item => (
          <InventoryCard
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <FloatingActions showScan={isNeon} />
    </div>
  );
}
