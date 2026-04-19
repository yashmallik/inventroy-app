import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard", { state: { transition: "push" } });
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    }),
  };

  const direction = isLogin ? -1 : 1;

  return (
    <div className="theme-neon min-h-screen bg-[#0a0a12] font-body flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff2d78]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffcc]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-[#ff2d78] headline neon-glow-text-primary mb-2">
            NEON_CORE_INV
          </h1>
          <p className="font-label text-xs uppercase tracking-widest text-slate-500">
            Secure Access Terminal
          </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(255,45,120,0.1)] overflow-hidden relative">
          
          <div className="flex mb-8 relative z-20">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                isLogin ? "text-[#00ffcc]" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              System Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                !isLogin ? "text-[#00ffcc]" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Register Access
            </button>
            <motion.div
              className="absolute bottom-0 h-0.5 bg-[#00ffcc] shadow-[0_0_8px_#00ffcc]"
              initial={false}
              animate={{
                left: isLogin ? "0%" : "50%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="relative h-[340px]">
            <AnimatePresence custom={direction} mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Operator ID / Email
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all"
                          placeholder="admin@neoncore.sys"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Access Code
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="password"
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#ff2d78] hover:bg-[#ff1a66] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,45,120,0.4)] transition-all"
                    >
                      Authenticate <ArrowRight size={16} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Operator Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all"
                          placeholder="New Operator"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Operator Email
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all"
                          placeholder="new@neoncore.sys"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Access Code
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="password"
                          required
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#00ffcc] hover:bg-[#00e6b8] text-[#0a0a12] py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all"
                    >
                      Initialize Access <ArrowRight size={16} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
