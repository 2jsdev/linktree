'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ChevronFirst, ChevronLast, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import NavLinks from '../NavLinks';
import { ModeToggle } from '../ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Sidebar() {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SidebarContent = () => (
    <nav className="h-full flex flex-col bg-background border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
        <>
          <Image
            src="/wookie.png"
            alt="Wookielink Logo"
            width={40}
            height={40}
            className={cn(
              'transition-all duration-300',
              expanded || isMobile ? 'block' : 'hidden'
            )}
          />
          <span
            className={cn(
              'text-2xl font-bold text-primary',
              expanded ? 'block' : 'hidden'
            )}
          >
            Wookielink
          </span>
        </>
        {!isMobile && (
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            variant="ghost"
            size="icon"
            className="p-1.5"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        )}
      </div>

      <NavLinks expanded={expanded || isMobile} />

      <div className="mt-auto border-t flex items-center p-3 space-x-3 gap-1">
        {expanded || isMobile ? (
          <>
            <ModeToggle />
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Toggle {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </nav>
  );

  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-2 left-4 z-50"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50',
        expanded ? 'w-64' : 'w-16'
      )}
    >
      <SidebarContent />
    </aside>
  );
}
