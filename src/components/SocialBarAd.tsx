import { useEffect, useRef } from 'react';

export const SocialBarAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double injection
    if (adRef.current && adRef.current.innerHTML === '') {
      const script = document.createElement('script');
      script.src = "https://molecularshindy.com/2c/ba/ed/2cbaed25c53d67b9d023fc0a755ccc62.js";
      script.async = true;
      
      adRef.current.appendChild(script);
    }
  }, []);

  return <div ref={adRef} />;
};
