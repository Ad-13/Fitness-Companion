import { useEffect, useState } from 'react';

type Device = {
  id: string;
  name: string;
};

export function usePulseSensor() {
  const [pulse, setPulse] = useState(72);
  const [isConnecting, setIsConnecting] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const scanTimeout = setTimeout(() => {
      setDevices([
        { id: 'dev-1', name: 'Pulse Sensor A' },
        { id: 'dev-2', name: 'Pulse Sensor B' },
      ]);
      setIsConnecting(false);
    }, 2000);

    const pulseInterval = setInterval(() => {
      setPulse(prev => Math.max(60, Math.min(120, prev + Math.round(Math.random() * 4 - 2))));
    }, 1000);

    return () => {
      clearTimeout(scanTimeout);
      clearInterval(pulseInterval);
    };
  }, []);

  return { pulse, isConnecting, devices };
}
