import React, { useState, useEffect, useRef, memo } from "react";
import { Timer, Laugh, Search, Crosshair, Trophy, Box, Gift, AlertTriangle, Zap, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCareer } from "../context/CareerContext";

export const StreakCounter = memo(function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('user_streak_data');
    let currentStreak = 1;

    if (storedData) {
      try {
        const { lastVisit, count } = JSON.parse(storedData);
        if (lastVisit === today) {
          currentStreak = count; // Already visited today
        } else {
          const lastDate = new Date(lastVisit);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if (diffDays === 1) {
            currentStreak = count + 1; // Visited next day
          } else {
            currentStreak = 1; // Streak broken
          }
        }
      } catch (e) {
        console.warn("Failed to parse streak data, resetting.");
        currentStreak = 1;
      }
    }

    setStreak(currentStreak);
    localStorage.setItem('user_streak_data', JSON.stringify({ lastVisit: today, count: currentStreak }));
  }, []);

  if (streak === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-2.5 bg-black/90 backdrop-blur-xl border border-orange-500/50 text-white px-4 py-2 mt-4 rounded-full cursor-pointer hover:scale-105 hover:bg-black transition-all shadow-[0_0_25px_rgba(249,115,22,0.5)] group animate-in fade-in slide-in-from-top-4">
      <Flame className={`w-4 h-4 ${streak > 1 ? 'fill-orange-500 text-orange-500 animate-pulse' : 'text-orange-400'}`} />
      <span className="font-bold font-mono tracking-wider text-sm flex items-center gap-1.5">
        <span className="text-orange-400 text-base leading-none">{streak}</span> 
        <span className="text-[10px] uppercase text-white/80 tracking-[0.15em] pt-0.5">Day Streak</span>
      </span>
      
      {/* Tooltip */}
      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 bg-black border border-orange-500/30 rounded-xl p-3 text-[10px] font-medium text-white/90 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center shadow-2xl backdrop-blur-md">
         Come back tomorrow to keep your streak alive and earn more XP!
      </div>
    </div>
  );
});

export const ReflexTest = memo(function ReflexTest() {
  const { gainXP } = useCareer();
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [message, setMessage] = useState("Can You Beat 0.21s?");
  const [time, setTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (state === 'idle' || state === 'result') {
      setState('waiting');
      setMessage("Wait for Green...");
      const delay = Math.random() * 3000 + 2000;
      timeoutRef.current = setTimeout(() => {
        setState('ready');
        setMessage("CLICK NOW!");
        startTimeRef.current = Date.now();
      }, delay);
    } else if (state === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState('result');
      setMessage("Too Early! Try Again.");
    } else if (state === 'ready') {
      const reactionTime = (Date.now() - startTimeRef.current) / 1000;
      setTime(reactionTime);
      setState('result');
      setMessage(`You took ${reactionTime}s`);
      gainXP(30, "Reflex Challenge");
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Timer className="w-5 h-5 text-yellow-400" />
        <h4 className="font-bold text-white">Impossible Reflex Test</h4>
      </div>
      <button 
        onClick={handleClick}
        className={`w-full py-4 rounded-xl font-bold tracking-wide transition-colors ${
          state === 'waiting' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
          state === 'ready' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]' :
          'bg-white/5 text-white/90 hover:bg-white/10 border border-white/10'
        }`}
      >
        {message}
      </button>
      {state === 'result' && time && (
         <p className="mt-3 text-xs text-white/50 font-mono">
            🏆 Fastest Today: 0.18s
         </p>
      )}
    </div>
  );
});

export const MemeLab = memo(function MemeLab() {
  const { gainXP } = useCareer();
  const [open, setOpen] = useState(false);
  
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Hardware: The part of a computer that you can kick.",
    "Debugging: Being the detective in a crime movie where you are also the murderer.",
    "There are 10 types of people: those who understand binary and those who don't.",
    "Real programmers count from 0."
  ];

  const todayIndex = new Date().getDate() % jokes.length;
  const [jokeIndex, setJokeIndex] = useState(todayIndex);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      gainXP(10, "Daily Joy");
    } else {
      setJokeIndex((j) => (j + 1) % jokes.length);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Laugh className="w-5 h-5 text-orange-400" />
        <h4 className="font-bold text-white tracking-tight uppercase text-xs">Meme of the Day</h4>
      </div>
      {!open ? (
        <button onClick={handleClick} className="w-full py-4 rounded-xl font-bold bg-white/5 text-white/90 hover:bg-white/10 border border-white/10 transition-colors text-sm uppercase tracking-widest">
          Unlock Daily Laugh
        </button>
      ) : (
        <div className="text-center w-full animate-in zoom-in-95">
           <p className="text-sm text-white/80 italic mb-4 font-medium leading-relaxed">"{jokes[jokeIndex]}"</p>
           <button onClick={handleClick} className="text-[10px] text-white/30 hover:text-white/80 transition-colors uppercase font-black">
              Try Another →
           </button>
        </div>
      )}
    </div>
  );
});

