import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useInventory } from "../hooks/useInventory";
import { useTheme, useChartColors } from "../hooks/useTheme";
import { cn } from "../lib/cn";
import { StatusBadge } from "../components/ui/StatusBadge";
import { KpiCard } from "../components/ui/KpiCard";
import { FloatingActions } from "../components/ui/FloatingActions";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Bolt, Sparkles, Download, TrendingUp, AlertTriangle, History, Filter } from "lucide-react";
import type { InventoryItem } from "../types";

const desktopChartDataNeon = [
  { time: "06:00", outflow: 1200 },
  { time: "09:00", outflow: 1800 },
  { time: "12:00", outflow: 1400 },
  { time: "15:00", outflow: 2420 },
  { time: "18:00", outflow: 2000 },
  { time: "21:00", outflow: 2600 },
  { time: "00:00", outflow: 1500 },
];

const desktopChartDataAxiom = [
  { day: "Mon", val: 2100 },
  { day: "Tue", val: 2420 },
  { day: "Wed", val: 2200 },
  { day: "Thu", val: 2600 },
  { day: "Fri", val: 2300 },
  { day: "Sat", val: 2100 },
  { day: "Sun", val: 2500 },
];

const mobileBarData = [
  { val: 40 }, { val: 60 }, { val: 90 }, { val: 55 }, { val: 70 },
  { val: 30 }, { val: 45 }, { val: 80 }, { val: 65 }, { val: 95 },
  { val: 40 }, { val: 75 },
];

const mobileAreaData = [{ v: 10 }, { v: 30 }, { v: 20 }, { v: 50 }, { v: 15 }, { v: 60 }];

export function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: inventory } = useInventory();

  return isMobile
    ? <DashboardMobile inventory={inventory} />
    : <DashboardDesktop inventory={inventory} />;
}

function DashboardDesktop({ inventory }: { inventory?: InventoryItem[] }) {
  const { isNeon } = useTheme();
  const colors = useChartColors();

  return (
    <div className={cn("max-w-7xl mx-auto", isNeon ? "space-y-6" : "space-y-8")}>
      {/* KPI Cards */}
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", isNeon ? "gap-4" : "gap-6")}>
        <KpiCard label={isNeon ? "TOTAL_STOCK" : "Total Stock Units"} value="12,842" change="+2.4%" changeType="positive" />
        <KpiCard label={isNeon ? "LOW_STOCK_ALERTS" : "Low Stock Alerts"} value="24" variant="alert"
          change={isNeon ? "critical" : "Action Required"} changeType="negative" />
        <KpiCard label={isNeon ? "DAILY_TRANSACTIONS" : "Daily Volume"} value="842"
          change={isNeon ? "VOL_NORMAL" : "Within Range"} changeType="neutral" />
        <AiInsightCard />
      </div>

      {/* Chart + Sidebar */}
      <div className={cn("grid grid-cols-1 lg:grid-cols-3", isNeon ? "gap-6" : "gap-8")}>
        <div className={cn("lg:col-span-2 flex flex-col",
          isNeon ? "bg-zinc-900/50 border border-white/5 rounded-xl p-6" : "bg-[var(--surface)] border border-[var(--border-default)] rounded-2xl p-8 shadow-[var(--card-shadow)]",
        )}>
          <div className={cn("flex justify-between items-center", isNeon ? "mb-8" : "mb-10")}>
            <div>
              <h2 className={cn("text-lg font-bold",
                isNeon ? "font-headline tracking-tight uppercase" : "text-[var(--text-primary)]",
              )}>{isNeon ? "Stock_Movement" : "Stock Flow Analysis"}</h2>
              <p className={cn("text-xs text-[var(--text-muted)]",
                isNeon ? "font-label" : "text-sm",
              )}>{isNeon ? "UNIT_FLOW_ANALYSIS_24H" : "Inventory movement over the last 7 business days"}</p>
            </div>
            <div className={cn("flex", isNeon ? "gap-2" : "p-1 bg-[var(--surface-alt)] rounded-lg")}>
              {["1D", "1W", "1M"].map(t => (
                <button key={t} className={cn("px-3 py-1 text-[10px] transition-all",
                  isNeon
                    ? cn("bg-black border font-label",
                        t === "1W" ? "border-[var(--primary)] text-[var(--primary)] shadow-[0_0_8px_rgba(255,45,120,0.2)]" : "border-zinc-700 text-[var(--text-muted)]")
                    : cn("px-4 py-1.5 text-xs font-bold rounded",
                        t === "1W" ? "bg-[var(--surface)] text-[var(--text-accent)] shadow-sm" : "text-[var(--text-muted)]"),
                )}>{t}</button>
              ))}
            </div>
          </div>
          <div className={cn("w-full min-h-0 min-w-0", isNeon ? "h-[300px]" : "h-[320px]")}>
            <ResponsiveContainer width="100%" height="100%">
              {isNeon ? (
                <AreaChart data={desktopChartDataNeon}>
                  <defs>
                    <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.stroke} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.stroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, fontSize: "12px" }} labelStyle={{ color: "#8E9299" }} />
                  <Area type="monotone" dataKey="outflow" stroke={colors.stroke} fillOpacity={1} fill="url(#colorOutflow)" strokeWidth={3} />
                </AreaChart>
              ) : (
                <AreaChart data={desktopChartDataAxiom}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: colors.axisTick }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: colors.axisTick }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Area type="monotone" dataKey="val" stroke={colors.stroke} strokeWidth={3} fill={colors.fillStart} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <PredictiveReorderSidebar />
      </div>

      {/* Inventory Feed Table */}
      <InventoryFeedTable inventory={inventory} />
    </div>
  );
}

