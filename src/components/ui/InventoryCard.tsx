import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { Plus, Minus } from "lucide-react";
import type { InventoryItem } from "../../types";

interface InventoryCardProps {
  item: InventoryItem;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export function InventoryCard({ item, onUpdateQuantity }: InventoryCardProps) {
  const { isNeon } = useTheme();

  return (
    <div className={cn(
      "p-4 transition-all",
      isNeon ? "bg-zinc-900 rounded-lg neon-border-pink" : "bg-[var(--surface)] rounded-xl border border-[var(--border-default)]",
    )}>
      <div className="flex gap-4">
        <div className={cn(
          "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0",
          isNeon ? "bg-black border border-white/5" : "bg-[var(--surface-alt)] border border-[var(--border-default)]/50",
        )}>
          <img src={item.image_url} className={cn("w-full h-full object-cover", isNeon && "opacity-80")} />
        </div>

        <div className="flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className={cn("text-sm font-bold leading-tight",
                isNeon ? "font-headline text-white uppercase tracking-tight" : "text-[var(--text-primary)]",
              )}>{isNeon ? item.name.replace(/ /g, '_') : item.name}</h3>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border uppercase",
                isNeon ? "text-[10px] font-label" : "text-[10px] tracking-tight",
                "bg-[var(--category-bg)] text-[var(--category-text)] border-[var(--category-border)]",
              )}>{item.category}</span>
            </div>
            <p className={cn("text-[10px] mt-1 uppercase text-[var(--text-muted)]",
              isNeon ? "font-label" : "text-[11px] font-medium tracking-tighter",
            )}>SKU: {item.sku}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className={cn("flex items-center gap-3",
              !isNeon && "bg-[var(--surface-alt)] rounded-lg p-0.5 border border-[var(--border-default)]"
            )}>
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                className={cn("flex items-center justify-center active:scale-90 transition-transform",
                  isNeon ? "w-8 h-8 border border-[var(--border-accent)] text-[var(--text-accent)]" : "w-7 h-7 text-[var(--text-muted)] hover:text-[var(--text-accent)]",
                )}
              >
                <Minus size={14} />
              </button>
              <span className={cn("font-bold text-center",
                isNeon ? "font-headline text-lg text-white w-6" : "text-sm text-[var(--text-primary)] px-3",
              )}>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className={cn("flex items-center justify-center active:scale-90 transition-transform",
                  isNeon ? "w-8 h-8 border border-[var(--border-accent)] text-[var(--text-accent)]" : "w-7 h-7 text-[var(--text-muted)] hover:text-[var(--text-accent)]",
                )}
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="text-right">
              {isNeon && <p className="font-label text-[9px] text-[var(--text-muted)]">STATUS</p>}
              <p className={cn("text-[10px] font-bold uppercase",
                isNeon ? "font-label" : "tracking-tighter",
                item.status === 'CRITICAL' ? "text-[var(--status-err-text)]" : "text-[var(--status-ok-text)]",
                isNeon && item.status !== 'CRITICAL' && "neon-glow-text-secondary",
              )}>{item.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
