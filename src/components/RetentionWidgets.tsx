import { useState, useEffect, useRef, memo } from "react";
import { Timer, Laugh, Search, Crosshair, Trophy, Box, Gift, AlertTriangle, Zap, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const StreakCounter = memo(function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('user_streak_data');
    let currentStreak = 1;

    if (storedData) {
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
    }

    setStreak(currentStreak);
    localStorage.setItem('user_streak_data', JSON.stringify({ lastVisit: today, count: currentStreak }));
  }, []);

  if (streak === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full cursor-pointer hover:bg-orange-500/20 transition-all shadow-[0_0_15px_rgba(249,115,22,0.15)] group animate-in fade-in slide-in-from-top-4">
      <Flame className={`w-4 h-4 ${streak > 1 ? 'fill-orange-400 animate-pulse' : ''}`} />
      <span className="font-bold font-mono tracking-wider text-sm flex items-center gap-1.5">
        {streak} <span className="text-[10px] uppercase text-orange-400/70 tracking-[0.2em] hidden sm:inline-block">Day Streak</span>
      </span>
      
      {/* Tooltip */}
      <div className="absolute top-full mt-2 right-0 w-48 bg-black/90 border border-white/10 rounded-xl p-3 text-xs text-white/70 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center shadow-2xl backdrop-blur-md">
         Come back tomorrow to keep your streak alive!
      </div>
    </div>
  );
});

export const ReflexTest = memo(function ReflexTest() {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [message, setMessage] = useState("Can You Beat 0.21s?");
  const [time, setTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

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
  const [open, setOpen] = useState(false);
  
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Hardware: The part of a computer that you can kick."
  ];

  const [joke, setJoke] = useState(0);

  const handleClick = () => {
    if (!open) setOpen(true);
    else setJoke((j) => (j + 1) % jokes.length);
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Laugh className="w-5 h-5 text-orange-400" />
        <h4 className="font-bold text-white">Engineering Meme Vault</h4>
      </div>
      {!open ? (
        <button onClick={handleClick} className="w-full py-4 rounded-xl font-bold bg-white/5 text-white/90 hover:bg-white/10 border border-white/10 transition-colors">
          Open Meme Lab
        </button>
      ) : (
        <div className="text-center w-full">
           <p className="text-sm text-white/80 italic mb-4 font-serif">"{jokes[joke]}"</p>
           <button onClick={handleClick} className="text-xs text-white/40 hover:text-white/80 transition-colors">
              Next Joke →
           </button>
        </div>
      )}
    </div>
  );
});

export const HiddenTool = memo(function HiddenTool() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <Search className="w-5 h-5 text-cyan-400" />
        <h4 className="font-bold text-white">Daily Secret Tool</h4>
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="w-full py-4 rounded-xl font-bold bg-white/5 text-white/90 hover:bg-white/10 border border-white/10 transition-colors">
          Reveal Today's Hidden Tool
        </button>
      ) : (
        <div className="text-center w-full">
           <a href="https://roadmap.sh" target="_blank" rel="noreferrer" className="text-lg font-bold text-cyan-400 hover:underline mb-2 block">
             roadmap.sh
           </a>
           <p className="text-xs text-white/50">Comprehensive developer roadmaps.</p>
        </div>
      )}
    </div>
  );
});

export const RageClickArena = memo(function RageClickArena() {
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
             onClick={() => setCaught(true)}
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
  const namePool = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharva", "Aarush", "Ananya", "Diya", "Riya", "Aanya", "Myra", "Kiara", "Kavya", "Saanvi", "Pari", "Navya", "Rudra", "Reyansh", "Anika", "Dhruv", "Kabir", "Neha", "Aryan"];
  
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
      
      <div className="relative font-mono flex flex-col gap-3 h-[380px]">
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
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] transition-colors flex flex-col items-center justify-center min-h-[220px]">
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <span className="w-5 h-5 text-yellow-500 font-bold block text-center">⚡</span>
        <h4 className="font-bold text-white">Daily Survival Pack</h4>
      </div>
      <div className="w-full space-y-2 text-sm font-mono">
         <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5">
           <span className="text-white/50">🤖 AI Tool</span>
           <span className="text-emerald-400 font-bold">Cursor</span>
         </div>
         <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5">
           <span className="text-white/50">😂 Meme</span>
           <span className="text-white text-xs">"CSS is my passion"</span>
         </div>
         <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5">
           <span className="text-white/50">💡 Tip</span>
           <span className="text-white">Learn to use grep</span>
         </div>
         <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded px-3 border border-white/5">
           <span className="text-white/50">🔗 Link</span>
           <span className="text-emerald-400">Google SWE Intern</span>
         </div>
      </div>
    </div>
  );
});

export const SecretEvent = memo(function SecretEvent() {
  return (
    <div className="w-full bg-red-900/10 border border-red-500/20 rounded-2xl p-6 text-center cursor-pointer group hover:bg-red-900/20 transition-colors relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
       <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
       <div className="flex items-center justify-center gap-2 mb-1 animate-pulse">
         <span className="w-4 h-4 text-red-500 text-center font-bold">⚠️</span>
         <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Secret Event Active</span>
         <span className="w-4 h-4 text-red-500 text-center font-bold">⚠️</span>
       </div>
       <p className="text-red-400/70 text-[10px] font-mono mb-4">Closes in 08:42 minutes</p>
       <button className="py-3 px-6 rounded-xl font-bold bg-red-500/10 text-red-400 border border-red-500/30 group-hover:bg-red-500/20 hover:text-red-300 w-full transition-colors text-sm">
         Access Classified Server
       </button>
    </div>
  );
});

export const BrainRotFeed = memo(function BrainRotFeed() {
  const cards = [
    { type: 'tool', title: "Best AI Tool 2024", desc: "Build full-stack apps from prompt." },
    { type: 'meme', title: "Me attempting DSA", desc: "Looks at array... gives up." },
    { type: 'hack', title: "Chrome hidden trick", desc: "Type chrome://dino to play." },
    { type: 'fact', title: "Dark Web Fact", desc: "Surface web is only 4% of internet." },
    { type: 'job', title: "Internship Hacks", desc: "Cold email recruiters directly." },
    { type: 'AI', title: "Daily ChatGPT Prompt", desc: "Write my React tests for me please." }
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.02] transition-colors relative overflow-hidden h-[400px] flex flex-col">
      <h4 className="text-lg font-bold text-white mb-6">Brain Rot Feed</h4>
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide flex-1 pb-4">
         {cards.map((card, i) => (
           <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer shrink-0">
             <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 mb-1 block">{card.type}</span>
             <h5 className="font-bold text-white mb-1">{card.title}</h5>
             <p className="text-sm text-white/50">{card.desc}</p>
           </div>
         ))}
         <div className="bg-white/[0.02] border border-white/5 border-dashed p-8 rounded-xl text-center shrink-0">
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Loading more...</span>
         </div>
      </div>
    </div>
  );
});
