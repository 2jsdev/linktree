'use client';

import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children?: React.ReactNode;
}

export const NextAuthProvider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
