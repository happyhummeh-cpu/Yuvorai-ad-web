import { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCareer } from "../context/CareerContext";
import { 
  Flame, 
  Search, 
  MessageSquare, 
  Mic, 
  FileText, 
  Map, 
  Crown, 
  Gift, 
  User, 
  HelpCircle, 
  Linkedin, 
  TrendingUp, 
  Terminal,
  ChevronRight,
  Zap,
  Sparkles
} from "lucide-react";

const SMARTLINK_URL = "https://molecularshindy.com/m8tapc7w?key=be0a244440117459f9bf52bf6601e5df"; 

const DYNAMIC_MESSAGES = [
  "Abhi is grinding DSA... 💻",
  "Checking for new roles in Bangalore... 🔍",
  "AI Cache warmed up. Ready to cook. 🧠",
  "Analyzing latest market trends... 📈",
  "Updating Career OS sub-modules... ⚡",
  "New roadmap unlock scheduled for 6PM. 🕰️",
  "Refining your interview pitch... 🎤",
  "Analyzing resume keywords... 📄",
  "Syncing with Telegram gateway... 🛡️"
];

const USER_PROFILES = [
  { name: "Abhi · CSE Y1", role: "🔪 Silent Grinder", level: "Advanced", streak: 2, xpTotal: 946 },
  { name: "Rohan · SWE Intern", role: "⚡ Speed Demon", level: "Elite", streak: 5, xpTotal: 1240 },
  { name: "Neha · Data Sci", role: "🧠 Pattern Finder", level: "Expert", streak: 12, xpTotal: 3450 },
  { name: "Dev · Backend", role: "🛡️ Stack Protector", level: "Master", streak: 8, xpTotal: 2100 },
  { name: "Kiara · UI/UX", role: "✨ Pixel Perfect", level: "Pro", streak: 3, xpTotal: 580 }
];

