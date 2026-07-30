import React from "react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../hooks/useTheme";
import { QrCode, Plus, ScanLine } from "lucide-react";

interface FloatingActionsProps {
  showScan?: boolean;
}

export function FloatingActions({ showScan = true }: FloatingActionsProps) {
  const { isNeon } = useTheme();

  return (
    <div className="fixed bottom-24 right-6 flex flex-col gap-3">
      {showScan && (
        <button className={cn(
          "rounded-full flex items-center justify-center",
          isNeon
            ? "w-10 h-10 bg-[var(--fab-secondary-bg)] border border-[var(--fab-secondary-border)] text-[var(--fab-secondary-text)] shadow-[var(--fab-secondary-shadow)]"
            : "w-14 h-14 bg-[var(--fab-bg)] text-white shadow-[var(--fab-shadow)]",
        )}>
          {isNeon ? <ScanLine size={20} /> : <QrCode size={24} />}
        </button>
      )}
      {(isNeon || !showScan) && (
        <button className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white",
          "bg-[var(--fab-bg)] shadow-[var(--fab-shadow)]",
        )}>
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