function AiInsightCard() {
  const { isNeon } = useTheme();

  if (isNeon) {
    return (
      <div className="bg-[#ff2d78]/10 border border-[#ff2d78]/40 p-5 rounded-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <Bolt size={14} className="text-[#ff2d78]" />
          <p className="font-label text-[10px] tracking-widest text-[#ff2d78]">AI_INSIGHTS</p>
        </div>
        <p className="text-[11px] leading-tight text-white/80 italic font-body">Optimize "Hyper-Core" reserves before the 24:00 demand spike.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-blue-700" />
        <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">AI Insights</p>
      </div>
      <p className="text-xs leading-relaxed text-blue-900/80 font-medium">Inventory velocity indicates "Hyper-Core" depletion within 24h. Recommend restocking.</p>
    </div>
  );
}

function PredictiveReorderSidebar() {
  const { isNeon } = useTheme();

  return (
    <div className="space-y-6">
      <div className={cn(
        "p-5 relative overflow-hidden",
        isNeon ? "bg-zinc-900 border border-white/5 rounded-xl" : "bg-[var(--surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--card-shadow)]",
      )}>
        <h2 className={cn("text-sm font-bold mb-4 flex items-center gap-2",
          isNeon ? "font-headline uppercase tracking-widest" : "text-[var(--text-primary)] mb-5",
        )}>
          <span className={cn("w-1.5 h-4", isNeon ? "bg-[var(--primary)]" : "bg-[var(--text-accent)] rounded-full")} />
          {isNeon ? "Predictive_Reorder" : "Predictive Reorders"}
        </h2>
        <div className="space-y-4">
          {["Cyber Drive X2", "Neon Flux Coil"].map(name => {
            const isCritical = name.includes("Drive");
            return (
              <div key={name} className={cn("p-3 rounded transition-all",
                isNeon
                  ? cn("bg-black border border-white/5 group", isCritical ? "hover:border-[var(--primary)]/40" : "hover:border-[var(--secondary)]/40")
                  : "p-4 rounded-xl border border-[var(--table-divide)] bg-[var(--surface-alt)] hover:border-[var(--border-accent)] cursor-pointer",
              )}>
                <div className="flex justify-between items-start mb-2">
                  <p className={cn("text-xs font-bold", isNeon ? "uppercase" : "text-sm text-[var(--text-primary)]")}>
                    {isNeon ? name.replace(/ /g, '_').toUpperCase() : name}
                  </p>
                  <span className={cn("text-[10px] px-1.5 py-0.5 font-bold uppercase",
                    isNeon
                      ? cn("border", isCritical ? "bg-[var(--status-err-bg)] text-[var(--status-err-text)] border-[var(--status-err-border)]" : "bg-[var(--secondary)]/20 text-[var(--secondary)] border-[var(--secondary)]/30")
                      : cn("px-2 rounded tracking-wider text-[9px]", isCritical ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"),
                  )}>
                    {isCritical ? (isNeon ? "PRIORITY_H" : "Critical") : (isNeon ? "OPTIMIZATION" : "Optimize")}
                  </span>
                </div>
                <p className={cn("text-[11px] mb-3",
                  isNeon ? "text-slate-400" : "text-xs text-[var(--text-secondary)] mb-4",
                )}>
                  {isNeon
                    ? (isCritical ? <>Inventory depletion expected in <span className="text-[var(--tertiary)]">14 hours</span>.</> : <>Excess stock detected. Reduce weekly order by <span className="text-[var(--secondary)]">15%</span>.</>)
                    : "Action required based on velocity."
                  }
                </p>
                <button className={cn("w-full transition-all",
                  isNeon
                    ? cn("py-1.5 bg-black border border-zinc-700 text-[10px] font-label uppercase tracking-widest text-slate-300",
                        isCritical ? "hover:text-[var(--primary)] hover:border-[var(--primary)]" : "hover:text-[var(--secondary)] hover:border-[var(--secondary)]")
                    : "py-2 bg-[var(--surface)] border border-[var(--border-default)] text-xs font-bold text-[var(--text-secondary)] rounded hover:border-[var(--text-accent)] hover:text-[var(--text-accent)]",
                )}>
                  {isNeon ? (isCritical ? "APPROVE_PO_#842" : "ADJUST_SCHEDULE") : "Action"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {!isNeon && (
        <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">Efficiency Report</h3>
            <p className="text-sm text-slate-300 mb-6 font-body">Logistics efficiency increased by 12% across nodes.</p>
            <button className="flex items-center gap-2 text-white font-bold text-xs hover:text-blue-400">
              Download Analysis <Download size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryFeedTable({ inventory }: { inventory?: InventoryItem[] }) {
  const { isNeon } = useTheme();

  return (
    <section className={cn("overflow-hidden",
      isNeon ? "bg-zinc-900/50 border border-white/5 rounded-xl" : "bg-[var(--surface)] border border-[var(--border-default)] rounded-2xl shadow-[var(--card-shadow)]",
    )}>
      <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4",
        isNeon ? "p-5 border-b border-white/5" : "px-8 py-6 border-b border-[var(--table-divide)]",
      )}>
        <div>
          <h2 className={cn("font-bold",
            isNeon ? "text-sm font-headline tracking-tight uppercase" : "text-lg text-[var(--text-primary)]",
          )}>{isNeon ? "LIVE_INVENTORY_FEED" : "Global Inventory Feed"}</h2>
          <p className={cn("text-[var(--text-muted)]",
            isNeon ? "text-[10px] font-label" : "text-sm font-medium",
          )}>{isNeon ? "REALTIME_SYNC_OPERATIONAL" : "Real-time synchronization active."}</p>
        </div>
        {isNeon && (
          <div className="flex gap-2">
            <select className="bg-black border border-zinc-700 text-[10px] font-label tracking-widest text-slate-400 px-3 py-2 rounded focus:ring-1 focus:ring-[var(--primary)] uppercase">
              <option>ALL_CATEGORIES</option>
            </select>
            <button className="bg-black border border-zinc-700 px-3 py-2 text-[10px] font-label text-slate-400 flex items-center gap-2 hover:text-[var(--primary)] transition-all uppercase">
              <Filter size={14} /> SORT
            </button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={cn("bg-[var(--table-header-bg)] border-b border-[var(--table-divide)]")}>
              <th className={cn("py-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]",
                isNeon ? "px-6 font-label" : "px-8 font-bold",
              )}>{isNeon ? "ID" : "Serial ID"}</th>
              <th className={cn("py-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]",
                isNeon ? "px-6 font-label" : "px-8 font-bold",
              )}>{isNeon ? "PRODUCT_NAME" : "Product Name"}</th>
              {isNeon && <th className="px-6 py-4 font-label text-[10px] tracking-widest text-[var(--text-muted)] uppercase">CATEGORY</th>}
              <th className={cn("py-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)] text-right",
                isNeon ? "px-6 font-label" : "px-8 font-bold",
              )}>Quantity</th>
              <th className={cn("py-4 uppercase text-[10px] tracking-widest text-[var(--text-muted)]",
                isNeon ? "px-6 font-label" : "px-8 font-bold",
              )}>Status</th>
            </tr>
          </thead>
          <tbody className={cn("divide-y divide-[var(--table-divide)]")}>
            {Array.isArray(inventory) && inventory.map(item => (
              <tr key={item.id} className={cn("transition-colors", isNeon ? "hover:bg-[var(--table-row-hover)] group" : "hover:bg-[var(--table-row-hover)]")}>
                <td className={cn("py-4 text-[var(--text-muted)]",
                  isNeon ? "px-6 font-label text-[11px]" : "px-8 text-sm font-medium",
                )}>#{item.id}</td>
                <td className={cn("py-4", isNeon ? "px-6" : "px-8")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("flex items-center justify-center",
                      isNeon ? "w-8 h-8 rounded bg-zinc-800 border border-white/5" : "w-10 h-10 rounded bg-blue-50 border border-blue-100",
                    )}>
                      <img src={item.image_url} className={cn("w-full h-full object-cover rounded", !isNeon && "opacity-80")} />
                    </div>
                    <span className={cn("font-bold tracking-tight",
                      isNeon ? "text-xs text-white" : "text-sm text-[var(--text-primary)]",
                    )}>{item.name}</span>
                  </div>
                </td>
                {isNeon && <td className="px-6 py-4 text-[11px] text-slate-400 uppercase">{item.category}</td>}
                <td className={cn("py-4 font-bold text-right",
                  isNeon ? "px-6 text-[11px] text-white" : "px-8 text-sm text-[var(--text-primary)]",
                )}>{isNeon ? item.quantity.toLocaleString() : item.quantity}</td>
                <td className={cn("py-4", isNeon ? "px-6" : "px-8")}>
                  <StatusBadge status={item.status} className={!isNeon ? "px-2.5 py-1 text-[10px]" : ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DashboardMobile({ inventory }: { inventory?: InventoryItem[] }) {
  const { isNeon } = useTheme();
  const colors = useChartColors();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-32">
      <div className={cn("mb-8", !isNeon && "")}>
        <h1 className={cn("headline font-extrabold tracking-tight",
          isNeon ? "text-3xl text-white" : "text-2xl text-[var(--text-primary)]",
        )}>
          System <span className={cn(isNeon ? "text-[var(--primary)] neon-glow-text-primary" : "text-[var(--text-accent)]")}>Overview</span>
        </h1>
        <p className={cn("text-sm", isNeon ? "text-slate-400 font-medium" : "text-[var(--text-muted)] mt-1")}>
          {isNeon ? "Automated inventory tracking active." : "Real-time enterprise inventory tracking active."}
        </p>
      </div>

      {/* Mobile KPI Grid */}
      {isNeon ? (
        <div className="grid grid-cols-2 gap-3">
          <KpiCard compact icon={<TrendingUp size={20} />} label="Total Units" value="4,821" change="+12%" changeType="positive" />
          <KpiCard compact icon={<TrendingUp size={20} />} label="Asset Value" value="$84.2K" change="LIVE" changeType="neutral"
            className="border-[var(--secondary)]/30 shadow-[inset_0_0_12px_rgba(0,255,204,0.05)]" />
          <KpiCard compact icon={<AlertTriangle size={20} />} label="Low Stock" value="03" change="14" changeType="negative"
            className="border-slate-800" />
          <KpiCard compact icon={<History size={20} />} label="24h Trans." value="182"
            className="border-slate-800" />
        </div>
      ) : (
        <MobileKpiGridAxiom />
      )}

      {/* Chart */}
      <div className={cn(
        isNeon ? "bg-zinc-900/50 neon-border-pink p-5 rounded-lg" : "bg-[var(--surface)] p-6 rounded-xl shadow-[var(--card-shadow)] border border-[var(--border-default)]",
      )}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={cn("uppercase text-[11px] font-bold",
            isNeon ? "font-label tracking-widest text-[var(--primary)]" : "text-xs tracking-widest text-[var(--text-primary)]",
          )}>{isNeon ? "Flow_Analytics" : "Stock_Movement_Flow"}</h3>
          {isNeon && (
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_5px_#ff2d78]" />
              <div className="w-2 h-2 rounded-full bg-[var(--secondary)] shadow-[0_0_5px_#00ffcc]" />
            </div>
          )}
        </div>
        <div className={cn("w-full min-h-0 min-w-0", isNeon ? "h-40" : "h-32")}>
          <ResponsiveContainer width="100%" height="100%">
            {isNeon ? (
              <BarChart data={mobileBarData}>
                <Bar dataKey="val" fill={colors.stroke} radius={[2, 2, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={mobileAreaData}>
                <Area type="monotone" dataKey="v" stroke={colors.stroke} strokeWidth={3} fill={colors.fillStart} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className={cn("flex justify-between mt-2 uppercase",
          isNeon ? "text-[9px] font-label text-slate-400 tracking-tighter" : "text-[10px] font-bold text-[var(--text-muted)] tracking-widest mt-4",
        )}>
          <span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span>
        </div>
      </div>

      {/* Active Inventory */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className={cn("uppercase font-bold",
            isNeon ? "font-label tracking-widest text-xs" : "text-xs tracking-widest text-[var(--text-primary)]",
          )}>{isNeon ? "Active_Inventory" : "Active_Inventory"}</h3>
          <span className={cn("text-[10px] uppercase tracking-widest",
            isNeon ? "text-[var(--secondary)] font-medium" : "text-[var(--text-accent)] font-bold text-[11px]",
          )}>{isNeon ? "View All" : "VIEW FULL LEDGER"}</span>
        </div>
        {Array.isArray(inventory) && inventory.map(item => (
          <div key={item.id} className={cn("p-4 flex items-center justify-between",
            isNeon
              ? cn("bg-zinc-900 border-l-2", item.status === "CRITICAL" ? "border-[var(--tertiary)]" : "border-[var(--primary)]")
              : cn("bg-[var(--surface)] border-l-4 rounded-r-xl shadow-sm", item.status === "CRITICAL" ? "border-red-500" : "border-[var(--text-accent)]"),
          )}>
            <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 flex items-center justify-center rounded",
                isNeon ? "bg-zinc-800" : "w-11 h-11 bg-[var(--surface-alt)] rounded-lg",
              )}>
                <img src={item.image_url} className="w-full h-full object-cover rounded opacity-80" />
              </div>
              <div>
                <div className={cn("text-sm font-bold tracking-tight headline",
                  isNeon ? "text-white" : "text-[var(--text-primary)]",
                )}>{isNeon ? item.name.replace(/ /g, "_") : item.name}</div>
                <div className={cn("text-[10px] text-[var(--text-muted)] uppercase",
                  isNeon ? "font-label tracking-tight" : "font-medium tracking-tight",
                )}>{isNeon ? `SN: ${item.sku}` : `UUID: ${item.sku}`}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={cn("text-sm font-bold headline", isNeon ? "text-white" : "text-[var(--text-primary)]")}>
                {item.quantity} <span className={cn("text-[10px] font-normal", isNeon ? "text-slate-500" : "font-medium text-[var(--text-muted)]")}>Units</span>
              </div>
              <div className={cn("text-[9px] font-bold uppercase",
                isNeon ? "font-label tracking-widest" : "tracking-wider",
                item.status === "CRITICAL"
                  ? (isNeon ? "text-[var(--tertiary)]" : "text-red-500")
                  : (isNeon ? "text-[var(--secondary)] neon-glow-text-secondary" : "text-[var(--status-ok-text)]"),
              )}>{item.status}</div>
              <div className="mt-2 flex gap-1 justify-end">
                <button
                  onClick={() => navigate("/inventory", { state: { transition: "push" } })}
                  className={cn("text-[8px] border px-1 py-0.5 uppercase",
                    isNeon ? "border-zinc-800 text-zinc-600" : "border-[var(--border-default)] text-[var(--text-muted)] font-bold",
                  )}><span>Inventory</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FloatingActions showScan={true} />
    </div>
  );
}

function MobileKpiGridAxiom() {
  const stats = [
    { label: "Total Units", val: "4,821", change: "+12.5%", icon: <TrendingUp size={18} className="text-blue-700" />, iconBg: "bg-blue-50", changeBg: "text-green-600 bg-green-50" },
    { label: "Asset Value", val: "$84,200", change: "LIVE", icon: <TrendingUp size={18} className="text-slate-600" />, iconBg: "bg-slate-50", changeBg: "text-red-600 bg-red-50" },
    { label: "Low Stock", val: "03", change: "CRITICAL", icon: <AlertTriangle size={18} className="text-red-600" />, iconBg: "bg-red-50", changeBg: "text-red-600 bg-red-50" },
    { label: "24h Trans", val: "182", change: "", icon: <TrendingUp size={18} className="text-slate-600" />, iconBg: "bg-slate-50", changeBg: "" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <div className={cn("p-2 rounded-lg", stat.iconBg)}>{stat.icon}</div>
            {stat.change && <span className={cn("text-[10px] font-bold px-2 py-1 rounded", stat.changeBg)}>{stat.change}</span>}
          </div>
          <div>
            <div className="text-2xl font-bold headline text-slate-900">{stat.val}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