export const HiddenTool = memo(function HiddenTool() {
  const { gainXP } = useCareer();
  const [revealed, setRevealed] = useState(false);
  const tools = [
    { name: "roadmap.sh", desc: "Developer learning paths.", url: "https://roadmap.sh" },
    { name: "excalidraw.com", desc: "Diagrams that look hand-drawn.", url: "https://excalidraw.com" },
    { name: "jsonhero.io", desc: "View JSON files beautifully.", url: "https://jsonhero.io" },
    { name: "tldraw.com", desc: "Collaborative canvas.", url: "https://tldraw.com" },
    { name: "carbon.now.sh", desc: "Create images of code.", url: "https://carbon.now.sh" }
  ];

  const todayIndex = new Date().getDate() % tools.length;
  const tool = tools[todayIndex];

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Search className="w-5 h-5 text-cyan-400" />
        <h4 className="font-bold text-white uppercase text-xs tracking-widest">Secret Tool</h4>
      </div>
      {!revealed ? (
        <button onClick={() => { setRevealed(true); gainXP(15, "Insight Gained"); }} className="w-full py-4 rounded-xl font-black bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all text-xs uppercase tracking-widest">
          Reveal Today's Tool
        </button>
      ) : (
        <div className="text-center w-full animate-in flip-in-y duration-500">
           <a href={tool.url} target="_blank" rel="noreferrer" className="text-lg font-black text-cyan-400 hover:scale-110 transition-transform inline-block mb-1">
             {tool.name}
           </a>
           <p className="text-[10px] text-white/40 font-mono italic">{tool.desc}</p>
        </div>
      )}
    </div>
  );
});

export const RageClickArena = memo(function RageClickArena() {
  const { gainXP } = useCareer();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [caught, setCaught] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (caught) return;
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 80 + 10;
    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[220px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Crosshair className="w-5 h-5 text-red-500" />
        <h4 className="font-bold text-white">Rage Click Arena</h4>
      </div>
      
      {!caught ? (
         <div ref={containerRef} className="w-full h-[120px] bg-black/50 rounded-xl relative border border-white/5 overflow-hidden">
           <button 
             onMouseEnter={handleHover}
             onClick={() => { setCaught(true); gainXP(25, "Rage Mastered"); }}
             style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
             className="absolute w-6 h-6 bg-red-500 rounded-full cursor-crosshair transition-all duration-150 ease-out"
           />
           <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Catch The Moving Dot</span>
           </div>
         </div>
      ) : (
         <div className="w-full h-[120px] flex flex-col items-center justify-center">
            <span className="text-3xl mb-2">🎯</span>
            <p className="font-bold text-emerald-400">Caught it!</p>
            <button onClick={() => { setCaught(false); setPosition({x: 50, y: 50}); }} className="text-xs text-white/40 mt-2 hover:text-white">Play Again</button>
         </div>
      )}
    </div>
  );
});

