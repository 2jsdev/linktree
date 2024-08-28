"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ChevronFirst, ChevronLast } from "lucide-react"
import { useTheme } from 'next-themes'
import NavLinks from '../NavLinks'
import { ModeToggle } from '../ModeToggle'


export default function Sidebar() {
    const { theme } = useTheme()
    const [expanded, setExpanded] = useState(false)

    return (
        <aside className={cn(
            "h-screen transition-all duration-300 ease-in-out",
            expanded ? "w-64" : "w-16"
        )}>
            <nav className="h-full flex flex-col bg-background border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" height="40px" width="40px"
                        className={cn("transition-all duration-300", expanded ? "block" : "hidden")}>
                        <title>Linktree Logo</title>
                        <desc>Linktree Logo Symbol</desc>
                        <path d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24.0019H10.038V16.16Z" className="fill-foreground" />
                    </svg>
                    <Button
                        onClick={() => setExpanded((curr) => !curr)}
                        variant="ghost"
                        size="icon"
                        className="p-1.5"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </Button>
                </div>

                <NavLinks expanded={expanded} />

                <div className="border-t flex items-center p-3 space-x-3 gap-1">
                    {expanded ? (
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
        </aside>
    )
}