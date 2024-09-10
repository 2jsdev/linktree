'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Link as LinkIcon,
  ShoppingCart,
  Paintbrush,
  Settings,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LinkIcon, label: 'Links', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  // { icon: ShoppingCart, label: 'Shop', href: '/shop' },
  // { icon: Paintbrush, label: 'Appearance', href: '/appearance' },
  // { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function NavLinks({ expanded }: { expanded: boolean }) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <ul className="flex-1 px-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            {expanded ? (
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer w-full justify-start transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700',
                  pathname === item.href && 'bg-gray-300 dark:bg-gray-800'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-3 transition-opacity duration-300 ease-in-out">
                  {item.label}
                </span>
              </Link>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center p-2 my-1 rounded-md cursor-pointer w-full justify-center transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700',
                      pathname === item.href && 'bg-gray-300 dark:bg-gray-800'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
