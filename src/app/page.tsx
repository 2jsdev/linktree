"use client";

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from '@/components/ModeToggle'

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleRedirect = (state?: 'signup') => {
    const queryParams = new URLSearchParams();

    if (state) {
      queryParams.append('state', state);
    }
    if (username) {
      queryParams.append('username', username);
    }

    const queryString = queryParams.toString();
    const url = `/login${queryString ? `?${queryString}` : ''}`;

    router.push(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-background border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Linktree
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleRedirect()}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </button>
            <button
              onClick={() => handleRedirect('signup')}
              className={buttonVariants()}
            >
              Sign up free
            </button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your one link<br />for everything
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Share your links, social profiles, contact info and<br />more on one page
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                linktree.io/
              </span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-[5.6rem] w-full sm:w-64"
                aria-label="Enter your desired username"
              />
            </div>
            <button
              onClick={() => handleRedirect('signup')}
              className={buttonVariants()}
            >
              Claim your Linktree
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
