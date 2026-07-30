import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { MoreVertical, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { InventoryItem } from "../../types";

interface InventoryTableProps {
  items: InventoryItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export function InventoryTable({ items, selectedIds, onToggleSelect }: InventoryTableProps) {
  const { isNeon } = useTheme();
  const MoreIcon = isNeon ? MoreVertical : MoreHorizontal;

  return (
    <div className={cn(
      "rounded-[var(--card-radius-lg)] border border-[var(--border-default)] overflow-hidden shadow-[var(--card-shadow)] relative",
      isNeon ? "bg-zinc-900" : "bg-[var(--surface)]"
    )}>
      {selectedIds.length > 0 && (
        <div className="bg-[var(--selection-bg)] border-b border-[var(--selection-border)] p-3 flex items-center justify-between z-10">
          <span className={cn("text-[var(--selection-text)] text-xs uppercase font-bold ml-12",
            isNeon ? "font-label tracking-widest" : "tracking-widest"
          )}>{selectedIds.length} {isNeon ? "Items Selected" : "Records Selected"}</span>
          <button className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
            isNeon ? "bg-[var(--checkbox-accent)] text-black" : "bg-[var(--btn-primary-bg)] text-white rounded-lg text-[11px]"
          )}>{isNeon ? "Update Stock" : "Adjust Units"}</button>
        </div>
      )}

      <div className={cn("overflow-x-auto", selectedIds.length > 0 ? "" : "pt-4")}>
        <table className="w-full text-left">
          <thead>
            <tr className={cn("bg-[var(--table-header-bg)] border-b border-[var(--table-divide)]")}>
              <th className="p-4 w-12"></th>
              <th className={cn("p-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]", isNeon && "font-label")}>
                {isNeon ? "ID_Hash" : "Reference ID"}
              </th>
              <th className={cn("p-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]", isNeon && "font-label")}>
                {isNeon ? "Product_Model" : "Nomenclature"}
              </th>
              <th className={cn("p-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]", isNeon && "font-label")}>
                {isNeon ? "Status" : "Quantity"}
              </th>
              <th className={cn("p-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]", isNeon && "font-label")}>
                {isNeon ? "Unit_Price" : "Status"}
              </th>
              <th className="p-4 text-right"></th>
            </tr>
          </thead>
          <tbody className={cn("divide-y divide-[var(--table-divide)]")}>
            {Array.isArray(items) && items.map(item => (
              <tr key={item.id} className={cn(
                "hover:bg-[var(--table-row-hover)] transition-colors group",
                selectedIds.includes(item.id) && "bg-[var(--selection-bg)]"
              )}>
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onToggleSelect(item.id)}
                    className={cn("rounded w-4 h-4",
                      isNeon ? "border-slate-700 bg-zinc-900 text-[var(--checkbox-accent)] focus:ring-[var(--checkbox-accent)]"
                        : "border-slate-300 text-[var(--checkbox-accent)] focus:ring-blue-500/20"
                    )}
                  />
                </td>
                <td className={cn("p-4 text-[11px] text-[var(--text-muted)]", isNeon ? "font-label tracking-tighter" : "font-mono tracking-tight")}>
                  #{item.id}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image_url} className={cn("w-10 h-10 object-cover", isNeon ? "rounded border border-white/10" : "w-12 h-12 rounded-lg border border-[var(--border-default)]")} />
                    <div>
                      <p className={cn("text-sm font-bold transition-colors",
                        isNeon ? "text-white font-headline uppercase tracking-tight group-hover:text-[var(--text-accent)]" : "text-[var(--text-primary)] group-hover:text-[var(--text-accent)]"
                      )}>{isNeon ? item.name.replace(/ /g, '_') : item.name}</p>
                      <p className={cn("text-[10px] text-[var(--text-muted)]", isNeon ? "font-label" : "font-medium uppercase tracking-wider text-[11px]")}>{item.sku}</p>
                    </div>
                  </div>
                </td>
                {isNeon ? (
                  <>
                    <td className="p-4"><StatusBadge status={item.status} /></td>
                    <td className="p-4 text-xs font-label text-[var(--text-primary)]">¥ {item.price.toLocaleString()}</td>
                  </>
                ) : (
                  <>
                    <td className="p-4 text-sm font-bold text-[var(--text-secondary)]">{item.quantity}</td>
                    <td className="p-4"><StatusBadge status={item.status} /></td>
                  </>
                )}
                <td className="p-4 text-right">
                  <MoreIcon size={isNeon ? 16 : 20} className="text-[var(--text-muted)] cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
