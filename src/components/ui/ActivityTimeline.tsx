import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { History, User } from "lucide-react";

interface ActivityTimelineProps {
  className?: string;
}

export function ActivityTimeline({ className }: ActivityTimelineProps) {
  const { isNeon } = useTheme();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col w-80 border-l border-[var(--sidebar-border)]",
      isNeon ? "bg-zinc-950/50" : "bg-[var(--sidebar-bg)]",
      className,
    )}>
      <div className={cn("p-6 border-b", isNeon ? "border-white/5" : "border-[var(--table-divide)]")}>
        <h2 className={cn("uppercase tracking-[0.2em] text-[11px] flex items-center gap-2",
          isNeon ? "text-[var(--primary)] font-label" : "text-[var(--text-primary)] font-bold tracking-widest",
        )}>
          <History size={14} className={!isNeon ? "text-[var(--text-accent)]" : undefined} />
          {isNeon ? "Live Feed Logs" : "System Activity Log"}
        </h2>
      </div>

      <div className={cn("p-6 space-y-8 overflow-y-auto")}>
        {[1, 2, 3].map(i => (
          <div key={i} className={cn(
            "relative pl-6 space-y-2 border-l",
            isNeon ? "border-[var(--timeline-border)] last:opacity-60" : "border-l-2 border-[var(--timeline-border)] space-y-3",
          )}>
            <div className={cn(
              "absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--timeline-dot)]",
              isNeon && "shadow-[0_0_8px_var(--primary)]",
            )} />
            <div className="flex justify-between items-start">
              <p className={cn("text-[10px] uppercase text-[var(--text-muted)]",
                isNeon ? "font-label" : "font-bold tracking-wider",
              )}>09:42:01 AM</p>
              <span className={cn("text-[10px] font-bold",
                isNeon ? "text-[var(--secondary)] font-label" : "text-[var(--status-ok-text)] font-black",
              )}>+15 UNITS</span>
            </div>
            <p className={cn("text-xs font-medium",
              isNeon ? "text-white" : "text-[var(--text-secondary)] font-semibold leading-relaxed",
            )}>
              {isNeon ? "Stock Update: " : "Stock Adjustment: "}
              <span className={cn(isNeon ? "text-[var(--primary)] uppercase" : "text-[var(--text-accent)]")}>
                {isNeon ? "Neural_Link_V4" : "MK-7 Core"}
              </span>
            </p>
            <div className="flex items-center gap-2">
              {isNeon ? (
                <>
                  <img src="https://picsum.photos/seed/op/100/100" className="w-4 h-4 rounded-full border border-[var(--primary)]/30" />
                  <span className="text-[9px] font-label text-[var(--text-muted)] uppercase">Operator: J_CORVIS</span>
                </>
              ) : (
                <>
                  <User size={12} className="text-[var(--text-muted)]" />
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Op: Alex</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
