import { useEffect, useRef } from 'react';

export const NativeAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double injection
    if (adRef.current && adRef.current.innerHTML === '') {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://molecularshindy.com/f29bd5b66dc48bf951feb70b0a7132f7/invoke.js";
      
      const container = document.createElement('div');
      container.id = "container-f29bd5b66dc48bf951feb70b0a7132f7";
      
      adRef.current.appendChild(script);
      adRef.current.appendChild(container);
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-2">
      <div className="relative group">
        {/* Ad Label */}
        <div className="absolute -top-3 left-6 z-10 bg-white border border-gray-200 px-2 py-0.5 rounded text-[8px] font-black text-gray-500 uppercase tracking-widest shadow-sm">
          Sponsor Node
        </div>
        
        {/* Styled Container for the Native Ad - White background because user set font to #0d1019 */}
        <div 
          ref={adRef} 
          className="min-h-[120px] w-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl transition-all hover:border-emerald-500/30"
        />
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-white opacity-20 blur-xl -z-10 group-hover:opacity-40 transition-all" />
      </div>
    </div>
  );
};
