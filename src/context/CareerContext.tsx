import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CareerContextType {
  xp: number;
  level: number;
  streak: number;
  gainXP: (amount: number, reason?: string) => void;
  lastReason: string;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('career_xp');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('career_streak');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [lastReason, setLastReason] = useState('');

  const level = Math.floor(xp / 100) + 1;

  const gainXP = useCallback((amount: number, reason: string = 'Action Complete') => {
    setXp(prev => {
      const next = prev + amount;
      localStorage.setItem('career_xp', next.toString());
      return next;
    });
    setLastReason(reason);
    
    // Clear reason after a bit
    setTimeout(() => setLastReason(''), 3000);
  }, []);

  return (
    <CareerContext.Provider value={{ xp, level, streak, gainXP, lastReason }}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
