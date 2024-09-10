'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Check, ExternalLink } from 'lucide-react';
import { useGetUserProfileQuery } from '@/@core/infra/api/userApi';
import Link from 'next/link';

export default function Header() {
  const { data, isLoading } = useGetUserProfileQuery();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (data?.username) {
      const url = `https://linktree.2jsdev.me/${data.username}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  if (isLoading) {
    return (
      <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 min-h-[100px]">
        <div className="text-2xl font-bold text-center sm:text-left w-full sm:w-auto">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <Skeleton className="h-10 w-48" />
      </header>
    );
  }

  return (
    <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 min-h-[100px]">
      {data?.username ? (
        <>
          <div className="text-2xl font-bold text-center sm:text-left">
            <div>Your Linktree is live:</div>
            <a
              href={`https://linktree.2jsdev.me/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center justify-center sm:justify-start"
            >
              linktree.2jsdev.me/{data.username}
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy your Linktree URL
              </>
            )}
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Your Linktree is not live yet
          </h1>
          <Link href="/dashboard/profile">
            <Button variant="outline">Set up your Linktree</Button>
          </Link>
        </>
      )}
    </header>
  );
}
