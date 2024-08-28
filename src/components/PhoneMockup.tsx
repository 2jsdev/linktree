
import { FC, ReactNode } from 'react';
import { BatteryMedium, Signal, Wifi } from 'lucide-react';


interface PhoneMockupProps {
    children: ReactNode;
}

export const PhoneMockup: FC<PhoneMockupProps> = ({ children }) => {
    return (
        <div className="bg-background w-[375px] h-[812px] rounded-[60px] shadow-xl border-8 border-gray-700 flex flex-col relative overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-[20px] flex items-end justify-center z-20">
                <div className="w-20 h-[4px] bg-black rounded-[4px] mb-1"></div>
            </div>

            {/* Camera */}
            <div className="absolute top-[10px] right-[120px] w-[10px] h-[10px] bg-[#0f0f0f] rounded-full z-30">
                <div className="absolute inset-[1px] bg-[#222] rounded-full"></div>
                <div className="absolute top-[3px] left-[3px] w-[3px] h-[3px] bg-[#2a2a2a] rounded-full"></div>
            </div>

            {/* Status Bar */}
            <div className="flex justify-between items-center mt-3 px-6 z-10">
                <span className="text-sm font-semibold">
                    {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                </span>
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
    )
}