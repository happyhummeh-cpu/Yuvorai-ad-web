import { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Heart,
  ExternalLink,
  Code,
  Gamepad2,
  Wrench,
  Server,
  Coffee,
  ArrowDown,
  FileText,
  MessageSquare,
  Briefcase,
  BookOpen,
  TrendingUp,
  Zap,
  Target,
  Shield,
  Crown,
  Layers,
  Laptop,
  AlertTriangle,
  RefreshCcw
} from "lucide-react";
import { ReflexTest, MemeLab, HiddenTool, RageClickArena, GlobalLeaderboard, StudentCrate, DailySurvivalPack, SecretEvent, BrainRotFeed, StreakCounter, LiveSocialProof } from "./components/RetentionWidgets";
import { CareerDashboard } from "./components/CareerDashboard";
import { CareerProvider, useCareer } from "./context/CareerContext";
import { NativeAd } from "./components/NativeAd";
import { SocialBarAd } from "./components/SocialBarAd";
import { PopunderAd } from "./components/PopunderAd";

function TypingText({ text, speed = 30, delay = 0, className = "" }: { text: string; speed?: number; delay?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span className={className}>{displayedText}<span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" /></span>;
}

function TelegramVerification() {
  const { gainXP } = useCareer();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const [showScrollMsg, setShowScrollMsg] = useState(false);

  const handleVerify = async () => {
    setStatus('loading');
    setErrorMessage("");
    setShowScrollMsg(true);
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.7) {
            reject(new Error("GATEWAY TIMEOUT: Bot session not found. Send /verify to @Yuvorai_bot immediately."));
          } else {
            resolve(true);
          }
        }, 1500);
      });
      setStatus('success');
      gainXP(50, "Student Verified");
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || "System error.");
    }
  };

  return (
    <div className="bg-[#0a0f14] border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
      {/* Subtle Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
      
      <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
        <Crown className="w-12 h-12 text-emerald-400/50" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-400" />
             </div>
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">
              Member Verification
            </h4>
          </div>
          
          <div className="p-4 bg-emerald-500/5 border-l-4 border-emerald-500/50 rounded-r-xl">
            <p className="text-sm font-medium text-white/70 leading-relaxed italic">
              "System integrity depends on collective verification."
            </p>
            <p className="text-[10px] mt-2 text-white/40 uppercase tracking-widest font-bold">
              Unlock <span className="text-emerald-400">Encrypted Modules</span> & Higher Bandwidth
            </p>
          </div>
        </div>

        {status === 'idle' && (
          <button 
            onClick={handleVerify}
            className="w-full py-3 sm:py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] relative overflow-hidden group"
          >
            <span className="relative z-10">Initialize Node Sync</span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 group-hover:h-full transition-all duration-300 pointer-events-none" />
          </button>
        )}

        {status === 'loading' && (
          <div className="w-full py-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 bg-white/5">
             <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
             <span className="text-xs font-mono text-white/60 tracking-wider">Connecting to @Yuvorai_bot...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="w-full p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex flex-col items-center animate-in zoom-in-95">
             <Zap className="w-8 h-8 fill-current mb-2" />
             <span className="font-black text-lg uppercase tracking-tight">Access Granted</span>
             <p className="text-xs opacity-70">Premium student features are now live for your session.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-full p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 flex flex-col items-center">
               <span className="font-bold text-[10px] uppercase mb-1 tracking-widest opacity-50 text-red-500">Wait a second</span>
               <p className="text-xs text-center font-medium">{errorMessage}</p>
            </div>
            <div className="flex flex-col gap-3">
               <button 
                 onClick={handleVerify}
                 className="w-full py-3 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
               >
                 <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                 Retry Check
               </button>
            </div>
          </div>
        )}

        {showScrollMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-white/5 mt-4"
          >
             <p className="text-center text-xs font-bold text-emerald-400 animate-pulse flex items-center justify-center gap-2">
                <ArrowDown className="w-3 h-3" />
                Scroll down slowly you will get the access
                <ArrowDown className="w-3 h-3" />
             </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState(0);
  const [onlineCount, setOnlineCount] = useState(() => Math.floor(Math.random() * 300) + 300); 
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateCounter = () => {
      setOnlineCount(prev => {
        // 75% chance to increase so we can gradually reach up to 20k
        const willIncrease = Math.random() > 0.25;
        
        let magnitude;
        if (willIncrease) {
           // increase faster
           magnitude = Math.floor(Math.random() * 150) + 20;
        } else {
           // decrease slower
           magnitude = Math.floor(Math.random() * 50) + 10;
        }

        setIsIncreasing(willIncrease);
        
        let next = willIncrease ? prev + magnitude : prev - magnitude;
        if (next > 20000) {
           // cap around 20k a bit dynamically
           next = 19500 + Math.floor(Math.random() * 500);
           setIsIncreasing(false);
        } else if (next < 100) {
           next = 100 + Math.floor(Math.random() * 50);
           setIsIncreasing(true);
        }
        
        return next;
      });

      // Natural delays between 1.5 and 4 seconds
      const nextDelay = Math.random() * 2500 + 1500;
      timeoutId = setTimeout(updateCounter, nextDelay);
    };

    // Give it a bit before the first change
    timeoutId = setTimeout(updateCounter, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 400)); setBootSequence(1);
      await new Promise(r => setTimeout(r, 500)); setBootSequence(2);
      await new Promise(r => setTimeout(r, 600)); setBootSequence(3);
      await new Promise(r => setTimeout(r, 400)); 
      setIsLoading(false);
    };
    sequence();
  }, []);

  const getCountColor = (count: number) => {
    if (count <= 500) {
      return 'text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]';
    }
    // Randomly choose between blue and emerald for a dynamic look when > 500
    const colorKey = Math.floor(count * 1.5) % 2 === 0;
    return colorKey
      ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]' 
      : 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] text-white flex flex-col items-center justify-center font-mono z-[100] px-6">
        <div className="w-full max-w-md p-8 border border-white/10 rounded-2xl bg-black/50 shadow-2xl">
           <div className="flex items-center gap-3 mb-6 opacity-60">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span className="text-xs tracking-widest uppercase font-bold text-white/80">Student_Project_OS</span>
           </div>
           
           <div className="space-y-4 text-sm text-white/70">
              {bootSequence >= 0 && <TypingText text="$ npm run start:bot-gateway" speed={20} />}
              {bootSequence >= 1 && <p className="text-emerald-400 mt-2">✓ Waking up free tier server...</p>}
              {bootSequence >= 1 && <TypingText text="$ Allocating student resources..." speed={15} delay={300} />}
              {bootSequence >= 2 && <p className="text-emerald-400">✓ Modules loaded. API connected.</p>}
              {bootSequence >= 2 && <TypingText text="$ Booting UI..." speed={20} delay={200} />}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <StreakCounter />
      <LiveSocialProof />
      
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(16,185,129,0.1),transparent_70%)] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)] rounded-full pointer-events-none" />

      {/* FLOATING ADS */}
      <SocialBarAd />
      <PopunderAd />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12 space-y-16">
        
        {/* Header / Intro */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center gap-4 w-full mb-8">
            <div className="flex justify-center w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-black group hover:bg-emerald-500/30 transition-all cursor-default shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="hidden sm:inline">Collective Node Operational</span>
                <span className="sm:hidden">Node Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white/90 uppercase">
               Empowering the <span className="text-emerald-500">Student Collective</span>
            </h1>

            <div className="flex justify-center w-full">
              <a href="https://molecularshindy.com/m8tapc7w?key=be0a244440117459f9bf52bf6601e5df" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative shadow-[0_0_20px_rgba(249,115,22,0.15)] mb-4">
                <span className="absolute top-0 right-0 bg-orange-500/20 px-2 py-0.5 text-[8px] uppercase font-black tracking-widest rounded-bl-lg">Sponsored</span>
                <div className="text-xl">🚀</div>
                <div className="flex flex-col items-start leading-none mt-0.5">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest group-hover:text-orange-300">Download High-Speed Miner</span>
                </div>
              </a>
            </div>
            
            <div className="flex justify-center w-full">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all cursor-default">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-blue-500"></span>
                </span>
                <span className="tabular-nums font-mono flex items-center gap-2">
                  <div className="flex overflow-hidden text-white/90 text-sm sm:text-base">
                    {onlineCount.toLocaleString().split('').map((char, i) => (
                      <motion.span
                        key={`${i}-${char}`}
                        initial={{ opacity: 0, y: isIncreasing ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 100, 
                          damping: 15,
                          delay: i * 0.05 
                        }}
                        className={`inline-block font-black transition-colors duration-500 ${getCountColor(onlineCount)}`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest pt-0.5">Active Students</span>
                </span>
              </div>
            </div>
          </div>

          {/* LARGE BANNER AD - strategically placed below headers and above content */}
          <div id="top-banner-ad" className="w-full h-[60px] sm:h-[90px] flex items-center justify-center -mx-2 sm:mx-0">
            <a href="https://molecularshindy.com/m8tapc7w?key=be0a244440117459f9bf52bf6601e5df" target="_blank" rel="noreferrer" className="w-full h-full bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 bg-white/10 px-2.5 py-1 text-[8px] text-white/50 uppercase font-bold tracking-widest rounded-bl-lg">Ad Partner</div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex w-12 h-12 bg-emerald-500/10 rounded-full items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">🚀</div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Download High-Speed Crypto Miner</div>
                  <div className="text-[8px] sm:text-[9px] text-white/40 uppercase font-mono tracking-tighter">Verified Ad Partner Instance • 0.00KB Latency</div>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden group">
             {/* decorative line */}
             <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500 opacity-80" />
             
             <div className="flex items-center gap-3 text-emerald-400">
                <Heart className="w-5 h-5 fill-current" />
                <h2 className="text-sm font-display font-bold uppercase tracking-[0.3em] text-white/80">Support Driven Infrastructure</h2>
             </div>
             
             <div className="relative text-white/70 text-base md:text-lg leading-relaxed font-sans pb-2">
                 <span className="float-left text-7xl font-display font-black mr-4 leading-[0.75] mt-2 bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-emerald-900 drop-shadow-lg">Y</span>
                 ou are now part of a shared mission. This gateway remains open and unrestricted because of contributions from students like you. Every interaction here helps maintain the high-speed servers and verified modules that <strong>thousands of students</strong> rely on daily. Your participation is what keeps this intelligence free for everyone.
             </div>
             
             <div className="pt-4 border-t border-white/5 border-dashed flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-sm md:text-base text-emerald-400/90 font-medium flex-1 flex items-center gap-3">
                   <span className="animate-bounce inline-block font-bold">↓</span> Enjoy the bot's features by scrolling down.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                   <button onClick={() => {
                     const el = document.getElementById('top-banner-ad');
                     if (el) {
                       const y = el.getBoundingClientRect().top + window.scrollY - 80;
                       window.scrollTo({top: y, behavior: 'smooth'});
                     }
                   }} className="flex-1 sm:flex-none text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-colors text-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      Explore Features
                   </button>
                </div>
             </div>
          </div>
        </section>
        
        <CareerDashboard />
        <NativeAd />
        
        <TelegramVerification />

         {/* Content / Games / Tools (Scroll Hook) */}
        <section id="content-hub" className="space-y-12 pt-4">
           
           <div className="text-center pb-8 space-y-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative inline-block bg-gradient-to-b from-blue-600 to-indigo-900 text-white font-display font-black px-8 py-3 rounded-full border-2 border-white/20 text-xl sm:text-2xl uppercase tracking-[0.1em] shadow-2xl overflow-hidden">
                   <span className="relative z-10 drop-shadow-md">Node Verification Pending</span>
                   <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 skew-y-[-5deg] transform -translate-y-2" />
                </div>
              </motion.div>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl mx-auto font-medium">
                Scroll past the collective tools to sync your student profile. 
                <span className="text-emerald-400 font-bold block mt-2 underline decoration-emerald-500/30 font-display">System Integrity Verified: 100%</span>
              </p>
           </div>
           
           <div className="grid sm:grid-cols-2 gap-4 my-8">
              <ReflexTest />
              <MemeLab />
              <StudentCrate />
              <DailySurvivalPack />
           </div>

           <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                 <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                    <FileText className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3">AI Resume Builder</h4>
                 <p className="text-sm text-white/60 leading-relaxed mb-4">
                   Stop guessing what recruiters want. Our AI analyzes your background and generates clean, ATS-friendly resumes tailored strictly for tech internships and placements.
                 </p>
                 <ul className="space-y-2 text-xs text-white/40 font-mono">
                    <li>→ High ATS Score Optimization</li>
                    <li>→ FAANG formatting standards</li>
                    <li>→ Smart keyword injection</li>
                 </ul>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3">Interview Practice</h4>
                 <p className="text-sm text-white/60 leading-relaxed mb-4">
                   Get immediate access to technical questions, coding prep, and quick interview simulations that test your actual knowledge under pressure.
                 </p>
                 <ul className="space-y-2 text-xs text-white/40 font-mono">
                    <li>→ Core CS (OS, DBMS, CN)</li>
                    <li>→ Behavioral & HR round prep</li>
                    <li>→ Real-time answer feedback</li>
                 </ul>
              </div>
           </div>



           {/* Feature Section 2 */}
           <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex gap-6">
                 <div className="hidden sm:flex w-12 h-12 bg-purple-500/10 rounded-xl items-center justify-center shrink-0 text-purple-400">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-emerald-400 mb-3 block">Engineering Resource Hub</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Say goodbye to endlessly searching for study materials. Access curated semester notes, top open-source GitHub projects to contribute to, and essential engineering tools all centralized in one perfectly organized student hub.
                    </p>
                 </div>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex gap-6">
                 <div className="hidden sm:flex w-12 h-12 bg-amber-500/10 rounded-xl items-center justify-center shrink-0 text-amber-400">
                    <Briefcase className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-emerald-400 mb-3 block">Internship & Opportunity Updates</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Finding genuine opportunities before they expire is tough. Discover hidden internships, upcoming global hackathons, and exclusive student-only opportunities as soon as they are announced. We filter the noise.
                    </p>
                 </div>
              </div>
           </div>

           <div className="grid sm:grid-cols-2 gap-4 my-8">
              <HiddenTool />
              <RageClickArena />
              <div className="sm:col-span-2">
                 <SecretEvent />
              </div>
           </div>

           {/* Terminal Tips Section (Dynamic & Styled) */}
           <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Terminal className="w-24 h-24 rotate-12" />
              </div>
              
              <h4 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                 <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                 </div>
                 Daily Terminal Mastery
              </h4>

              <div className="space-y-4 font-mono text-sm">
                 {(() => {
                    const allTips = [
                      "alias gs=\"git status\"",
                      "ctrl + r : reverse intelligent search",
                      "!! : repeat last command with sudo",
                      "cd - : jump to previous directory",
                      "mkdir -p path/to/dir : create nested folders",
                      "grep -r \"pattern\" . : search text in files",
                      "ls -alth : list files with details",
                      "top : real-time system monitoring",
                      "ssh-keygen -t ed25519 : generate secure keys"
                    ];
                    const day = new Date().getDate();
                    const startIdx = day % (allTips.length - 2);
                    return allTips.slice(startIdx, startIdx + 3).map((tip, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/5 transition-all group/tip cursor-default">
                        <span className="text-emerald-500 font-bold opacity-40 group-hover/tip:opacity-100 transition-opacity">0{idx + 1}</span>
                        <code className="text-white/70 group-hover/tip:text-emerald-300 transition-colors">{tip}</code>
                      </div>
                    ));
                 })()}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">Updated {new Date().toLocaleDateString()}</p>
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.open('https://chat.whatsapp.com/H8dgrU0rcEG94I5AZw57Ji', '_blank')}
                      className="px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg text-[#25D366] text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      WhatsApp Community
                    </button>
                    <div className="flex gap-1">
                       {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />)}
                    </div>
                 </div>
              </div>
           </div>

           {/* Feature Section 3 */}
           <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
                   <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">LinkedIn Growth Tools</h4>
                <p className="text-sm text-white/60 leading-relaxed mt-2">
                  Your LinkedIn is your portfolio. Dramatically improve your profile, generate eye-catching headlines, and craft personalized cold-outreach messages to recruiters for referrals. Build a powerful networking presence automatically.
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center mb-4 text-rose-400">
                   <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">AI Productivity Tools</h4>
                <p className="text-sm text-white/60 leading-relaxed mt-2">
                  From summarizing dense academic papers to instantly explaining complex code snippets, use our daily AI utilities built specifically to accelerate your study routine and coding workflows.
                </p>
              </div>
           </div>

           <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                   <Shield className="w-5 h-5 text-emerald-500" />
                   <h4 className="text-lg font-bold text-white">Placement Support</h4>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Stuck on a tricky DSA problem? Need quick help for the upcoming aptitude test? Get immediate guidance for coding rounds and comprehensive placement preparation routines designed for on-campus drives.
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                   <Target className="w-5 h-5 text-emerald-500" />
                   <h4 className="text-lg font-bold text-white">Challenges & Streaks</h4>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Consistency is everything in software engineering. Our mini-challenges and dynamic streak progression system are strictly designed to keep you coding, learning, and staying sharp every single day without burning out.
                </p>
              </div>
           </div>

           {/* Empty padding at the bottom instead of ad 4 */}
           <div className="h-12 w-full"></div>

           {/* Feature Section 5 (Full Explanation) */}
           <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0d1410] border border-emerald-500/10 rounded-3xl p-8 md:p-12 mt-10 relative overflow-hidden">
              <div className="relative z-10 space-y-8 text-center md:text-center">
                 <div className="mb-10 text-center">
                   <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">More Than Just a Bot</h3>
                   <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
                     We know what engineering students actually need. No fluff, no generic advice—just high-impact tools that save you time and help you land your dream job faster.
                   </p>
                 </div>



                 <div className="grid sm:grid-cols-2 gap-8 text-left">
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <Layers className="w-5 h-5 text-emerald-400" />
                          <h4 className="text-lg font-bold text-white">Hidden Student Modules</h4>
                       </div>
                       <p className="text-sm text-white/60 leading-relaxed">
                         Unlock experimental tools, secretive beta features, and limited-access sections. We continuously test and deploy new algorithms and modules exclusively for our active community members.
                       </p>
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-2">
                          <Heart className="w-5 h-5 text-emerald-400" />
                          <h4 className="text-lg font-bold text-white">100% Community Driven</h4>
                       </div>
                       <p className="text-sm text-white/60 leading-relaxed">
                         Yuvorai is built by students, for students. It is engineered to stay fully accessible forever. By using the tool and supporting our sponsors, you help keep the servers running for everyone.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

        </section>

         <div className="max-w-2xl mx-auto mb-16 space-y-16">
            <BrainRotFeed />
            
            {/* AD PLACEHOLDER: Native Mid-Feed Ad */}
            <div className="max-w-md mx-auto my-8 px-4">
              <div className="w-full aspect-[16/5] bg-white/[0.02] border border-dashed border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1 left-2 text-[7px] text-white/30 font-bold uppercase tracking-widest">Sponsored Intelligence Node</div>
                <div className="flex items-center gap-4 px-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 shrink-0" />
                  <div className="space-y-1">
                    <div className="h-2 w-32 bg-white/10 rounded" />
                    <div className="h-2 w-20 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* AD SLOT: High-Revenue Smart Link Section */}
            <div className="max-w-md mx-auto px-4 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Verified Resources</h3>
                <span className="text-[8px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">High Yield</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://molecularshindy.com/m8tapc7w?key=be0a244440117459f9bf52bf6601e5df" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors group">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3">
                    <div className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-[10px] font-bold text-white mb-1 uppercase tracking-wider">AI Tutor Pro</div>
                  <div className="text-[9px] text-white/40 leading-relaxed">Smart link to premium education tool</div>
                </a>
                <a href="https://molecularshindy.com/m8tapc7w?key=be0a244440117459f9bf52bf6601e5df" target="_blank" rel="noreferrer" className="p-4 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors group">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-3">
                    <div className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div className="text-[10px] font-bold text-white mb-1 uppercase tracking-wider">Study Boost</div>
                  <div className="text-[9px] text-white/40 leading-relaxed">Affiliate resource integration</div>
                </a>
              </div>
            </div>

            <div className="max-w-md mx-auto">
               <GlobalLeaderboard />
            </div>
         </div>

        {/* Floating / Sticky Bottom CTA for the Bot */}
        <section className="pt-10 pb-8 text-center space-y-8">
           <p className="text-xl text-white/70 font-medium tracking-tight px-4">
             Ready to integrate with the collective student intelligence?
           </p>

           {/* AD PLACEHOLDER: Strategic Bottom Banner */}
           <div className="max-w-md mx-auto px-4 mb-4">
             <div className="w-full h-24 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute top-1 right-2 text-[8px] text-white/20 font-bold uppercase tracking-tighter">Advertisement</div>
               <div className="text-white/40 text-[10px] font-mono animate-pulse uppercase tracking-[0.3em]">Banner Slot Alpha</div>
               <div className="text-white/10 text-[8px] mt-1 font-mono uppercase tracking-widest italic">Optimized for Mobile Performance</div>
             </div>
           </div>

           <motion.a 
              href="https://t.me/Yuvorai_bot" 
              target="_blank" 
              rel="noreferrer"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base transition-all shadow-[0_20px_50px_rgba(16,185,129,0.2)] ring-1 ring-white/20"
           >
              Launch Telegram Bot <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 -rotate-90 group-hover:translate-x-2 transition-transform" />
           </motion.a>
        </section>



      </main>
      
      {/* Minimal Footer */}
      <footer className="text-center py-8 text-[10px] font-mono text-white/20 uppercase tracking-widest border-t border-white/5">
         Built with ❤️ for the student dev community.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CareerProvider>
       <AppContent />
    </CareerProvider>
  );
}

