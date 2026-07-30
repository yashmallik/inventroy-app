import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { isNeon } = useTheme();
  const isOk = status === "STABLE" || status === "OPTIMAL";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase",
        isNeon ? "tracking-widest font-label border" : "tracking-wider rounded-full",
        isOk
          ? "bg-[var(--status-ok-bg)] text-[var(--status-ok-text)] border-[var(--status-ok-border)]"
          : "bg-[var(--status-err-bg)] text-[var(--status-err-text)] border-[var(--status-err-border)]",
        className,
      )}
    >
      {status}
    </span>
  );
}