const DashboardButton = ({ 
  label, 
  emoji, 
  className = "", 
  isFull = false,
  onClick
}: { 
  label: string, 
  emoji: string, 
  className?: string, 
  isFull?: boolean,
  onClick?: () => void
}) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative overflow-hidden group
        bg-white/[0.03] border border-white/10 rounded-2xl
        p-4 flex flex-col items-center justify-center gap-2
        transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]
        ${isFull ? 'col-span-2 py-6' : ''}
        ${className}
      `}
    >
      <div className="absolute top-1 right-1 opacity-10 group-hover:opacity-30 transition-opacity">
         <Sparkles className="w-3 h-3 text-white" />
      </div>
      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{emoji}</div>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
        {label}
      </span>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.button>
  );
};

export const CareerDashboard = memo(function CareerDashboard() {
  const { xp, level, streak, gainXP, lastReason } = useCareer();
  const [msgIndex, setMsgIndex] = useState(0);
  const [profileIndex, setProfileIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const profilesWithUser = useMemo(() => [
    { name: "You (Member)", role: "🚀 Rising Star", level: `Lvl ${level}`, streak, xpTotal: xp, isUser: true },
    ...USER_PROFILES
  ], [level, xp, streak]);

  useEffect(() => {
    // Fast cycle for messages
    const fastInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % DYNAMIC_MESSAGES.length);
    }, 10000);

    // Profile cycle (30s)
    const profileInterval = setInterval(() => {
      setProfileIndex(prev => (prev + 1) % profilesWithUser.length);
    }, 30000);

    return () => {
      clearInterval(fastInterval);
      clearInterval(profileInterval);
    };
  }, [profilesWithUser.length]);

  const currentProfile = profilesWithUser[profileIndex];

  const handleAction = (label: string) => {
    // 1. Gain XP for taking action
    gainXP(15, `Used ${label}`);

    // 2. Show Interstitial Loading (Zero-Lag Ad Simulation)
    setLoadingAction(label);
    
    // 3. High-Revenue Redirect Logic
    setTimeout(() => {
      window.open(SMARTLINK_URL, '_blank');
      setLoadingAction(null);
      
      // Show the "Free stuff on Telegram" notification as backup
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1800);
  };

  return (
    <div id="career-dashboard" className="w-full max-w-md mx-auto space-y-4 p-2 relative">
      {/* Interstitial Ad Overlay (No-Lag, High Revenue) */}
      <AnimatePresence>
        {loadingAction && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-full max-w-xs space-y-8">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center font-black text-emerald-400">
                  {loadingAction === "Premium" ? "💎" : "⚡"}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tighter text-white">
                  Opening {loadingAction} Module
                </h3>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest animate-pulse">
                    Syncing with High-Priority Ad Node...
                  </p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-[11px] text-emerald-400 font-bold leading-relaxed px-2 italic">
                    "Support from students like you keeps these premium tools free forever."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Telegram Freebie Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[320px] bg-emerald-500 text-black p-4 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.4)] border border-emerald-400"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black/10 p-2 rounded-xl">
                 <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="font-black text-[12px] uppercase tracking-tight">Gift Unlocked! 🎁</p>
                <p className="text-[10px] font-bold opacity-80">Check @Yuvorai_bot for your free module.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Dash Card */}
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#0d1019] p-4 sm:p-8 shadow-2xl shadow-emerald-500/5">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

        <div className="relative z-10 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-[9px] sm:text-xs uppercase tracking-[0.2em] text-white/40">
              Career Dynamic OS
            </h3>
            <div className="bg-emerald-500/20 text-emerald-400 text-[8px] sm:text-[10px] px-2 py-0.5 sm:py-1 rounded-full font-bold flex items-center gap-1.5">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
              LIVE
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 p-[1px]">
                 <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#0d1019] flex items-center justify-center text-lg sm:text-xl">
                   {profileIndex % 2 === 0 ? "👤" : "👨‍💻"}
                 </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={profileIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <h4 className="font-bold text-sm sm:text-base text-white">{currentProfile.name}</h4>
                  <p className="text-[9px] sm:text-[10px] font-mono text-emerald-400 italic">{currentProfile.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={profileIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                >
                  <span className="bg-white/5 border border-white/10 px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-bold text-white/60">
                    ⭐ {currentProfile.level}
                  </span>
                  <span className="bg-orange-500/10 border border-orange-500/20 px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-bold text-orange-400 flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {currentProfile.streak}d streak
                  </span>
                  <span className="bg-blue-500/10 border border-blue-500/20 px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-bold text-blue-400 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" /> {currentProfile.isUser ? xp : currentProfile.xpTotal} XP
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-end h-3 sm:h-4 overflow-hidden">
              <span className="text-[8px] sm:text-[10px] font-black tracking-tighter text-white/20 uppercase">XP Progress</span>
              <span className="text-[8px] sm:text-[10px] font-mono text-white/50">{xp % 100} / 100</span>
            </div>
            <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                animate={{ width: `${xp % 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>
            <AnimatePresence>
              {lastReason && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[8px] sm:text-[10px] text-emerald-400 font-bold uppercase tracking-widest text-right"
                >
                  +{15} XP: {lastReason}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="pt-2 border-t border-white/5 flex items-center justify-between group cursor-pointer h-7 sm:h-8"
            onClick={() => handleAction("Help")}
          >
            <AnimatePresence mode="wait">
              <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[10px] sm:text-xs text-white/40 italic"
              >
                {DYNAMIC_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 pb-8">
        <DashboardButton emoji="🍳" label="Half Cooked" className="border-orange-500/20 text-orange-400 p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Half Cooked")} />
        <DashboardButton emoji="🔍" label="Opportunity" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Opportunity")} />
        <DashboardButton emoji="💬" label="AI Coach" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("AI Coach")} />
        
        <DashboardButton emoji="🎤" label="Interview" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Interview")} />
        <DashboardButton emoji="🥏" label="Resume Roast" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Resume Roast")} />
        <DashboardButton emoji="🗺️" label="Roadmap" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Roadmap")} />
        
        <DashboardButton emoji="💎" label="Premium" className="border-purple-500/20 text-purple-400 p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Premium")} />
        <DashboardButton emoji="🎁" label="Refer" className="border-amber-500/20 text-amber-400 p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Refer")} />
        <DashboardButton emoji="💡" label="Provide Help" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Provide Help")} />
        
        <DashboardButton emoji="🗿" label="LinkedIn Roast" className="p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("LinkedIn Roast")} />
        <DashboardButton emoji="💰" label="Salary Advice" className="border-emerald-500/20 text-emerald-400 p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("Salary Advice")} />
        <DashboardButton emoji="⛳" label="DSA Master" className="border-blue-500/20 text-blue-400 p-2 sm:p-3 text-[8px] sm:text-[10px]" onClick={() => handleAction("DSA Master")} />
      </div>
    </div>
  );
});
