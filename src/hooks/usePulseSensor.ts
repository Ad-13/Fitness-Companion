import { useEffect, useState } from 'react';

export function usePulseSensor() {
  const [pulse, setPulse] = useState(72);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const connectTimeout = setTimeout(() => {
      setIsConnecting(false);
      const interval = setInterval(() => {
        setPulse((prevPulse) => {
          const change = Math.random() * 4 - 2;
          let newPulse = prevPulse + change;
          return Math.round(newPulse);
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(connectTimeout);
  }, []);

  return { pulse, isConnecting };
}
