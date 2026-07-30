import React, { type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  compact?: boolean;
  variant?: "default" | "accent" | "alert";
  className?: string;
}

export function KpiCard({ label, value, change, changeType = "neutral", icon, compact, variant = "default", className }: KpiCardProps) {
  const { isNeon } = useTheme();

  return (
    <div
      className={cn(
        "relative overflow-hidden flex flex-col justify-between",
        "bg-[var(--surface)] border border-[var(--border-default)] rounded-[var(--card-radius)] shadow-[var(--card-shadow)]",
        compact ? "p-4" : "p-5",
        isNeon && variant === "default" && "neon-border-pink",
        variant === "alert" && "border-l-4 border-l-[var(--accent-warn-border)]",
        variant === "accent" && (isNeon ? "bg-[#ff2d78]/10 border-[#ff2d78]/40" : "bg-blue-50 border-blue-100"),
        className,
      )}
    >
      {compact && icon && (
        <div className="flex justify-between items-start mb-2">
          <span className="text-[var(--text-accent)]">{icon}</span>
          {change && (
            <span className={cn("text-[10px] font-bold", isNeon ? "font-label" : "",
              changeType === "positive" ? "text-[var(--status-ok-text)]" : changeType === "negative" ? "text-[var(--status-err-text)]" : "text-[var(--text-muted)]"
            )}>{change}</span>
          )}
        </div>
      )}

      <div>
        {!compact && (
          <p className={cn("text-[10px] uppercase mb-1",
            isNeon ? "font-label tracking-widest text-slate-400" : "text-[11px] font-bold tracking-wider text-slate-500"
          )}>{label}</p>
        )}
        <div className={cn("flex items-end", compact ? "" : "gap-2")}>
          <h3 className={cn(
            compact ? "text-2xl font-bold headline tracking-tighter" : "font-black",
            compact ? "text-[var(--text-primary)]" : "text-3xl",
            !compact && isNeon && "font-headline neon-glow-text-primary",
          )}>{value}</h3>
          {!compact && change && (
            <span className={cn("text-xs pb-1",
              isNeon ? "font-label" : "font-bold bg-emerald-50 px-2 py-1 rounded",
              changeType === "positive" ? "text-[var(--status-ok-text)]" : changeType === "negative" ? "text-[var(--status-err-text)]" : "text-[var(--text-muted)]"
            )}>{change}</span>
          )}
        </div>
        {compact && (
          <div className={cn("text-[9px] uppercase text-[var(--text-muted)]",
            isNeon ? "font-label tracking-tighter" : "font-bold tracking-wider text-[10px]"
          )}>{label}</div>
        )}
      </div>
    </div>
  );
}
