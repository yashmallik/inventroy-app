import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { Filter } from "lucide-react";

interface FilterSidebarProps {
  className?: string;
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const { isNeon } = useTheme();

  const categories = isNeon
    ? ["Neural Chips", "Augmentations", "Power Cells"]
    : ["Neural Hardware", "Bio-Augmentations", "Energy Storage"];

  return (
    <aside className={cn(
      "hidden xl:flex flex-col border-r border-[var(--sidebar-border)]",
      isNeon ? "w-64 p-6 bg-[var(--sidebar-bg)]" : "w-72 p-8 bg-[var(--sidebar-bg)]",
      className,
    )}>
      <h2 className={cn("uppercase text-[11px] mb-6 flex items-center gap-2",
        isNeon ? "text-[var(--secondary)] font-label tracking-[0.2em]" : "text-[var(--text-primary)] font-bold tracking-widest mb-8",
      )}>
        <Filter size={14} className={!isNeon ? "text-[var(--text-accent)]" : undefined} />
        {isNeon ? "Advanced Filters" : "Refine Selection"}
      </h2>

      <div className={cn("space-y-8", !isNeon && "space-y-10")}>
        <div className={cn("space-y-3", !isNeon && "space-y-4")}>
          <label className={cn("text-[10px] uppercase tracking-widest text-[var(--text-muted)]",
            isNeon ? "font-label" : "text-[11px] font-bold",
          )}>{isNeon ? "Category" : "Product Categories"}</label>
          <div className={cn("space-y-2", !isNeon && "space-y-3")}>
            {categories.map(c => (
              <label key={c} className={cn("flex items-center gap-3 cursor-pointer group",
                isNeon ? "text-xs text-slate-400" : "text-sm text-[var(--text-secondary)]",
              )}>
                <input type="checkbox" className={cn("rounded w-4 h-4",
                  isNeon ? "border-slate-700 bg-zinc-900 text-[var(--primary)] focus:ring-[var(--primary)]"
                    : "border-slate-300 text-[var(--checkbox-accent)] focus:ring-blue-500/20",
                )} />
                <span className={cn("transition-colors",
                  isNeon ? "group-hover:text-[var(--primary)] uppercase tracking-tight" : "group-hover:text-[var(--text-accent)]",
                )}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        {isNeon && (
          <div className="space-y-4">
            <label className="text-[10px] font-label uppercase text-[var(--text-muted)] tracking-widest">Price Range (¥)</label>
            <input type="range" className="w-full accent-[var(--primary)] bg-zinc-800 h-1 rounded-full appearance-none" />
            <div className="flex justify-between text-[10px] font-label text-[var(--text-muted)]">
              <span>1,000</span>
              <span>500k+</span>
            </div>
          </div>
        )}

        <button className={cn("w-full uppercase tracking-widest text-[10px] transition-all",
          isNeon
            ? "py-3 bg-[var(--secondary)]/10 border border-[var(--secondary)]/50 text-[var(--secondary)] font-label hover:bg-[var(--secondary)] hover:text-black"
            : "py-3.5 bg-blue-50 border border-blue-200 text-[var(--text-accent)] rounded-xl font-bold text-[11px] hover:bg-blue-100",
        )}>
          {isNeon ? "Apply Filters" : "Update View"}
        </button>
      </div>
    </aside>
  );
}
