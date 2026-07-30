import React from "react";
import { User, Mail, Shield, Clock, Key, Bell } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/cn";

export function ProfilePage() {
  const { isNeon } = useTheme();

  const user = {
    name: "Alex Chen",
    role: "System Administrator",
    email: "alex.chen@neoncore.sys",
    joined: "2024-01-12",
    id: "OP-8492",
    status: "Active",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className={cn(
          isNeon
            ? "text-2xl font-black font-headline uppercase tracking-widest text-[#ff2d78] neon-glow-text-primary mb-1"
            : "text-3xl font-bold text-[var(--text-primary)] tracking-tight",
        )}>{isNeon ? "Operator_Profile" : "Operator Profile"}</h1>
        <p className={cn(
          isNeon ? "font-label text-xs uppercase tracking-widest text-[var(--text-muted)]" : "text-[var(--text-muted)] text-sm mt-1",
        )}>{isNeon ? "System Access: GRANTED" : "Manage your account settings and preferences."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className={cn("flex flex-col items-center text-center",
            isNeon
              ? "bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.05)]"
              : "bg-[var(--surface)] p-6 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-default)]",
          )}>
            <div className={cn("overflow-hidden mb-4",
              isNeon
                ? "w-24 h-24 rounded-full border-2 border-[#ff2d78] p-1 shadow-[0_0_15px_rgba(255,45,120,0.3)] bg-black"
                : "w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm",
            )}>
              <img src={isNeon ? "https://picsum.photos/seed/user/200/200" : "https://picsum.photos/seed/axiom-user/200/200"} alt="Profile" className={cn("w-full h-full object-cover", isNeon && "rounded-full")} />
            </div>
            <h2 className={cn("text-xl font-bold",
              isNeon ? "font-headline text-white tracking-tight" : "text-[var(--text-primary)]",
            )}>{user.name}</h2>
            <p className={cn("mb-4",
              isNeon ? "text-xs font-label uppercase tracking-widest text-[var(--text-muted)]" : "text-sm font-medium text-[var(--text-muted)]",
            )}>{user.role}</p>
            <span className={cn("text-[10px] font-bold px-3 py-1 uppercase tracking-widest",
              isNeon
                ? "bg-[var(--status-ok-bg)] text-[var(--status-ok-text)] border border-[var(--status-ok-border)] rounded"
                : "bg-[var(--status-ok-bg)] text-[var(--status-ok-text)] rounded-full text-xs tracking-wider",
            )}>{user.status}</span>
          </div>

          {/* Quick Actions */}
          <div className={cn(
            isNeon
              ? "bg-zinc-900/80 backdrop-blur-md p-6 rounded-xl border border-white/5"
              : "bg-[var(--surface)] p-6 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-default)]",
          )}>
            <h3 className={cn("uppercase tracking-widest mb-4",
              isNeon ? "text-[10px] font-bold font-label text-[var(--text-muted)]" : "text-xs font-bold text-[var(--text-primary)]",
            )}>{isNeon ? "System Actions" : "Quick Actions"}</h3>
            <div className="space-y-2">
              {[
                { icon: Key, label: isNeon ? "Security_Key" : "Change Password", color: isNeon ? "text-[#ff2d78]" : undefined, hoverBorder: "hover:border-[#ff2d78]/50" },
                { icon: Bell, label: isNeon ? "Alerts" : "Notification Settings", color: isNeon ? "text-[#00ffcc]" : undefined, hoverBorder: "hover:border-[#00ffcc]/50" },
              ].map(({ icon: Icon, label, color, hoverBorder }) => (
                <button key={label} className={cn("w-full flex items-center justify-between p-3 transition-all group",
                  isNeon
                    ? cn("bg-black/40 border border-white/5 rounded text-slate-300 hover:text-white", hoverBorder)
                    : "rounded-lg hover:bg-[var(--surface-alt)] text-[var(--text-secondary)]",
                )}>
                  <span className={cn("flex items-center gap-3",
                    isNeon ? "text-[11px] font-label uppercase tracking-widest" : "text-sm font-medium",
                  )}>
                    <Icon size={isNeon ? 14 : 16} className={cn(color, isNeon && "group-hover:shadow-[0_0_10px_currentColor]")} />
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className={cn(
            isNeon
              ? "bg-zinc-900/80 backdrop-blur-md p-8 rounded-xl border border-white/5"
              : "bg-[var(--surface)] p-8 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-default)]",
          )}>
            <h3 className={cn("font-bold mb-6 pb-4 border-b",
              isNeon
                ? "text-sm font-headline uppercase tracking-widest text-white border-white/10 flex items-center gap-2"
                : "text-lg text-[var(--text-primary)] border-[var(--table-divide)]",
            )}>
              {isNeon && <span className="w-1.5 h-4 bg-[#ff2d78]" />}
              {isNeon ? "Personal_Data" : "Personal Information"}
            </h3>
            <div className={cn("grid grid-cols-1 sm:grid-cols-2", isNeon ? "gap-8" : "gap-6")}>
              {[
                { label: isNeon ? "Operator Name" : "Full Name", value: user.name, icon: User, mono: false },
                { label: isNeon ? "Comms Channel" : "Email Address", value: user.email, icon: Mail, mono: false },
                { label: isNeon ? "Sys_ID" : "Operator ID", value: user.id, icon: Shield, mono: true },
                { label: isNeon ? "Init Date" : "Joined Date", value: user.joined, icon: Clock, mono: true },
              ].map(({ label, value, icon: Icon, mono }) => (
                <div key={label}>
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1",
                    isNeon ? "font-label mb-2" : "text-xs",
                  )}>{label}</p>
                  <div className={cn("flex items-center gap-3 text-sm",
                    isNeon ? "text-white" : "text-[var(--text-primary)] font-medium",
                    mono && (isNeon ? "font-mono text-xs" : "font-mono"),
                  )}>
                    <Icon size={isNeon ? 16 : 18} className={cn(
                      isNeon
                        ? (label.includes("Name") || label.includes("Comms") ? "text-[#00ffcc]" : "text-[#ff2d78]")
                        : "text-[var(--text-accent)]",
                    )} />
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Preferences */}
          <div className={cn(
            isNeon
              ? "bg-zinc-900/80 backdrop-blur-md p-8 rounded-xl border border-white/5"
              : "bg-[var(--surface)] p-8 rounded-2xl shadow-[var(--card-shadow)] border border-[var(--border-default)]",
          )}>
            <h3 className={cn("font-bold mb-6 pb-4 border-b",
              isNeon
                ? "text-sm font-headline uppercase tracking-widest text-white border-white/10 flex items-center gap-2"
                : "text-lg text-[var(--text-primary)] border-[var(--table-divide)]",
            )}>
              {isNeon && <span className="w-1.5 h-4 bg-[#00ffcc]" />}
              {isNeon ? "Config_Protocol" : "System Preferences"}
            </h3>
            <div className="space-y-4">
              <div className={cn("flex items-center justify-between p-4 rounded transition-colors",
                isNeon ? "bg-black/40 border border-white/5 hover:border-[#ff2d78]/30" : "bg-[var(--surface-alt)] rounded-xl border border-[var(--table-divide)]",
              )}>
                <div>
                  <p className={cn("font-bold",
                    isNeon ? "text-white text-xs font-headline uppercase tracking-widest" : "text-[var(--text-primary)] text-sm",
                  )}>{isNeon ? "2FA Security" : "Two-Factor Authentication"}</p>
                  <p className={cn("mt-1",
                    isNeon ? "text-[10px] font-label text-[var(--text-muted)] uppercase tracking-wider" : "text-xs text-[var(--text-muted)]",
                  )}>{isNeon ? "Require secondary token." : "Add an extra layer of security to your account."}</p>
                </div>
                <button className={cn("px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
                  isNeon
                    ? "bg-transparent border border-[#ff2d78] text-[#ff2d78] hover:bg-[#ff2d78]/10 rounded shadow-[0_0_10px_rgba(255,45,120,0.1)]"
                    : "bg-[var(--btn-primary-bg)] text-white rounded-lg shadow-sm hover:opacity-90",
                )}>{isNeon ? "Enable_2FA" : "Enable"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
