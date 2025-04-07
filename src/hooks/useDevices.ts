import { useEffect, useState } from 'react';

type Device = {
  id: string;
  name: string;
};

export function useDevices() {
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


    return () => {
      clearTimeout(scanTimeout);
    };
  }, []);

  return { isConnecting, devices };
}
