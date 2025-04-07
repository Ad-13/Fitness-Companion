import { useEffect, useState } from 'react';

export function usePulseSensor() {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(prev => Math.max(60, Math.min(120, prev + Math.round(Math.random() * 4 - 2))));
    }, 1000);

    return () => {
      clearInterval(pulseInterval);
    };
  }, []);

  return { pulse };
}
