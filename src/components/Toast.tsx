"use client";

import React, { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast"

type ToastProps = {
    title: string;
    description: string;
    variant?: "default" | "destructive";
    onClear?: () => void;
};

export const Toast: React.FC<ToastProps> = ({ title, description, variant = "destructive", onClear }) => {
    const { toast } = useToast();

    useEffect(() => {
        if (title && description) {
            toast({
                title,
                description,
                duration: 3000,
                variant,
            });

            if (onClear) {
                setTimeout(onClear, 3000);
            }
        }
    }, [toast, title, description, variant, onClear]);

    return null;
};
