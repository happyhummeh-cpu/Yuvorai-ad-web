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
  Layers,
  Laptop
} from "lucide-react";
import { ReflexTest, MemeLab, HiddenTool, RageClickArena, GlobalLeaderboard, StudentCrate, DailySurvivalPack, SecretEvent, BrainRotFeed, StreakCounter } from "./components/RetentionWidgets";

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

const AdsterraBanner = memo(() => {
  const containerId = "container-7ed92ca8985989a428c1501208fda70c";
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://pl29435581.effectivecpmnetwork.com/7ed92ca8985989a428c1501208fda70c/invoke.js';
    script.async = true;
    script.dataset.cfasync = 'false';
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(script);
    }
  }, []);

  return <div id={containerId} className="mx-auto w-full mt-8 flex justify-center items-center min-h-[100px]"></div>;
});

interface AdProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

const ExternalIframeAd = memo(({ adKey, width, height, className = "" }: AdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!adRef.current || initialized.current) return;
    initialized.current = true;
    
    // Inject atOptions globally for this specific placement
    (window as any).atOptions = {
      'key' : adKey,
      'format' : 'iframe',
      'height' : height,
      'width' : width,
      'params' : {}
    };

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    adRef.current.appendChild(invokeScript);
  }, [adKey, height, width]);

  return (
    <div className={`flex justify-center w-full my-8 ${className}`}>
      <div 
        ref={adRef} 
        style={{ width: `${width}px`, minHeight: `${height}px` }}
        className="bg-[#0a0a0a] border border-white/5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.05)] overflow-hidden flex items-center justify-center relative"
      >
         <span className="text-white/20 text-[10px] font-mono absolute pointer-events-none text-center px-4">
             ADVERTISEMENT<br/>(Loading...)
         </span>
      </div>
    </div>
  );
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState(0);
  const [onlineCount, setOnlineCount] = useState(1524);

  useEffect(() => {
    // Dynamic Online Counter Logic
    let timeoutId: NodeJS.Timeout;

    const updateCounter = () => {
      setOnlineCount(prev => {
        // Random fluctuation between -2 and +9 to generally increase
        const change = Math.floor(Math.random() * 12) - 2;
        const nextValue = prev + change;
        // Keep it under 20000 and above 1500
        if (nextValue > 20000) return 20000;
        if (nextValue < 1500) return 1500;
        return nextValue;
      });

      // Next update in 1.5s to 4.5s
      const nextDelay = Math.random() * 3000 + 1500;
      timeoutId = setTimeout(updateCounter, nextDelay);
    };

    timeoutId = setTimeout(updateCounter, 2000);

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
      
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(16,185,129,0.1),transparent_70%)] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)] rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-12 space-y-16">
        
        {/* Top Feature Banner */}
        <div className="flex flex-col items-center">
           <ExternalIframeAd adKey="1c94cfd3095177f6adc3403f8b1e7bdc" width={300} height={250} className="my-0" />
           <p className="text-[10px] text-white/20 font-mono -mt-6">COMMUNITY NEWS</p>
        </div>
        
        {/* Sticky Skyscrapers on Desktop */}
        <div className="hidden xl:block absolute -left-48 top-24 h-[calc(100%-200px)] pointer-events-none">
          <div className="sticky top-24 pointer-events-auto">
            <ExternalIframeAd adKey="fd18bca6ca90950db684db96e756aa3c" width={160} height={600} className="my-0 px-0" />
          </div>
        </div>
        <div className="hidden xl:block absolute -right-48 top-24 h-[calc(100%-200px)] pointer-events-none">
          <div className="sticky top-24 pointer-events-auto">
             {/* Duplicate for symmetry or leave space for another ad later */}
             <ExternalIframeAd adKey="fd18bca6ca90950db684db96e756aa3c" width={160} height={600} className="my-0 px-0" />
          </div>
        </div>
        
        {/* Header / Intro */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
              <Code className="w-3 h-3" />
              Built by Students
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-white/70 text-[10px] uppercase tracking-widest font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tabular-nums font-mono">
                {onlineCount.toLocaleString()} Students Online
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-white/90">
             Welcome to the Bot Gateway
          </h1>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden group">
             {/* decorative line */}
             <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500 opacity-80" />
             
             <div className="flex items-center gap-3 text-emerald-400">
                <Coffee className="w-5 h-5" />
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Community Empowered</h2>
             </div>
             
             <div className="relative text-white/80 text-base md:text-lg leading-relaxed font-sans pb-2">
                 <span className="float-left text-7xl font-display font-black mr-4 leading-[0.75] mt-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/30 drop-shadow-lg">T</span>
                 <strong>his bot is 100% free</strong>, but keeping it online and fast requires community support. By checking out the sponsor tools below and playing the daily games, you ensure that <strong>thousands of students</strong> can continue to benefit from these resources without paywalls or limits.
             </div>
             
             <div className="pt-4 border-t border-white/5 border-dashed flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-sm md:text-base text-emerald-400/90 font-medium flex-1 flex items-center gap-3">
                   <span className="animate-bounce inline-block font-bold">↓</span> Enjoy the bot's features by scrolling down.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                   <button onClick={() => document.getElementById('content-hub')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 sm:flex-none text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-colors text-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      Explore Features
                   </button>
                </div>
             </div>
          </div>
        </section>

         {/* Content / Games / Tools (Scroll Hook) */}
        <section id="content-hub" className="space-y-12 pt-4">
           
           <div className="text-center pb-4 space-y-4">
              <p className="inline-block bg-emerald-500/10 text-emerald-400 font-bold px-4 py-2 rounded-full border border-emerald-500/20 text-sm">
                The bot link is below.
              </p>
              <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto">
                If you want to use the bot, scroll down past our sponsor section. 
                The bot is 100% spam-free and within policy.
              </p>
           </div>
           
           <div className="grid sm:grid-cols-2 gap-6 my-8">
              <ReflexTest />
              <MemeLab />
              <StudentCrate />
              <DailySurvivalPack />
           </div>

           <div className="grid sm:grid-cols-2 gap-6">
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

           {/* In-feed Ad (Middle) */}
           <div className="flex flex-col items-center">
              <ExternalIframeAd adKey="1c94cfd3095177f6adc3403f8b1e7bdc" width={300} height={250} className="my-4" />
              <p className="text-[10px] text-white/20 font-mono -mt-6 mb-4 uppercase tracking-widest">Sponsored Tool</p>
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

           <div className="grid sm:grid-cols-2 gap-6 my-8">
              <HiddenTool />
              <RageClickArena />
              <div className="sm:col-span-2">
                 <SecretEvent />
              </div>
           </div>

           {/* Break content so it doesn't look completely empty */}
           <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-emerald-400" />
                 Terminal Tips of the Day
              </h4>
              <div className="space-y-3 font-mono text-[11px] text-white/50 bg-black/50 p-4 rounded-xl border border-white/5">
                 <p><span className="text-emerald-500 mr-2">1.</span> alias gs="git status"</p>
                 <p><span className="text-emerald-500 mr-2">2.</span> ctrl + r : reverse intelligent search</p>
                 <p><span className="text-emerald-500 mr-2">3.</span> !! : repeat last command with sudo</p>
              </div>
           </div>

           {/* Feature Section 3 */}
           <div className="grid sm:grid-cols-2 gap-6">
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

           <div className="grid sm:grid-cols-2 gap-6">
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

                 {/* Mid-content Ad 2 */}
                 <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity mb-12">
                    <ExternalIframeAd adKey="1c94cfd3095177f6adc3403f8b1e7bdc" width={300} height={250} className="my-0" />
                    <p className="text-[10px] text-white/20 font-mono -mt-6">COMMUNITY SPONSOR</p>
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
            <div className="max-w-md mx-auto">
               <GlobalLeaderboard />
            </div>
         </div>

        {/* Floating / Sticky Bottom CTA for the Bot */}
        <section className="pt-10 pb-8 text-center space-y-6">
           <p className="text-sm text-white/40 font-medium">Ready to dive in?</p>
           <a 
              href="https://t.me/your_bot_username" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(52,211,153,0.3)]"
           >
              Open Bot on Telegram <ArrowDown className="w-4 h-4 -rotate-90" />
           </a>
        </section>

         {/* Large Ad Box Section below CTA - made to peek up and draw attention */}
         <div className="w-full min-h-[50vh] bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-t border-emerald-500/20 mt-12 relative overflow-hidden flex flex-col items-center justify-center p-8 sm:p-12 sm:rounded-3xl border-x border-b border-white/5 opacity-90 hover:opacity-100 transition-opacity max-w-4xl mx-auto shadow-[0_-20px_50px_rgba(16,185,129,0.05)] text-center space-y-8">
            <div className="absolute top-4 left-6 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-mono px-3 py-1 tracking-[0.2em] rounded-full border border-emerald-500/20">Sponsored Directory</div>
            
            {/* Background elements driving attention */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="absolute top-0 w-full h-[500px] bg-[radial-gradient(circle_at_top_center,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />
            
            {/* Ad Content */}
            <div className="relative z-10 w-full">
                <h3 className="text-2xl sm:text-4xl text-white font-black tracking-tight leading-[1.1] mb-6">
                   Sponsored Offers
                </h3>
                
                {/* Dynamically injected Native Banner */}
                <AdsterraBanner />
                
                <div className="pt-8 mt-8 border-t border-white/5 max-w-lg mx-auto">
                   <p className="mt-4 text-xs text-white/30 font-mono">By supporting our sponsors you keep this tool free!</p>
                </div>
            </div>
         </div>

      </main>
      
      {/* Minimal Footer */}
      <footer className="text-center py-8 text-[10px] font-mono text-white/20 uppercase tracking-widest border-t border-white/5">
         Built with ❤️ for the student dev community.
      </footer>
      


    </div>
  );
}