export const GlobalLeaderboard = memo(function GlobalLeaderboard() {
  const namePool = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharva", "Aarush", "Ananya", "Diya", "Riya", "Aanya", "Myra", "Kiara", "Kavya", "Saanvi", "Pari", "Navya", "Rudra", "Reyansh", "Anika", "Dhruv", "Kabir", "Neha", "Rohan"];
  
  const [board, setBoard] = useState([
    { name: "Aarav", pts: 928, prevPts: 928 },
    { name: "Dhruv", pts: 901, prevPts: 901 },
    { name: "Ananya", pts: 887, prevPts: 887 },
    { name: "Vihaan", pts: 850, prevPts: 850 },
    { name: "Kavya", pts: 820, prevPts: 820 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard(prev => {
        let newBoard = prev.map(p => {
            const diff = Math.floor(Math.random() * 21) - 10; // -10 to +10
            return { ...p, prevPts: p.pts, pts: Math.max(0, p.pts + diff) };
        });
        
        // Randomly replace the lowest element sometimes with a new name
        if (Math.random() > 0.6) {
            const currentNames = newBoard.map(p => p.name);
            const availableNames = namePool.filter(n => !currentNames.includes(n));
            if (availableNames.length > 0) {
              const newName = availableNames[Math.floor(Math.random() * availableNames.length)];
              const lowestIdx = newBoard.length - 1;
              const newPts = newBoard[lowestIdx - 1] ? newBoard[lowestIdx - 1].pts - Math.floor(Math.random() * 15) : 800;
              newBoard[lowestIdx] = { 
                  name: newName, 
                  pts: newPts, 
                  prevPts: newPts 
              };
            }
        }

        newBoard.sort((a, b) => b.pts - a.pts);
        return newBoard.slice(0, 5);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
      <div className="flex items-center justify-center gap-3 mb-6 relative">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h4 className="text-xl font-bold text-white">Top Students Today</h4>
        <div className="absolute right-0 flex items-center gap-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold hidden sm:inline-block">Live</span>
        </div>
      </div>
      
      <div className="relative font-mono flex flex-col gap-3 pb-4">
         <AnimatePresence mode="popLayout">
           {board.map((player, idx) => (
               <motion.div 
                 key={player.name} 
                 layout
                 initial={{ opacity: 0, y: 20, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 className="flex items-center justify-between bg-[#111] p-4 rounded-xl border border-white/5 shadow-sm"
               >
                  <div className="flex items-center gap-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-400/20 text-yellow-400' : idx === 1 ? 'bg-zinc-300/20 text-zinc-300' : idx === 2 ? 'bg-amber-700/20 text-amber-600' : 'bg-white/5 text-white/50'}`}>
                        #{idx + 1}
                     </div>
                     <span className="text-white/90 font-medium">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     {player.pts > player.prevPts && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-emerald-400">▲</motion.span>}
                     {player.pts < player.prevPts && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-400">▼</motion.span>}
                     <motion.span 
                        key={player.pts}
                        initial={{ opacity: 0.5, y: player.pts > player.prevPts ? 5 : player.pts < player.prevPts ? -5 : 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`font-bold tabular-nums ${player.pts > player.prevPts ? 'text-emerald-400' : player.pts < player.prevPts ? 'text-red-400' : 'text-emerald-500'}`}
                     >
                        {player.pts} pts
                     </motion.span>
                  </div>
               </motion.div>
           ))}
         </AnimatePresence>
      </div>
    </div>
  );
});

export const StudentCrate = memo(function StudentCrate() {
  const { gainXP } = useCareer();
  const [opened, setOpened] = useState(false);
  const [reward, setReward] = useState("");
  const rewards = [
    "🎁 You found a Hidden API Key bypassing trick!",
    "🧠 Secret Tool unlocked: DeepSeek local setup.",
    "😂 Meme: 'It works on my machine!'",
    "🚀 Profile Hack: Auto-connect on LinkedIn script."
  ];

  const handleOpen = () => {
    setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    setOpened(true);
    gainXP(40, "Daily Reward Crate");
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <span className="w-5 h-5 text-purple-400 text-center font-bold">📦</span>
        <h4 className="font-bold text-white">Open Student Crate</h4>
      </div>
      {!opened ? (
        <button onClick={handleOpen} className="w-full py-4 rounded-xl font-bold bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
          Open Daily Crate
        </button>
      ) : (
        <div className="text-center w-full animate-in zoom-in fade-in duration-300">
           <span className="w-8 h-8 text-emerald-400 mx-auto mb-2 block text-3xl">🎁</span>
           <p className="text-sm text-emerald-400 font-medium">{reward}</p>
        </div>
      )}
    </div>
  );
});

export const DailySurvivalPack = memo(function DailySurvivalPack() {
  const packs = [
    { tool: "Cursor", meme: "CSS is my passion", tip: "Learn grep", link: "Google Intern" },
    { tool: "DeepSeek", meme: "It works on my local", tip: "Use alias", link: "Stripe Internship" },
    { tool: "v0.dev", meme: "LGTM! (Ship it)", tip: "Docker prune", link: "FAANG Openings" },
    { tool: "Postman", meme: "Status 200 OK", tip: "Postman flows", link: "Remote SWE Roles" },
    { tool: "Warp", meme: "Vim exits you", tip: "Zsh themes", link: "NVIDIA Roles" },
    { tool: "Arc", meme: "No more tabs", tip: "Arc boosts", link: "Webflow Roles" },
    { tool: "Figma", meme: "Design is hard", tip: "Auto layout", link: "Product Design" }
  ];

  const todayIndex = new Date().getDate() % packs.length;
  const [index, setIndex] = useState(todayIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % packs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = packs[index];

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all flex flex-col items-center justify-center min-h-[220px] shadow-xl">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <span className="w-5 h-5 text-yellow-500 font-bold block text-center animate-pulse">⚡</span>
        <h4 className="font-black text-white uppercase text-xs tracking-widest italic">Daily Survival Pack</h4>
      </div>
      <div className="w-full space-y-2 text-sm font-mono relative pb-2">
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5 hover:bg-white/5 transition-colors">
              <span className="text-white/30 text-[9px] uppercase font-bold">Bot Pick</span>
              <span className="text-emerald-400 font-black">{current.tool}</span>
            </div>
            <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5 hover:bg-white/5 transition-colors">
              <span className="text-white/30 text-[9px] uppercase font-bold">Relatable</span>
              <span className="text-white text-[10px] truncate max-w-[120px] font-medium italic">"{current.meme}"</span>
            </div>
            <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5 hover:bg-white/5 transition-colors">
              <span className="text-white/30 text-[9px] uppercase font-bold">Quick Fix</span>
              <span className="text-white text-[10px] font-bold">{current.tip}</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-2 rounded px-3 border border-emerald-500/30">
              <span className="text-white/50 text-[9px] uppercase font-bold">OPPORTUNITY</span>
              <span className="text-emerald-400 font-black text-[10px] uppercase animate-pulse">{current.link}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export const SecretEvent = memo(function SecretEvent() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-red-900/10 border border-red-500/20 rounded-2xl p-6 text-center cursor-pointer group hover:bg-red-900/20 transition-colors relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
       <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
       <div className="flex items-center justify-center gap-2 mb-1 animate-pulse">
         <AlertTriangle className="w-4 h-4 text-red-500" />
         <span className="text-red-500 font-black uppercase tracking-widest text-xs">Priority Event Active</span>
         <AlertTriangle className="w-4 h-4 text-red-500" />
       </div>
       <div className="mb-4">
         <AnimatePresence mode="wait">
            <motion.p 
              key={timeLeft}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-red-400/70 text-xs font-mono tracking-tighter"
            >
              GATEWAY CLOSES IN <span className="text-red-500 font-bold">{formatTime(timeLeft)}</span>
            </motion.p>
         </AnimatePresence>
       </div>
       <button 
          onClick={() => window.open('https://chat.whatsapp.com/H8dgrU0rcEG94I5AZw57Ji', '_blank')}
          className="py-3 px-6 rounded-xl font-black uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#128C7E] w-full transition-all text-xs shadow-[0_5px_15px_rgba(37,211,102,0.4)]"
       >
         Join WhatsApp Community
       </button>
    </div>
  );
});

export const BrainRotFeed = memo(function BrainRotFeed() {
  const defaultContent = [
    { id: '1', type: 'AI', title: "Daily GPT-5", desc: "Leaked prompts revealed." },
    { id: '2', type: 'tool', title: "Cursor", desc: "The only IDE you need." },
    { id: '3', type: 'meme', title: "CSS", desc: "Center a div, I dare you." },
    { id: '4', type: 'hack', title: "Vercel trick", desc: "Instant deployment speeds." },
    { id: '5', type: 'AI', title: "Claude 3.5", desc: "Artifacts are magic." },
    { id: '6', type: 'tool', title: "v0.dev", desc: "Copy-paste UI mastery." }
  ];

  const todayIndex = new Date().getDate() % Math.max(1, defaultContent.length - 2);
  const [content, setContent] = useState(defaultContent);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  useEffect(() => {
    const intv = setInterval(() => {
       setCurrentIndex(prev => (prev + 1) % content.length);
    }, 5000);
    return () => clearInterval(intv);
  }, [content.length]);

  useEffect(() => {
    if (content.length === 0) return;
    const newItems = [];
    for (let i = 0; i < 3; i++) {
        newItems.push(content[(currentIndex + i) % content.length]);
    }
    setItems(newItems.filter(Boolean));
  }, [currentIndex, content]);

  const fetchLatestNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://6a0a836c21e4456256960bc0.mockapi.io/api/news');
      const data = await response.json();
      
      // Handle both array response and object {news: []} response just in case
      const newsArray = Array.isArray(data) ? data : (data.news || data.posts || []);
      
      if (newsArray.length === 0) {
        console.warn('No news found from API, using default content');
        return;
      }
      
      const fetchedNews = newsArray.map((post: any, idx: number) => ({
        id: `news-${idx}-${Math.random()}`,
        type: 'NEWS',
        title: (post.title || post.name || '').substring(0, 30) + (post.title?.length > 30 ? '...' : ''),
        desc: (post.body || post.content || post.description || '').substring(0, 60) + (post.body?.length > 60 ? '...' : '')
      }));
      setContent(fetchedNews);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Failed to fetch news', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.02] transition-colors relative overflow-hidden h-auto max-h-[500px] flex flex-col shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Box className="w-48 h-48 rotate-12" />
      </div>
      <div className="flex items-center justify-between xl:flex-row flex-col gap-4 mb-6">
        <h4 className="text-lg font-black text-white tracking-tighter uppercase italic flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Fresh Social Feed
        </h4>
        <button 
          onClick={fetchLatestNews} 
          disabled={loading}
          className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50 z-10"
        >
          {loading ? 'Fetching...' : 'Fetch Latest News'}
        </button>
      </div>
      
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide flex-1 pb-4 min-h-[300px]">
         <AnimatePresence initial={false}>
           {items.map((card) => (
             <motion.div 
               key={card.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer shrink-0 group"
             >
               <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1 block group-hover:translate-x-1 transition-transform">{card.type}</span>
               <h5 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{card.title}</h5>
               <p className="text-sm text-white/50 leading-relaxed font-mono">{card.desc}</p>
             </motion.div>
           ))}
         </AnimatePresence>
         <div className="bg-white/[0.02] border border-white/5 border-dashed p-8 rounded-xl text-center shrink-0">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black animate-pulse">Syncing Network...</span>
         </div>
      </div>
    </div>
  );
});

export const LiveSocialProof = memo(function LiveSocialProof() {
  const names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Ananya", "Diya", "Riya", "Myra", "Kiara", "Kavya", "Saanvi", "Reyansh", "Anika", "Dhruv", "Kabir", "Neha", "Rohan"];
  const actions = ["unlocked the bot", "accessing files", "joined the channel", "verified membership", "completed setup", "downloaded tools"];
  
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex(Math.floor(Math.random() * names.length));
        setIsVisible(true);
      }, 1000); // stay hidden for 1s
    }, 10000); // change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const action = actions[index % actions.length];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
       <AnimatePresence>
         {isVisible && (
           <motion.div
             initial={{ opacity: 0, y: 15, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="bg-black/80 backdrop-blur-md border border-emerald-500/20 py-1.5 px-3 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
           >
              <div className="relative">
                 <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-black text-[9px] uppercase">
                    {names[index][0]}
                 </div>
                 <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 border border-black rounded-full" />
              </div>
              <div className="flex items-center gap-1.5 drop-shadow-sm">
                 <p className="text-white/90 text-[10px] font-bold tracking-wide">
                    {names[index]} <span className="text-emerald-400/90 font-medium">{action}</span>
                 </p>
                 <span className="text-white/20 text-[10px]">•</span>
                 <p className="text-[9px] text-emerald-200/50 font-mono uppercase tracking-widest font-bold">
                    Now
                 </p>
              </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
});
