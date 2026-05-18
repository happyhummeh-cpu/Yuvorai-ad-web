import { useEffect, useRef } from 'react';

export const PopunderAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.innerHTML === '') {
      const script = document.createElement('script');
      script.src = "https://molecularshindy.com/83/df/9d/83df9d5f04271c4671c84b8fdf35c0f9.js";
      script.async = true;
      
      adRef.current.appendChild(script);
    }
  }, []);

  return <div ref={adRef} />;
};
