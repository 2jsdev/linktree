import { FC, ReactNode, useState, useEffect } from 'react';
import { BatteryMedium, Signal, Wifi } from 'lucide-react';

interface PhoneMockupProps {
  children: ReactNode;
}

export const PhoneMockup: FC<PhoneMockupProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    const setIntervalAtStartOfNextMinute = () => {
      const now = new Date();
      const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      updateTime(); // Update immediately

      setTimeout(() => {
        updateTime(); // Update at the start of the next minute
        // Set interval to update every minute
        const intervalId = setInterval(updateTime, 60000);

        // Clean up function to clear the interval
        return () => clearInterval(intervalId);
      }, delay);
    };

    const cleanup = setIntervalAtStartOfNextMinute();
    return cleanup;
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="bg-background w-[375px] h-[812px] rounded-[60px] shadow-xl border-8 border-gray-700 flex flex-col relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center mt-4 px-6 z-10">
        <span className="text-sm font-semibold">{formatTime(currentTime)}</span>
        <div className="flex items-center space-x-2">
          <Signal size={16} />
          <Wifi size={16} />
          <BatteryMedium size={20} />
        </div>
      </div>

      {/* Profile Content */}
      <div className="rounded-[60px] p-6 flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};
